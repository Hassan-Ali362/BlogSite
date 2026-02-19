
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Error in Backend";
  const extraDetails = err.extraDetails || "Error in Backend";

  return res.status(status).json({message, extraDetails});
}

export default errorMiddleware;