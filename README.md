# Masters thesis example application

This is an example application made for my masters thesis to demonstrate the effects of clustering
on a Node.js application. The application is based on the [TypeScript-Node-Starter repository.](https://github.com/Microsoft/TypeScript-Node-Starter). This example required the latest 8.X version
of Node.js, due to native async/await usage.

## Running the application 

This repository uses [yarn](https://yarnpkg.com/en/) to manage dependencies. To get started with
the project, install the required dependencies by running

```bash
yarn install
```

To get the database up and running, use [Docker](https://www.docker.com/) and `docker-compose` by
running

```bash
docker-compose up -d
```

After the database is running, you should copy the `.env.example` as your `.env` file by running

```bash
cp .env-example .env
```

Then, run the database migrations and the seed file to add entries to the database

```bash
yarn migrate
yarn seed
```

After these steps, you can build and start the application by running

```bash
yarn build
yarn start
```

To start the clustered version, replace `yarn start` with `yarn start-clustered`.

## Gatling tests

The [gatling](gatling/) folder includes two basic Gatling tests, one sending requests to the
data fetching route, and one sending requests to the data fetching route that includes the CPU
busy loop, to simulate CPU intensive work being done by Node.js
