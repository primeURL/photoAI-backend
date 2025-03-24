

interface ErrorDetails{
    message:string,
    error?:any
}

class ErrorHandler extends Error {
    public message: string;
    public error: any;
    
    constructor(errorDetails: ErrorDetails, public statusCode: number) {
      super(errorDetails.message);
      this.message = errorDetails.message;
      this.error = errorDetails.error;
      this.statusCode = statusCode;
    }
  }

export default ErrorHandler