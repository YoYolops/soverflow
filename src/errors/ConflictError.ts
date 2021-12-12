class ConflictError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConflictError.prototype);
        this.name = 'Conflict';
        this.statusCode = 409;
    }
}

export default ConflictError;
