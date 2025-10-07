#  Express.js RESTful API — Product Management

##  Overview

This project is part of the **Week 2 Express.js Assignment** for the PLP Full-Stack Web Development (MERN) specialization.
It demonstrates how to build a **RESTful API** using **Express.js**, with proper routing, middleware, and error handling.

The API manages a collection of **products** and supports full **CRUD (Create, Read, Update, Delete)** operations, along with extra features like **filtering**, **pagination**, and **search**.

---

##  Features

CRUD Operations (Create, Read, Update, Delete)
Middleware for logging, authentication, and validation
Error handling using Express’s global error middleware
Filtering, searching, and pagination on products
Organized file structure (controllers, routes, middleware, data)
Ready for testing with Postman or VS Code’s Postman extension
API key–based authentication

---

##  Project Structure

```
express-js-server-side-framework-Dubleu-x/
├── controllers/
│   └── productController.js
├── data/
│   └── products.js
├── middleware/
│   ├── auth.js
│   ├── logger.js
│   └── validateProduct.js
├── routes/
│   └── productRoutes.js
├── server.js
├── .env.example
├── package.json
└── README.md
```

---

##  Setup Instructions

### 1 Prerequisites

Make sure you have installed:

* **Node.js v18+**
* **npm** or **yarn**
* (Optional) **Postman** or the **Postman VS Code extension**

---

### 2 Installation

1. Clone your GitHub Classroom repository:

   ```bash
   git clone <your-repository-url>
   cd express-js-server-side-framework-Dubleu-x
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The server runs at:
   👉 **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Environment Variables

The `.env.example` file contains environment variable examples.
Create a `.env` file in your project root and add your values:

```
PORT=3000
API_KEY=mysecretkey
```

---

##  API Endpoints

### 🔹 Base URL

```
http://localhost:3000/api/products
```

###  1. GET `/api/products`

Retrieve all products (with optional filtering, search, and pagination).

#### Example Request:

```
GET /api/products?category=electronics&search=phone&page=1&limit=2
```

#### Example Response:

```json
{
  "total": 2,
  "page": 1,
  "limit": 2,
  "data": [
    {
      "id": "2",
      "name": "Smartphone",
      "description": "Latest model with 128GB storage",
      "price": 800,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

###  2. GET `/api/products/:id`

Retrieve a specific product by ID.

#### Example Request:

```
GET /api/products/2
```

#### Example Response:

```json
{
  "id": "2",
  "name": "Smartphone",
  "description": "Latest model with 128GB storage",
  "price": 800,
  "category": "electronics",
  "inStock": true
}
```

---

###  3. POST `/api/products`

Create a new product.
 Requires `x-api-key` header.

#### Headers:

```
x-api-key: mysecretkey
Content-Type: application/json
```

#### Body:

```json
{
  "name": "Microwave",
  "description": "800W compact microwave oven",
  "price": 150,
  "category": "kitchen",
  "inStock": true
}
```

#### Example Response:

```json
{
  "id": "c7b8d810-5e02-46a9-b799-b8c9a8cc9943",
  "name": "Microwave",
  "description": "800W compact microwave oven",
  "price": 150,
  "category": "kitchen",
  "inStock": true
}
```

---

###  4. PUT `/api/products/:id`

Update an existing product by ID.
 Requires `x-api-key` header.

#### Example Request:

```
PUT /api/products/2
```

#### Body:

```json
{
  "price": 900,
  "inStock": false
}
```

#### Example Response:

```json
{
  "id": "2",
  "name": "Smartphone",
  "description": "Latest model with 128GB storage",
  "price": 900,
  "category": "electronics",
  "inStock": false
}
```

---

###  5. DELETE `/api/products/:id`

Delete a product by ID.
 Requires `x-api-key` header.

#### Example Request:

```
DELETE /api/products/3
```

#### Example Response:

```json
{
  "message": "Product deleted",
  "deleted": [
    {
      "id": "3",
      "name": "Coffee Maker",
      "description": "Programmable coffee maker with timer",
      "price": 50,
      "category": "kitchen",
      "inStock": false
    }
  ]
}
```

---

###  6. GET `/api/products/stats`

Get statistics (number of products per category).

#### Example Response:

```json
{
  "totalProducts": 3,
  "stats": {
    "electronics": 2,
    "kitchen": 1
  }
}
```

---

##  Middleware Overview

| Middleware           | File                            | Purpose                                           |
| -------------------- | ------------------------------- | ------------------------------------------------- |
| **Logger**           | `middleware/logger.js`          | Logs method, URL, and timestamp for every request |
| **Auth**             | `middleware/auth.js`            | Checks for `x-api-key` in headers                 |
| **Validate Product** | `middleware/validateProduct.js` | Ensures product data has valid fields             |
| **Error Handler**    | Defined in `server.js`          | Handles all runtime and 404 errors                |

---

##  Error Handling

Common error responses:

| Error                                  | HTTP Status | Example Response                                                |
| -------------------------------------- | ----------- | --------------------------------------------------------------- |
| Product not found                      | 404         | `{ "error": "Product not found" }`                              |
| Invalid product data                   | 400         | `{ "error": "Invalid product data. All fields are required." }` |
| Unauthorized (API key missing/invalid) | 401         | `{ "error": "Unauthorized: Invalid or missing API key" }`       |

---

##  Testing the API

You can test all endpoints using:

* **Postman App**
* **VS Code Postman Extension**
* **cURL** in terminal

Example using cURL:

```bash
curl -X GET http://localhost:3000/api/products
```

---

##  Dependencies

```json
"dependencies": {
  "body-parser": "^1.20.2",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "uuid": "^9.0.1"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}
```

---

##  Author

**Name:** Sylvester 
**Course:** PLP Academy — Full-Stack Web Development (MERN)
**Week:** 2 — Express.js Server-Side Framework

---

## Notes

* Data is stored **in memory** (`data/products.js`) and resets when the server restarts.
* To persist data, this can later be converted to a JSON file or database (e.g., MongoDB).

