class ApiAsyncHelper {
  static AsyncHandlerHelper = (handler) => {
    return (req, res, next) => {
      Promise.resolve(handler(req, res, next)).catch(next);
    };
  };
}

export default ApiAsyncHelper;
