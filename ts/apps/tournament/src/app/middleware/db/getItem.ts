import { buildErrObject } from '../utils/buildErrObject';
/**
 * Creates a new item in database
 * @param id
 * @param model
 */
export const getItem = (id: string, model: any) => {
  return new Promise((resolve, reject) => {
    model.findById(id,(err,item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item);
    })

  });
};
