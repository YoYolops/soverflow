import UnformattedDataError from '../errors/UnformattedDataError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';

function errorIsKnown(error: any) {
    if (error instanceof UnformattedDataError
        || error instanceof NotFoundError
        || error instanceof ConflictError) return true;
    return false;
}

export default {
    errorIsKnown,
};
