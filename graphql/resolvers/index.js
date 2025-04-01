import workoutResolver from "./workoutResolver.js";
import userResolver from "./userResolver.js";

export const resolvers = {
  User: userResolver.User,
  Workout: workoutResolver.Workout,

  Query: {
    ...userResolver.Query,
    ...workoutResolver.Query,
  },

  Mutation: {
    ...workoutResolver.Mutation,
    ...userResolver.Mutation,
  },
};
