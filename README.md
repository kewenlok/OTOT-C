# OTOT-C

# API

- `POST /register/user` - Register for a user account
  - Expected data:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
- `POST /register/admin` - Register for an admin account
  - Expected data:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
- `POST /login` - Log into an account
  - Expected data:
    ```json
    {
      "username": "username",
      "password": "password"
    }
    ```
- `GET /home` - Access home page (Only accessible by authenticated users)
- `GET /admin` - Access admin page (Only accessible by admin)
