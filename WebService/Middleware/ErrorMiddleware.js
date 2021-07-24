const notFound = (req, res, next) => {
    const error = new Error('Page not found');
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    res.status = typeof res.status != String ? 500 : res.status;
    if (process.env.ENV == 'dev') {
        res.json({
            message: err.message,
            stack: err.stack,
        })
    } else {
        res.json({
            message: err.message,
        })
    }
};

module.exports = {
    notFound,
    errorHandler,
  };
