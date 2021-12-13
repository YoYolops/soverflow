import UnformattedDataError from '../errors/UnformattedDataError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import MethodNotAllowedError from '../errors/MethodNotAllowedError';

function errorIsKnown(error: any) {
    if (error instanceof UnformattedDataError
        || error instanceof NotFoundError
        || error instanceof ConflictError
        || error instanceof MethodNotAllowedError) return true;
    return false;
}

export default {
    errorIsKnown,
};
