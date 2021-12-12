import { v4 as uuid } from 'uuid';
import User from '../interfaces/User';
import * as Response from './interfaces/Response';
import userRepository from '../repositories/userRepository';
import schema from '../schemas/schemas';
import UnformattedDataError from '../errors/UnformattedDataError';
import ConflictError from '../errors/ConflictError';
import helper from './helpers';

async function registerUser(userData: User): Promise<Response.PostUser> {
    if (schema.user.validate(userData).error) throw new UnformattedDataError('One or more fields missing');

    const { name, class: className } = userData;
    const userIsAlreadyregistered = await userRepository.findUserByName(name);
    if (userIsAlreadyregistered) throw new ConflictError('This username is already taken');

    const token = uuid();

    const createdClass = await helper.handleClassRegistration(className);
    const createdUser = await userRepository.createUser({
        ...userData,
        token,
        classId: createdClass.id,
    });

    return { token: createdUser.token };
}

export default {
    registerUser,
};
