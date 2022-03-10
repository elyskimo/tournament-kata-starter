import { buildErrObject } from '../utils/buildErrObject';
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
    });
  });
};
