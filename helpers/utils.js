const HTTPStatus = require("http-status");

const sendResponse = (
  res,
  data = {},
  statusCode = HTTPStatus.OK,
  message = "success"
) => {
  res.setHeader("Content-Type", "application/json");
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};
const sendError = (
  res,
  data = {},
  statusCode = HTTPStatus.BAD_REQUEST,
  message = "Bad Request"
) => {
  res.setHeader("Content-Type", "application/json");
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};

module.exports = {
  sendResponse,
  sendError,
};
