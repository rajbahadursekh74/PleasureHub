# PleasureHub Intimate Logistics | High-Fidelity Full-Stack System Guide

This guide details the system architecture, database schema, API route inventory, installation instructions, and deployment configurations for the full-stack PleasureHub Intimate Logistics platform.

---

## 1. System Architecture

PleasureHub utilizes a high-performance **full-stack architecture** optimized for secure runtime environments:

- **Frontend Core**: React (v19) with Vite compiler, incorporating Tailwind CSS (v4) for layouts and Lucide icon kits.
- **Backend Node**: Custom Express server compiled to a unified, high-performance CommonJS artifact `dist/server.cjs` via `esbuild`. 
- **Active Synchronization Engine**: React components synchronize client state directly with backend database nodes dynamically. Changes instantly persist across reloads.
- **Durable Local Storage Engine**: Structured local file database (`db_store.json`) managing atomic reads/writes, ensuring complete data survivability without heavy external service dependencies.
- **Security Protections**: Age checks, IP routing triggers, plain shipping labeling systems, and secure billing mappings.

---

## 2. Complete Database Schema

All database structures are implemented within `/server/types_db.ts` and managed persistently inside the local datastore `db_store.json`.

### 2.1. Product Schema (`Product`)
Defines the inventory items, including stock volumes, variant categories, and security/privacy flags.
```typescript
interface Product {
  id: string;               // Unique ID, e.g., 'sona-2-cruise'
  name: string;             // Display name
  price: number;            // Direct numerical cost
  originalPrice?: number;   // Optional baseline price for discount badges
  rating: number;           // Calculated average score (updated upon client review post)
  reviewCount: number;      // Calculated review summation
  description: string;      // Body description
  category: 'all' | 'toys' | 'couples' | 'massagers' | 'lubricants' | 'lingerie' | 'men' | 'women' | 'accessories';
  subCategory?: string;     // Optional secondary placement
  images: string[];         // Image identifiers
  specs: { [key: string]: string }; // Map of dynamic anatomical/technical specs
  materials: string[];      // Material list for medical-grade rating
  brand: string;            // Producer brand
  isBestSeller?: boolean;   // Recommendation flags
  isNewArrival?: boolean;
  isLimited?: boolean;
  isFlashSale?: boolean;
  stock: number;            // Real-time stock count (deducted automatically on checkouts)
  discreetShipping: boolean;// Secure containment label trigger
  tags?: string[];
  variants?: string[];      // Array of available colors/finishes
}
```

### 2.2. User Profile Schema (`User`)
Stores client registration records, shipping addresses, bookmark wishlists, and administrative statuses.
```typescript
interface User {
  email: string;            // Secondary auth primary key (Case-insulated)
  name: string;             // Legal checkout name
  phone?: string;
  addresses: Address[];     // Dynamic coordinate listings
  wishlist: string[];       // Bookmarked Product IDs
  orders: Order[];          // Individual transaction history records
  status: 'Active' | 'Blocked'; // 'Blocked' state isolates account and returns suspension warning
  registeredDate?: string;
}
```

### 2.3. Address Schema (`Address`)
```typescript
interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
```

### 2.4. Order Schema (`Order`)
Durable ledger keeping purchase actions, billing formats, status nodes, references, and verification uploads.
```typescript
interface Order {
  id: string;               // Transaction ID, e.g., 'PH-384912'
  date: string;             // Timestamp in ISO-8601
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: Address;
  paymentMethod: 'credit_card' | 'crypto' | 'upi_qr';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled' | 'Delivered' | 'Returned' | 'Refunded';
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  paymentScreenshot?: string; // Payload screenshot base64
  paymentVerificationStatus?: 'Pending Verification' | 'Approved' | 'Rejected' | 'Not Required' | 'Refunded';
  orderNotes?: string;
  upiReferenceId?: string;
}
```

### 2.5. Review Schema (`Review`)
Contains client feedback associated with specific device listings.
```typescript
interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;           // Integer 1-5
  date: string;
  comment: string;
  verified: boolean;
}
```

### 2.6. Coupon Schema (`Coupon`)
Dynamic voucher records checked during shopping basket analysis.
```typescript
interface Coupon {
  code: string;             // UPPERCASE primary identifier, e.g., 'PLEASURE20'
  discountType: 'percentage' | 'fixed';
  value: number;            // Deductible value
  minPurchase: number;      // Threshold criteria
  description: string;
}
```

### 2.7. Settings Schemas (`WebSettings` & `SeoSettings`)
System configs governing platform behavior, custom naming, currencies, active status, and web details.
```typescript
interface WebSettings {
  siteName: string;
  siteLogo: string;
  theme: 'dark' | 'light';
  appIcon: string;
  enabled: boolean;         // Global store toggle
  maintenanceMode: boolean; // Overrides screens with maintenance gate
  newsletterPromo: string;
  smtpServer: string;
  smsGateway: string;
  twoFactorEnabled: boolean;
  language: 'EN' | 'ES' | 'FR' | 'DE';
  discreetName: string;     // Statement billing descriptor
  upiId?: string;
  upiName?: string;
  upiQrCodeUrl?: string;    // Custom gateway UPI configurations
}

interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
}
```

---

## 3. API Route Inventory

All endpoint calls are served on `/api/*` prefix and routed securely through our server node.

