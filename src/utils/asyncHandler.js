export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

/*
we can use try-catch method instead of promise:

const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message,
        });
    }
};
*/
