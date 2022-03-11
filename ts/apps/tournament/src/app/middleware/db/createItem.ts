import { buildErrObject } from '../utils/buildErrObject';
import * as mongoose from "mongoose";
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
export const createItem = (req = {}, model: any) => {
  return new Promise((resolve, reject) => {
    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message));
      }
      resolve(item);
      const itemId = {
        id: new mongoose.Types.ObjectId(item._id).toString()
      }
      resolve(itemId);
    });
  });
};
