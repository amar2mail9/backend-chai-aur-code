// try cath

/* 
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

*/

const asyncHandler = (requestHandler) => {
  (req, resizeBy, next) => {
    Promise.resolve(requestHandler(req, resizeBy, next)).catch((error) => {
      next(error);
    });
  };
};

export { asyncHandler };
