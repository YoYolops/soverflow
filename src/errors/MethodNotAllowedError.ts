class MethodNotAllowedError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
        this.name = 'Method Not Allowed';
        this.statusCode = 405;
    }
}

export default MethodNotAllowedError;
