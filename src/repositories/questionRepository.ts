import connection from '../database/connection';
import Question from '../interfaces/Question';
import Tag from './interfaces/Tag';
import TagGroup from './interfaces/TagGroup';

async function registerTag(tag: string): Promise<Tag> {
    const createdTag = await connection.query('INSERT INTO tags (name) VALUES ($1) RETURNING *;', [tag]);
    return createdTag.rows[0];
}

async function findTagByName(name: string): Promise<Tag | null> {
    const tagFound = await connection.query('SELECT * FROM tags WHERE name = $1;', [name]);
    return tagFound.rows[0];
}

async function registerTagGroup(tagGroup: TagGroup): Promise<TagGroup> {
    const { tagId, questionId } = tagGroup;

    const registeredTagGroup = await connection.query(
        'INSERT INTO tags_group (tag_id, question_id) VALUES ($1, $2) RETURNING *;',
        [tagId, questionId],
    );

    return registeredTagGroup.rows[0];
}

async function registerQuestion(questionBody: Question): Promise<Question> {
    const { question, student, class: classe } = questionBody;

    const createdQuestion = await connection.query(
        'INSERT INTO questions (question, student, class) VALUES ($1, $2, $3) RETURNING *;',
        [question, student, classe],
    );

    return createdQuestion.rows[0];
}

export default {
    registerTag,
    findTagByName,
    registerTagGroup,
    registerQuestion,
};
