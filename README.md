# Weather-test

## Project Setup

To start with the app, download from github using `git clone https://github.com/I-GiM/weather-test.git`

Run the comamnd below to install dependencies

```sh
yarn
```

### Compile and Hot-Reload for Development

When you finish installation, run the application with the command below and when it is done, you can visit `http://localhost:5173` to use the app

```sh
yarn dev
```

The app uses a numbee of technologies which include:

- Vue 3 with Vite
- Vuetify for styling
- Tanstack vue-query for data fetching and caching to prevent frequent API calls

To run app sucessfully, you need a `.env` file which you can be shared on request.

### Compile and Minify for Production

To deploy app for production, run `yarn build` and deploy to any platform that supports Vue apps.
