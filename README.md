# Users API Documentation

## `POST /users/register`

Registers a new user in the system.

### Description
This endpoint accepts user registration details and creates a new user account. It performs validation for email format, first name length, and password length before creating the user. Password hashing is handled by the model layer before saving.

### Request URL
`POST /users/register`

### Request Body
The request body must be sent as JSON and include the following fields:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Required Fields
- `fullname.firstname` (string): required, minimum 3 characters
- `fullname.lastname` (string): optional, minimum 3 characters if provided
- `email` (string): required, must be a valid email address
- `password` (string): required, minimum 6 characters

### Response
- `201 Created` - User successfully registered.
- `400 Bad Request` - Validation failed or required fields are missing.
- `500 Internal Server Error` - Server error during user creation.

### Successful Response Example
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response Example
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## `POST /users/login`

Authenticates an existing user and returns a JWT token.

### Description
This endpoint accepts user login credentials (email and password) and authenticates the user. It performs validation for email format and password length before checking credentials against the database.

### Request URL
`POST /users/login`

### Request Body
The request body must be sent as JSON and include the following fields:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Required Fields
- `email` (string): required, must be a valid email address
- `password` (string): required, minimum 6 characters

### Response
- `200 OK` - User successfully authenticated.
- `400 Bad Request` - Validation failed or required fields are missing.
- `401 Unauthorized` - Invalid email or password.
- `500 Internal Server Error` - Server error during authentication.

### Successful Response Example
```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error Response Example
```json
{
  "message": "Invalid email or password"
}
```
