// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import mongoose from 'mongoose';
import userModel from '../models/userModel';

export default {
  Query: {
    users: async () => {
      return await userModel.find();
    },
    userById: async (_parent: undefined, args: {id: string}) => {
      return await userModel.findById(args.id);
    },
  },
  Mutation: {
    createUser: async (
      _parent: undefined,
      args: {user_name: String; email: String}
    ) => {
      console.log(args);
      const newUser = new userModel(args);
      return await newUser.save();
    },
    updateUser: async (
      _parent: undefined,
      args: {id: mongoose.Types.ObjectId; user_name: String; email: String}
    ) => {
      console.log(args);
      return await userModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteUser: async (_parent: undefined, args: {id: string}) => {
      return await userModel.findByIdAndDelete(args.id);
    },
  },
};
