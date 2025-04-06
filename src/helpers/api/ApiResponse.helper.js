class ApiResponseHelper {
  constructor(statusCode = 200, message = "Success", data = null) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = Date.now();
    this.errors = null;
    this.data = data;
  }

  // NOTHING TO DO
}

export default ApiResponseHelper;
