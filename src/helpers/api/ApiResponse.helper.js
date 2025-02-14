class ApiResponseHelper {
  constructor(statusCode = 200, message = "Success", data = null) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.error = null;
    this.result = {
      timestamp: Date.now(),
      data
    };
  }

  // NOTHING TO DO
}

export default ApiResponseHelper;
