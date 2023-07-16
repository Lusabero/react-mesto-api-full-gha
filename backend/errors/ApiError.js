class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequestError(message) {
    return new ApiError(400, message);
  }

  static unauthirizedError() {
    return new ApiError(401, 'Необходима авторизация');
  }

  static forbiddenError() {
    return new ApiError(403, 'Недостаточно прав!');
  }

  static notFoundError(message) {
    return new ApiError(404, message);
  }

  static conflictError(message) {
    return new ApiError(409, message);
  }

  static defaultError() {
    return new ApiError(500, 'Что-то пошло не так...');
  }
}

module.exports = { ApiError };
