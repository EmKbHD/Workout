import { maskError } from "graphql-yoga";
import User from "../../model/userModel.js";
import Workout from "../../model/workoutModel.js";

export default {
  Query: {
    getUsers: async (parent, args, context, info) => {
      try {
        const users = await User.find({});
        if (!users) {
          throw new Error("No Users found");
        }
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    getUserById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  User: {
    workouts: async (parent) => {
      const workouts = await Workout.find({ user: parent.id });
      return workouts;
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (_, { input }) => {
      try {
        // const user = new User({ ...input });
        // await user.save();
        // console.log(user);
        // return { ...user._doc, id: user._id };

        const { name, email, password } = input;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const newUser = new User({
          name,
          email,
          password, // Ideally, hash this before saving
        });

        await newUser.save();

        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    // Update an existing user
    async updateUser(_, { id, input }) {
      try {
        const user = await User.findByIdAndUpdate(id, input, { new: true });
        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (err) {
        throw new Error(err);
      }
    },

    // Delete an existing user
    async deleteUser(_, { id }) {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error("User not found");
        }

        return { message: "User deleted successfully" };
      } catch (err) {
        throw new Error(maskError);
      }
    },
  },
};
