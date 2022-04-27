import colors from 'colors';

export const ErrorHandler = (err, req, res, next) => {
  console.log(`ERROR =====> ${err.message}`.bgRed.white);
  res.status(500).send('The Server has encountered an error');
};

export const NotFoundHandler = (req, res, next) => {
  console.log(`NOT FOUND =====> ${req.originalUrl}`.bgBlue.black);
  res.status(404).send('The page you are looking for was not found');
  next();
};
