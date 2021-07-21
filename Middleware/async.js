/**
 * remove try catch and handle logging
 * @param {*} handler 
 * @returns function
 */
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch (ex) {
      next(ex);
    }
  };
}