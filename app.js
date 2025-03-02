import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createYoga, createSchema } from "graphql-yoga";
import { typeDefs } from "./graphql/types/index.js";
import { resolvers } from "./graphql/resolvers/index.js";

// Load environment variables from .env file
dotenv.config();

// Express app
const app = express();

// Define a GraphQL schema
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});

// Use Yoga middleware with the Express
app.use("/graphql", yoga);

// Connect to DB
const MONGODB = process.env.MONGO_DB_URL;

mongoose
  .connect(MONGODB)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () =>
      console.log(`Connected to MongoDB and listening on port ${port}...`)
    );
  })
  .catch((err) => console.error(err));
