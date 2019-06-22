// Queries
import AccountQueries from "./Query/Account";
import ScorecardQueries from "./Query/Scorecard";
import StrokeQueries from "./Query/Stroke";

//Mutations
import { Auth } from "./Mutation/Auth";
import ScorecardMutations from "./Mutation/Scorecard";
import StrokeMutations from "./Mutation/Stroke";

export default {
  Mutation: {
    ...Auth,
    ...ScorecardMutations,
    ...StrokeMutations
  },
  Query: {
    ...AccountQueries,
    ...ScorecardQueries,
    ...StrokeQueries
  }
};
