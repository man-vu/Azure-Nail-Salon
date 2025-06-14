# Shared Database Schema

This folder holds the common Prisma schema used by all backend microservices. It no longer contains an Express server.

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```
2. Set a `DATABASE_URL` pointing to your SQL Server instance, then apply the schema and seed sample data:
   ```bash
   export DATABASE_URL="sqlserver://localhost:1433;database=NailSalon;user=sa;password=Your_password123;trustservercertificate=true"
   npx prisma db push
   node prisma/seed.js
   ```

The generated Prisma client (`prisma/client.js`) is imported by each microservice.

## MSSQL Database

If you prefer to initialize the database manually, run the SQL script in `mssql/schema.sql` using `sqlcmd`:

```bash
sqlcmd -S <your-server> -i server/mssql/schema.sql
```
