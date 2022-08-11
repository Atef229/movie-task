# API Server Application

> Note this project runs on node 8.10.x

## Config

```console
cp .env.example .env
```

## Setup

Installation.

```console
npm install
```

Fill out the `.env` file.

## Main Libraries

API Server is written in Node.js + Express with the following libs included:

- Mongoose
- Async
- Bcryptjs
- Cors
- Express-Rate-Limit
- Express-Validator
- Jsonwebtoken
- Passport
- Passport-Jwt
- Moment

#### Run in development mode

```console
npm run start:dev
```

#### Run in production mode

```console
npm start
```

#### Linting

```
npm run lint
```
