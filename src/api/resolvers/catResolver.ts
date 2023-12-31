// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea    -ei toimi
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import {Cat} from '../../interfaces/Cat';
import catModel from '../models/catModel';

export default {
  Query: {
    cats: async () => {
      return await catModel.find();
    },
    catById: async (_parent: undefined, args: {id: string}) => {
      return await catModel.findById(args.id);
    },
    catsByOwner: async (_parent: undefined, args: {id: string}) => {
      return await catModel.find({owner: args.id});
    },
    catsByArea: async (_parent: undefined, args: {coords: [Number]}) => {
      return await catModel.find({location: args.coords});
    },
  },
  Mutation: {
    createCat: async (_parent: undefined, args: Cat) => {
      console.log(
        'argsut modeliin: ' +
          args.cat_name +
          ' ' +
          args.weight +
          ' ' +
          args.birthdate +
          ' ' +
          args.owner.id +
          ' ' +
          args.location.type +
          ' ' +
          args.location.coordinates +
          ' ' +
          args.filename
      );
      const cat = new catModel(args);
      return await cat.save();
    },
    updateCat: async (_parent: undefined, args: Cat) => {
      return await catModel.findByIdAndUpdate(args.id, args, {
        new: true,
      });
    },
    deleteCat: async (_parent: undefined, args: {id: string}) => {
      return await catModel.findByIdAndDelete(args.id);
    },
  },
};
