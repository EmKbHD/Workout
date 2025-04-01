import Workout from "../../model/workoutModel.js";
import User from "../../model/userModel.js";

export default {
  Query: {
    getWorkouts: async (parent, args, context, info) => {
      // console.log(parent);
      // console.log(args);
      // console.log("display context: ", context);
      // console.log("display info: ", info);

      try {
        const workouts = await Workout.find({});
        if (!workouts) {
          throw new Error("No workouts found");
        }
        return workouts;
      } catch (err) {
        throw new Error(err);
      }
    },

    getWorkoutById: async (_, { id }) => {
      try {
        const workout = await Workout.findById(id);
        if (!workout) {
          throw new Error("Workout not found");
        }
        return workout;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  // Define a resolver for the Workout type to get user info
  Workout: {
    user: async (parent, args, context, info) => {
      console.log("parent: ", parent);

      try {
        if (!parent.user) {
          throw new Error("Workout is missing user");
        }

        const user = await User.findById(parent.user);
        if (!user) {
          // throw new Error(`User not found for ID: ${parent.user}`);
          return { id: parent.user, name: "Unknown", email: "Unknown" };
        }

        return user;
      } catch (error) {
        console.error("Error fetching user:", error.message);
        return { id: parent.user, name: "Unknown", email: "Unknown" };
      }
    },
  },

  Mutation: {
    // Create a new workout
    createWorkout: async (_, { input }) => {
      try {
        const { title, reps, load } = input;

        // Validate user existence
        const user = await User.findById(user);
        if (!user) {
          throw new Error("User not found");
        }

        // Create workout with reference to user
        const newWorkout = new Workout({
          title,
          reps,
          load,
          user: user._id, // Ensure this is an ObjectId
        });

        // Save to database
        await newWorkout.save();

        return {
          ...newWorkout._doc,
          user, // Populate the user details
        };
      } catch (err) {
        throw new Error(err);
      }
    },

    // Update an existing workout
    async updateWorkout(_, { id, input }) {
      try {
        const workout = await Workout.findByIdAndUpdate(id, input, {
          new: true,
        });
        if (!workout) {
          throw new Error("Workout not found");
        }

        return workout;
      } catch (err) {
        throw new Error(err);
      }
    },

    // Delete an existing workout
    async deleteWorkout(_, { id }) {
      try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
          throw new Error("Workout not found");
        }

        return { message: "Workout deleted successfully" };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
