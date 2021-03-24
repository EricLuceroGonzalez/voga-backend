// ERROR model

class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // Add message properties
      this.code = errorCode; // Add a 'code' property
    }
  }
  
  module.exports = HttpError;
  