class UnformattedDataError extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnformattedDataError.prototype);
        this.name = 'Unformatted Data';
        this.statusCode = 422;
    }
}

export default UnformattedDataError;
