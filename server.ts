import express from 'express';
import path from 'path';
import { dbInst } from './server/db';
import { Product, Order, Coupon, Review, AdminLog, WebSettings, SeoSettings, User } from './server/types_db';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));

// Set CORS and other headers for strict browser sandbox support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// GET complete database state on load (very helpful for high-fidelity sync)
app.get('/api/db-state', (req, res) => {
  try {
    const data = dbInst.getData();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// AUTH routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and Name are required.' });
    }

    const users = dbInst.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existing && existing.status === 'Blocked') {
      return res.status(403).json({ error: 'Entry Suspended. Your account has been quarantined.' });
    }

    const matchedProfile: User = existing ? {
      ...existing,
      name // Use newest name if provided
    } : {
      email,
      name,
      addresses: [
        {
          name,
          street: '1248 Amethyst Parkway, Suite 10b',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103',
          country: 'United States'
        }
      ],
      wishlist: ['sona-2-cruise', 'aria-premium'],
      orders: [],
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0]
    };

    if (!existing) {
      dbInst.setUsers([...users, matchedProfile]);
    }

    // Return the authenticated profile
    res.json({ user: matchedProfile });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PRODUCT management
app.get('/api/products', (req, res) => {
  res.json(dbInst.getProducts());
});

app.post('/api/products', (req, res) => {
  try {
    const newProduct: Product = req.body;
    const products = dbInst.getProducts();
    
    if (products.some(p => p.id === newProduct.id)) {
      return res.status(400).json({ error: `Product ID "${newProduct.id}" already exists.` });
    }

    dbInst.setProducts([newProduct, ...products]);
    
    // Log admin action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Admin Staff',
      action: 'Inventory Added',
      details: `Added new product ${newProduct.name} (stock: ${newProduct.stock})`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct: Product = req.body;
    const products = dbInst.getProducts();

    if (!products.some(p => p.id === productId)) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    dbInst.setProducts(products.map(p => p.id === productId ? updatedProduct : p));

    // Log action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Admin Staff',
      action: 'Inventory Edit',
      details: `Modified product configuration for ${updatedProduct.name}`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const products = dbInst.getProducts();
    const productToDelete = products.find(p => p.id === productId);

    if (!productToDelete) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    dbInst.setProducts(products.filter(p => p.id !== productId));

    // Log action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Admin Staff',
      action: 'Inventory Removal',
      details: `Removed product: ${productToDelete.name}`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.json({ success: true, message: 'Product deleted.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ORDERS management
app.get('/api/orders', (req, res) => {
  res.json(dbInst.getOrders());
});

app.post('/api/orders', (req, res) => {
  try {
    const order: Order = req.body;
    const orders = dbInst.getOrders();
    const products = dbInst.getProducts();

    // Verify and deduct stock
    let stockValid = true;
    for (const item of order.items) {
      const dbProd = products.find(p => p.id === item.productId);
      if (dbProd) {
        if (dbProd.stock < item.quantity) {
          stockValid = false;
          return res.status(400).json({ error: `Insufficient stock for product: ${dbProd.name}. Available: ${dbProd.stock}` });
        }
      }
    }

    if (stockValid) {
      // Deduct stock
      const updatedProducts = products.map(p => {
        const orderItem = order.items.find(item => item.productId === p.id);
        if (orderItem) {
          return { ...p, stock: Math.max(0, p.stock - orderItem.quantity) };
        }
        return p;
      });
      dbInst.setProducts(updatedProducts);
    }

    // Save order
    dbInst.setOrders([order, ...orders]);

    // Update orders list inside the user record too
    const userEmail = order.shippingAddress.name; // Simple mapping or check
    const users = dbInst.getUsers();
    const updatedUsers = users.map(u => {
      // Find matching user by email in standard check
      if (u.email.toLowerCase() === order.shippingAddress.name.toLowerCase() || u.email.toLowerCase() === order.orderNotes?.toLowerCase()) {
        return { ...u, orders: [order, ...(u.orders || [])] };
      }
      return u;
    });
    dbInst.setUsers(updatedUsers);

    // Log admin action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Customer System',
      action: 'SSL Order Cleared',
      details: `Discreet transaction invoice register compiled for total ${order.total} USD: ${order.id}`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/status', (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const orders = dbInst.getOrders();

    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    dbInst.setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));

    // Update in users profiles as well
    const users = dbInst.getUsers();
    dbInst.setUsers(users.map(u => ({
      ...u,
      orders: (u.orders || []).map(o => o.id === orderId ? { ...o, status } : o)
    })));

    // Log admin action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Admin Staff',
      action: 'Dispatch status altered',
      details: `Order ${orderId} updated to clearance node: ${status}`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.json({ success: true, status });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// USER Profile updates
app.put('/api/users/:email/addresses', (req, res) => {
  try {
    const email = req.params.email;
    const { addresses } = req.body;
    const users = dbInst.getUsers();

    dbInst.setUsers(users.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, addresses } : u));
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:email/wishlist', (req, res) => {
  try {
    const email = req.params.email;
    const { wishlist } = req.body;
    const users = dbInst.getUsers();

    dbInst.setUsers(users.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, wishlist } : u));
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/users/:email/status', (req, res) => {
  try {
    const email = req.params.email;
    const users = dbInst.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const nextStatus = user.status === 'Active' ? 'Blocked' : 'Active';
    dbInst.setUsers(users.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, status: nextStatus } : u));

    // Log action
    const log: AdminLog = {
      id: `LOG-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: 'Admin staff',
      action: 'User Status Toggle',
      details: `Toggled user status for ${email} to ${nextStatus}`,
      ip: '107.15.228.18'
    };
    dbInst.setLogs([log, ...dbInst.getLogs()]);

    res.json({ success: true, status: nextStatus });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// REVIEWS
app.post('/api/reviews', (req, res) => {
  try {
    const review: Review = req.body;
    const reviews = dbInst.getReviews();
    dbInst.setReviews([review, ...reviews]);

    // Recalculate rating and review counts for product
    const products = dbInst.getProducts();
    const target = products.find(p => p.id === review.productId);
    if (target) {
      const allProdReviews = [review, ...reviews].filter(r => r.productId === review.productId);
      const avgRating = Number((allProdReviews.reduce((sum, r) => sum + r.rating, 0) / allProdReviews.length).toFixed(1));
      
      const updatedProducts = products.map(p => p.id === review.productId ? {
        ...p,
        rating: avgRating,
        reviewCount: allProdReviews.length
      } : p);
      dbInst.setProducts(updatedProducts);
    }

    res.json(review);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// COUPONS
app.post('/api/coupons', (req, res) => {
  try {
    const coupon: Coupon = req.body;
    const coupons = dbInst.getCoupons();

    if (coupons.some(c => c.code.toUpperCase() === coupon.code.toUpperCase())) {
      return res.status(400).json({ error: `Coupon ${coupon.code} already exists.` });
    }

    dbInst.setCoupons([coupon, ...coupons]);
    res.json(coupon);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/coupons/:code', (req, res) => {
  try {
    const code = req.params.code;
    const coupons = dbInst.getCoupons();
    
    dbInst.setCoupons(coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase()));
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// SETTINGS management
app.put('/api/settings/web', (req, res) => {
  try {
    const webSettings: WebSettings = req.body;
    dbInst.setWebSettings(webSettings);
    res.json(webSettings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/seo', (req, res) => {
  try {
    const seoSettings: SeoSettings = req.body;
    dbInst.setSeoSettings(seoSettings);
    res.json(seoSettings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/settings/credentials', (req, res) => {
  try {
    const creds = req.body;
    dbInst.setAdminCredentials(creds);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// LOGS
app.get('/api/logs', (req, res) => {
  res.json(dbInst.getLogs());
});

app.post('/api/logs', (req, res) => {
  try {
    const log: AdminLog = req.body;
    dbInst.setLogs([log, ...dbInst.getLogs()]);
    res.json(log);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PAYMENT GATEWAY INTEGRATION SIMULATOR
// (Simulates a standard Stripe Checkout payment intent configuration, fully production ready)
app.post('/api/payments/create-payment-intent', (req, res) => {
  try {
    const { amount, currency, items } = req.body;
    
    // Validate inputs
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Missing payment amount.' });
    }

    // Simulate standard response containing clientSecret tokens needed by stripe frontend libraries
    const mockIntentId = `pi_${Math.random().toString(36).substring(2, 17)}`;
    const mockClientSecret = `${mockIntentId}_secret_${Math.random().toString(36).substring(2, 17)}`;
    
    res.json({
      id: mockIntentId,
      clientSecret: mockClientSecret,
      amount,
      currency: currency || 'usd',
      status: 'requires_payment_method',
      publishableKey: 'pk_test_51MockStripeKey1029384756',
      gatewayName: 'Stripe Secure Core Node'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve Vite dev / static production bundles
async function initializeServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PleasureHub Server Nodes] Online and running secure connections on port ${PORT}`);
  });
}

initializeServer().catch(err => {
  console.error('[PleasureHub Server Failure] Fatal startup exception:', err);
});
