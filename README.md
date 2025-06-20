# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Microservices

All backend code now lives in isolated folders under `microservices/`:

- **auth** – user registration and login
- **service** – service and category APIs
- **booking** – booking creation and queries
- **designer** – designer information and schedules
- **transaction** – transactions for bookings
- **review** – customer reviews
- **gallery** – gallery image endpoints
- **gateway** – API gateway routing requests to all services

Install dependencies in each folder and run `npm start` to launch the service.

Alternatively, build all containers and start them together with Docker:

```bash
docker-compose up --build
```

All services share a single database schema located at `server/prisma/schema.prisma`.
Run Prisma migrations or seeding from the `server` folder and each service will
use the same tables via the generated client.

The React frontend resolves API requests to these services using a base URL
configured via environment variables. Two `.env` files are provided:

```
.env.development   # used when running `npm run dev`
.env.production    # used for production builds
```

Both define `VITE_API_GATEWAY_URL` which points the frontend to the API
gateway. Update the production file with the public gateway address provisioned
by your Azure deployment.

### Deploying to Azure

Provision the container registry, database and storage account using the
provided ARM template:

```bash
az deployment group create \
  --resource-group Dreamy-Nails-West \
  --template-uri https://raw.githubusercontent.com/man-vu/Azure-Nail-Salon/9qw2g3-codex/deploy-application-to-azure-with-integrations/azuredeploy.json \
  --parameters sqlAdminUser=sqladminuser sqlAdminPassword='NailS@lon2025!' registryName=nailsalonacr storageAccountName=nailsalonstorage
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
