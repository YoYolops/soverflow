import UnformattedDataError from '../errors/UnformattedDataError';

async function errorIsKnown(error: Error) {
    if (error instanceof UnformattedDataError) return true;
    return false;
}

export default {
    errorIsKnown,
};
