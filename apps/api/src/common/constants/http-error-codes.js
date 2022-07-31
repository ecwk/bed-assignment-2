const HTTP_ERROR_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  500: 'Internal Server Error'
};

module.exports = { HTTP_ERROR_CODES };
