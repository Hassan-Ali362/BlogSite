class MyError extends Error {
  constructor(status, message) {
    super(message || "Backend Error!");
    this.status = status || 500;
  }
}

export default MyError;
