// Queries
import { Account } from "./Query/Account";
//Mutations
import { Auth } from "./Mutation/auth";

export default {
  Mutation: {
    ...Auth
  },
  Query: {
    ...Account
  }
};
