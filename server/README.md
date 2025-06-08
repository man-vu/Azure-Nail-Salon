# Nail Salon Backend Server

This folder contains an Express.js server using Prisma ORM and JWT authentication.

## Setup

1. Install dependencies (requires internet access):
   ```bash
   cd server
   npm install
   ```
2. Create the SQLite database using Prisma:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```
3. Start the server:
   ```bash
   npm start
   ```

The server runs on port `3001` by default.

## MSSQL Database

If you prefer to use Microsoft SQL Server, run the SQL script at `server/mssql/schema.sql`:

```bash
sqlcmd -S <your-server> -i server/mssql/schema.sql
```

This creates the same tables as the Prisma schema and inserts sample data for
designers, service categories (including descriptions, pricing and timing
details) and services.

## Project Structure

- `routes/` express route modules
- `services/` application logic
- `models/` database access using Prisma
- `middleware/` authentication helpers

All API endpoints are mounted under `/api`.

### Reviews and Gallery

Customer testimonials can be retrieved from `/api/reviews`.

Gallery images are available from `/api/gallery`.

### Transactions

Financial operations are stored in a `Transaction` table. Routes are available under `/api/transactions` to create and list user transactions.

## Docker Container

You can run the server in a Docker container. A `Dockerfile` and `.dockerignore` are
provided in the `server/` folder.

1. Build the image:
   ```bash
   docker build -t nailsalon-api ./server
   ```
2. Run the container locally:
   ```bash
   docker run -p 3001:3001 --env-file server/.env nailsalon-api
   ```
   The API will be available at `http://localhost:3001`.

### Publishing to Azure Container Registry

1. Create an Azure Container Registry (ACR) if you don’t have one:
   ```bash
   az acr create -n <registry-name> -g <resource-group> --sku Basic
   ```
2. Log in and push the image:
   ```bash
   az acr login -n <registry-name>
   docker tag nailsalon-api <registry-name>.azurecr.io/nailsalon-api:v1
   docker push <registry-name>.azurecr.io/nailsalon-api:v1
   ```
3. Test the image with Azure Container Instances or deploy it to Azure Container Apps:
   ```bash
   az container create -g <resource-group> --name nailsalon-api \
      --image <registry-name>.azurecr.io/nailsalon-api:v1 --dns-name-label nailsalon-api \
      --ports 3001 --environment-variables PORT=3001 DATABASE_URL=<connection-string>
   ```

Replace placeholders with your registry name, resource group and database connection string.
