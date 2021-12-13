import connection from '../database/connection';
import Question from '../interfaces/Question';
import Tag from './interfaces/Tag';
import TagGroup from './interfaces/TagGroup';
import Answer from './interfaces/Answer';

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
        /* it'll return some snake case keys, wich shouldnt be a problem since they arent used */
        'INSERT INTO questions (question, student, class) VALUES ($1, $2, $3) RETURNING *;',
        [question, student, classe],
    );

    return createdQuestion.rows[0];
}

async function findQuestionById(questionId: number): Promise<Question | null> {
    const foundQuestion = await connection.query(
        'SELECT id, student, class, question, submit_at AS "submitAt", answer_id AS "answerId" FROM questions WHERE id = $1',
        [questionId],
    );

    return foundQuestion.rows[0];
}

async function findAnswerById(answerId: number): Promise<Answer | null> {
    const foundAnswer = await connection.query(
        'SELECT id, answer, submit_at AS "submitAt", submit_by as "submitBy" FROM answers WHERE id = $1',
        [answerId],
    );

    return foundAnswer.rows[0];
}

async function getAllTagsFromQuestionId(questionId: number): Promise<Tag[]> {
    const tagsFound = await connection.query(
        'SELECT * FROM tags WHERE id IN (SELECT tag_id FROM tags_group WHERE question_id = $1)',
        [questionId],
    );

    return tagsFound.rows;
}

async function getAllUnansweredQuestions(): Promise<Question[]> {
    const unansweredQuestions = await connection.query(
        'SELECT id, student, class, question, submit_at AS "submitAt" FROM questions WHERE answer_id IS NULL;',
    );

    return unansweredQuestions.rows;
}

async function isQuestionAlreadyAnswered(questionId: number): Promise<boolean> {
    const isAnswered = await connection.query(
        'SELECT * FROM questions WHERE id = $1 AND answer_id IS NULL;',
        [questionId],
    );

    return !isAnswered.rows.length;
}

async function createAnswer(answerData: Answer): Promise<Answer> {
    const {
        answer,
        submitBy,
    } = answerData;

    const createdAnswer = await connection.query(
        `INSERT INTO answers (answer, submit_by) VALUES ($1, $2) 
        RETURNING id, answer, submit_at AS "submitAt", submit_by AS "submitBy";`,
        [answer, submitBy],
    );

    return createdAnswer.rows[0];
}

async function setQuestionAsAnswered(questionId: number, answerId: number): Promise<Question> {
    const updatedQuestion = await connection.query(
        `UPDATE questions SET answer_id = $1 WHERE id = $2
        RETURNING id, student, class, question, submit_at AS "submitAt", answer_id AS "answerId"`,
        [answerId, questionId],
    );

    return updatedQuestion.rows[0];
}

export default {
    registerTag,
    findTagByName,
    registerTagGroup,
    registerQuestion,
    findQuestionById,
    findAnswerById,
    getAllTagsFromQuestionId,
    getAllUnansweredQuestions,
    isQuestionAlreadyAnswered,
    createAnswer,
    setQuestionAsAnswered,
};
