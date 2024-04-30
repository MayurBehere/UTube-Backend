// Purpose: Custom error class to handle errors in the application

class ApiError extends Error{
    constructor(
        statuscode,     // http status code
        message= "Something went wrong", // default message
        errors= [], // array of validation errors
        stack = ""
    ){
        super(message); // calling the parent class constructor
        this.statuscode = statuscode; // adding new property to the object
        this.errors = errors;   // adding new property to the object
        this.message = message; // adding new property to the object
        this.data = null; // adding new property to the object
        this.success = false; // dont return success by default
      if (stack) {
        this.stack = stack; // if stack is provided use it
      } else {
        Error.captureStackTrace(this, this.constructor);  // if stack is not provided generate it
      }
    } 
}

export default ApiError; // exporting the class to be used in other files`1