# School Management API

A Node.js REST API for managing schools with location-based search functionality.

## 🌐 Live Demo
**API URL**: [https://school-management-api-mauve.vercel.app/](https://school-management-api-mauve.vercel.app/)

## 👨‍💻 Developer
**Abhishek Rajoria**  
📧 Email: [abhishekrajoria24@gmail.com](mailto:abhishekrajoria24@gmail.com)  
🌐 Portfolio: [https://abhishek-rajoria.vercel.app/](https://abhishek-rajoria.vercel.app/)  
📱 GitHub: [https://github.com/Abhishek1334](https://github.com/Abhishek1334)

## Features

-   Add schools with name, address, and coordinates
-   List schools sorted by distance from user location
-   Simple Euclidean distance calculation
-   MySQL database integration

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MySQL
-   **ORM**: mysql2
-   **Environment**: dotenv

## API Endpoints

### Add School

```
POST /api/addSchool
```

**Request Body:**

```json
{
    "name": "School Name",
    "address": "School Address",
    "latitude": 40.7128,
    "longitude": -74.006
}
```

**Response:**

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 40.7128,
        "longitude": -74.006
    }
}
```

### List Schools

```
GET /api/listSchools?latitude=40.7128&longitude=-74.0060
```

**Response:**

```json
[
    {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 40.7128,
        "longitude": -74.006,
        "distance": 0.1234
    }
]
```

### Health Check

```
GET /health
```

## Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd school-management
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment variables**

    ```bash
    cp .env.example .env
    ```

    Update `.env` with your database credentials:

    ```
    MYSQL_HOST=localhost
    MYSQL_PORT=3306
    MYSQL_USER=root
    MYSQL_PASSWORD=your_password
    MYSQL_DB=school_management
    ```

4. **Database setup**

    ```bash
    # Run the SQL schema
    mysql -u root -p < sql/schema.sql
    ```

5. **Start development server**
    ```bash
    npm run dev
    ```

## Project Structure

```
school-management/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   └── schoolController.js # API controllers
├── routes/
│   └── schoolRoutes.js     # API routes
├── utils/
│   ├── apiResponse.js      # Response helpers
│   ├── distance.js         # Distance calculation
│   └── validators.js       # Input validation
├── sql/
│   └── schema.sql          # Database schema
├── server.js               # Main server file
└── package.json
```

## Database Schema

```sql
CREATE TABLE schools (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_lat_long (latitude, longitude)
);
```

## Testing

Use the provided Postman collection in `postman/SchoolManagement.postman_collection.json` to test the API endpoints.

