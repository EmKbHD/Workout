import workoutResolver from "./workoutResolver.js";

export const resolvers = {
  Query: {
    ...workoutResolver.Query,
  },
  Mutation: {
    ...workoutResolver.Mutation,
  },
};