### 3.1. General State Synchronization
- **`GET /api/db-state`**
  - **Description**: Returns the complete current state of the datastore. Used during application boot to populate all frontend state caches.
  - **Response**: `200 OK` with JSON matching `DbData` schema.

### 3.2. User Authentication & Access Controls
- **`POST /api/auth/login`**
  - **Body**: `{ email: string, name: string }`
  - **Description**: Verifies matching email or initializes new profile if email does not exist.
  - **Errors**: Returns `403 Forbidden` if user is flagged as `Blocked` in the system.
- **`PUT /api/users/:email/status`**
  - **Description**: Toggle status between `Active` and `Blocked` (Restricted to administrative access).
- **`PUT /api/users/:email/addresses`**
  - **Body**: `{ addresses: Address[] }`
  - **Description**: Updates mailing configurations.
- **`PUT /api/users/:email/wishlist`**
  - **Body**: `{ wishlist: string[] }`
  - **Description**: Updates client bookmark records.

### 3.3. Inventory Product Management
- **`GET /api/products`**
  - **Description**: Returns all catalog listings.
- **`POST /api/products`**
  - **Body**: Complete `Product` object.
  - **Description**: Registers new inventory product. Checks for ID duplication. Adding pushes automatic update log.
- **`PUT /api/products/:id`**
  - **Body**: Updated `Product` configurations.
  - **Description**: Overwrites existing database entry.
- **`DELETE /api/products/:id`**
  - **Description**: Hard delete of matching item from catalog.

### 3.4. Transaction Order Engine
- **`POST /api/orders`**
  - **Body**: Complete `Order` object.
  - **Description**: Places a new order, verifies and deducts inventory quantities, appends to corresponding customer history, and adds admin notification trace.
  - **Errors**: `400 Bad Request` if item stock is below requested amount.
- **`PUT /api/orders/:id/status`**
  - **Body**: `{ status: Order['status'] }`
  - **Description**: Updates delivery, checking, or payment verification statuses.

### 3.5. System Reviews & Coupons
- **`POST /api/reviews`**
  - **Body**: Complete `Review` object.
  - **Description**: Appends review feedback, triggers automatic adjustment of the target product's rating average and count parameters.
- **`POST /api/coupons`**
  - **Body**: Complete `Coupon` object.
- **`DELETE /api/coupons/:code`**

### 3.6. Security Settings & Admin Control-Panel
- **`PUT /api/settings/web`**
  - **Body**: WebSettings configurations.
- **`PUT /api/settings/seo`**
- **`PUT /api/settings/credentials`**
  - **Body**: `{ owner: string, admin: string, staff: string }`
  - **Description**: Re-keys passcode access tokens for staff logins.

### 3.7. Payment Gateway Integration
- **`POST /api/payments/create-payment-intent`**
  - **Body**: `{ amount: number, currency: string, items: any[] }`
  - **Description**: Secures standard Stripe charge parameters, mapping tokenized client secrets required for custom credit-card checkout flows.
  - **Response**:
    ```json
    {
      "id": "pi_1234abcd",
      "clientSecret": "pi_1234abcd_secret_efgh",
      "amount": 21900,
      "currency": "usd",
      "status": "requires_payment_method",
      "publishableKey": "pk_test_...",
      "gatewayName": "Stripe Secure Core Node"
    }
    ```

---

## 4. Local Setup Guide

Follow these steps to build and run the system locally:

### 4.1. Prerequisites
- **Node.js** v18 or higher (v22 recommended)
- **NJS Package Lock** npm CLI

### 4.2. Clone the repository and Install Dependencies
Navigate to the root workspace directory and run:
```bash
# Installs Vite, React, Express, esbuild, and TSX runtimes
npm install
```

### 4.3. Set Up Environment configurations
Copy the example environment credentials file:
```bash
cp .env.example .env
```
Ensure that variables are appropriately declared within `.env`.

### 4.4. Boot the Development Server
Launches the Express API server concurrently with Vite asset compilers:
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 5. Deployment Guide

### 5.1. Production Compilation
Produce fully compiled, minimized, container-friendly static bundles and unified Node backend code:
```bash
npm run build
```
This performs a two-step process:
1. Compiles frontend assets into absolute paths in standard `/dist` folder.
2. Compiles the TypeScript `server.ts` into a fast, portable CommonJS bundle `/dist/server.cjs` utilizing `esbuild`.

### 5.2. Run the Production Build Locally
```bash
npm run start
```

### 5.3. Docker Container Deployment
We have bundled a robust multi-stage `Dockerfile`. Build and execute it:
```bash
# Build docker container
docker build -t pleasurehub-platform .

# Run container binding port 3000
docker run -p 3000:3000 --name pleasurehub-app pleasurehub-platform
```

### 5.4. Google Cloud Run Deployment
Deploy the container directly to Google Cloud Run to auto-scale on secure environments:
```bash
# Build and submit container via Google Cloud Build
gcloud builds submit --tag gcr.io/[PROJECT_ID]/pleasurehub-platform

# Deploy image to Cloud Run setting entry gateway
gcloud run deploy pleasurehub-platform \
  --image gcr.io/[PROJECT_ID]/pleasurehub-platform \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated
```
Your full-stack system is now scaled globally under secure HTTPS routing!
