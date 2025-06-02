**Restaurant Order Management – Backend (Node.js)**

This project implements the backend of a restaurant order management application using Node.js. It provides all necessary APIs and services for handling orders, user roles, product and menu management, and secure data operations.

 **Technologies Used**

- Node.js (backend framework)
- MongoDB / PostgreSQL / MySQL (flexible database support)
- Express.js (API development)
- JWT (secure authentication)
- bcrypt (password hashing)
- Mongoose / Sequelize (ORM/ODM depending on DB)

**Project Features**

- Security
- Secure authentication system with JWT
- Role-based access control
- Data protection and input validation
- Secure session handling

 **Database**

Structured database integration to store:
- User
- Products
- Menus
- Orders

 **RESTful API Endpoints**

Menu API
Fetch detailed list of menus and their components
Product API
Fetch products (optionally by category)
Order API
Submit and retrieve order details
Orders identified by a unique order ID (no payment handling)

 **Back-office Functionality**

User Roles:
- Admin
	- Full access: manage users, products, and menus

- Order Prep Staff
	- View and mark orders as prepared

- Front Desk Staff
	- Create and deliver orders (in person or by phone)

 **API Integration**

Exposes a comprehensive API layer for communication with the frontend.
Enables seamless interaction across user roles and application modules.

**You can access the frontend here:**

The frontend is built with React and is deployed on Netlify.

⚠️ Note: The backend is hosted on Render. It may take a minute to wake up on the first request due to cold start delays. Please be patient when loading data.
👉 [Burguer Planet Front on Netlify](https://poetic-strudel-ab45aa.netlify.app/)
