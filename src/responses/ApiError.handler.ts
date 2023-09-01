class ApiError extends Error {
    status = 400;

    constructor(status: number, message: string) {
        super();
        this.status = status;
        this.message = message;

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    getErrorMessage() {
        return 'Something went wrong: ' + this.message;
    }
    badRequest(message: string) {
        return new ApiError(400, message);
    }

    unauthorized(message: string) {
        return new ApiError(401, message);
    }

    forbidden(message: string) {
        return new ApiError(403, message);
    }

    internal(message: string) {
        return new ApiError(405, message);
    }
}

export default ApiError;
