import * as dotenv from "dotenv";
dotenv.config();
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import ora from "ora";
import resolvers from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: resolvers as any,
  // mocks: mocks <= add mocks here
  context: request => ({
    ...request,
    prisma
  })
});

const options = {
  port: process.env.PORT,
  endpoint: "/",
  subscriptions: "/sub",
  playground: "/playground"
};

server.start(options, ({ port }) => {
  const spinner = ora().start();
  setTimeout(() => {
    console.log(`Mulligan API has started! Open on port: ${port}`);
    spinner.stop();
  }, 1000);
});
