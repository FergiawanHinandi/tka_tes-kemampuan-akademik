// Sukses
{
  "success": true,
  "statusCode": 200,
  "message": "Data retrieved successfully",
  "data": { ... },
  "meta": {                    // Untuk list/pagination
    "page": 1,
    "perPage": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}

// Error
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is already taken"
    }
  ]
}