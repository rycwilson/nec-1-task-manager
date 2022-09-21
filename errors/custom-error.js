export default class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}