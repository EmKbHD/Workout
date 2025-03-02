import Workout from "../../model/workoutModel.js";

export default {
  Query: {
    getWorkouts: async (parent, args, context, info) => {
      // console.log(parent);
      // console.log(args);
      // console.log("display context: ", context);
      // console.log("display info: ", info);

      try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
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

  Mutation: {
    createWorkout: async (_, { input }) => {
      try {
        const workout = new Workout({ ...input });
        await workout.save();
        console.log(workout);
        return { ...workout._doc, id: workout._id };
      } catch (err) {
        throw new Error(err);
      }
    },

    // updateWorkout: async (_, { input }) => {
    //   try {
    //     const { id, ...update } = input;
    //     const updatedWorkout = await Workout.findByIdAndUpdate(id, update, {
    //       new: true,
    //     });
    //     return updatedWorkout;
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },

    // deleteWorkout: async (_, { id }) => {
    //   try {
    //     const workout = await Workout.findById(id);
    //     if (!workout) {
    //       throw new Error("Workout not found");
    //     }
    //     await workout.delete();
    //     return workout;
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
  },
};
