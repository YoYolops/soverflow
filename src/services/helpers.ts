import Question from '../interfaces/Question';
import Tag from '../repositories/interfaces/Tag';
import Class from '../repositories/interfaces/Class';
import questionRepository from '../repositories/questionRepository';
import * as Response from './interfaces/Response';
import userRepository from '../repositories/userRepository';

/*
    Since tags cannot be repeated and the user can inform one never seen before,
    this function will make sure that informed tags are registered only
    if they're not in database yet.
*/
async function registerMultipleTagsWithoutRepetition(tagsArray: string[]): Promise<Tag[]> {
    const createTagHandler = async (tagName: string): Promise<Tag> => {
        const tagFound = await questionRepository.findTagByName(tagName);
        if (tagFound) return tagFound;

        return questionRepository.registerTag(tagName);
    };

    const parallelRequests = tagsArray.map((tagName: string) => createTagHandler(tagName));
    const registeredTags = await Promise.all(parallelRequests);
    return registeredTags;
}

function parseTagsArrayToString(tagsArray: Tag[]): string {
    let tagString = '';
    tagsArray.forEach((tag, index, arr) => {
        if (index === arr.length - 1) {
            tagString += tag.name;
        } else {
            tagString += `${tag.name}, `;
        }
    });

    return tagString;
}

function parseDateToString(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

/*
    In GET /question/:id there are multiples response types based on wheter
    it's an answered or unanswered question. The function below will define
    wich formmating the user must receive and format it.
*/
async function questionResponseFormatter(questionBody: Question, tagsArray: Tag[])
    : Promise<Response.AnsweredQuestion | Response.UnansweredQuestion> {
    const { answerId } = questionBody;
    const baseData = {
        question: questionBody.question,
        student: questionBody.student,
        class: questionBody.class,
        submitAt: parseDateToString(questionBody.submitAt),
        answered: !!answerId, // Since primary key auto incremented never is 0 there'll be no danger
        tags: parseTagsArrayToString(tagsArray),
    };
    if (!answerId) return baseData;

    const answerData = await questionRepository.findAnswerById(answerId);
    const userData = await userRepository.findUserById(answerData.submitBy);

    return {
        ...baseData,
        answeredAt: parseDateToString(answerData.submitAt),
        answeredBy: userData.name,
        answer: answerData.answer,
    };
}

/* It only register a class if it is not registered yet */
async function handleClassRegistration(className: string): Promise<Class> {
    const formattedClassName = className.toUpperCase();
    const foundClassName = await userRepository.findClassByName(formattedClassName);
    if (foundClassName) return foundClassName;

    const classNameRegistration = await userRepository.createClass({ name: formattedClassName });
    return classNameRegistration;
}

export default {
    registerMultipleTagsWithoutRepetition,
    questionResponseFormatter,
    parseDateToString,
    parseTagsArrayToString,
    handleClassRegistration,
};
