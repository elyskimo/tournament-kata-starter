/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
export const buildErrObject = (code: number, message: string) => {
  return {
    code,
    message,
  };
};
