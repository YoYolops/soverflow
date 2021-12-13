import connection from '../database/connection';
import User from '../interfaces/User';
import Class from './interfaces/Class';

async function createUser(userData: User): Promise<User> {
    const { name, token, classId } = userData;

    const userCreated = await connection.query(
        /* it'll return some snake case keys, wich shouldnt be a problem since they arent used */
        'INSERT INTO users (name, token, class_id) VALUES ($1, $2, $3) RETURNING *;',
        [name, token, classId],
    );

    return userCreated.rows[0];
}

async function createClass(classData: Class): Promise<Class> {
    const { name } = classData;

    const classCreated = await connection.query(
        'INSERT INTO classes (name) VALUES ($1) RETURNING *;',
        [name],
    );

    return classCreated.rows[0];
}

async function findClassByName(className: string): Promise<Class | null> {
    const foundClass = await connection.query(
        'SELECT * FROM classes WHERE name = $1',
        [className],
    );

    return foundClass.rows[0];
}

async function findUserById(userId: number): Promise<User | null> {
    const userFound = await connection.query(
        'SELECT id, name, token, class_id AS classId FROM users WHERE id = $1',
        [userId],
    );

    return userFound.rows[0];
}

/* To avoid ambguity it isnt allowed the same name to be registered, even from different classes */
async function findUserByName(userName: string): Promise<User | null> {
    const foundUser = await connection.query(
        'SELECT * FROM users WHERE name = $1',
        [userName],
    );

    return foundUser.rows[0];
}

async function findUserByToken(token: string): Promise<User | null> {
    const foundUser = await connection.query(
        'SELECT * FROM users WHERE token = $1',
        [token],
    );

    return foundUser.rows[0];
}

export default {
    createUser,
    createClass,
    findClassByName,
    findUserByName,
    findUserByToken,
    findUserById,
};
