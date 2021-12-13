import questionRepository from '../repositories/questionRepository';
import Question from '../interfaces/Question';
import schema from '../schemas/schemas';
import UnformattedDataError from '../errors/UnformattedDataError';
import NotFoundError from '../errors/NotFoundError';
import helper from './helpers';
import * as Response from './interfaces/Response';

async function openQuestion(questionBody: Question): Promise<Response.PostQuestion> {
    if (schema.question.validate(questionBody).error) throw new UnformattedDataError('Missing one or more fields');

    const { tags } = questionBody;

    const tagsArray = tags.split(',').map((tag: string) => tag.trim());
    const questionTagsDataPromise = helper.registerMultipleTagsWithoutRepetition(tagsArray);
    const openedQuestionPromise = questionRepository.registerQuestion(questionBody);

    const [questionTagsData, openedQuestion] = await Promise.all([
        questionTagsDataPromise,
        openedQuestionPromise,
    ]);

    // for each tag, we need to create a tagGroup entry to link it with question table
    const tagsGroupPromise = questionTagsData.map((tag) => questionRepository.registerTagGroup({
        tagId: tag.id,
        questionId: openedQuestion.id,
    }));
    await Promise.all(tagsGroupPromise);

    return { id: openedQuestion.id };
}

async function searchQuestion(questionId: number)
    : Promise<Response.AnsweredQuestion | Response.UnansweredQuestion> {
    const questionFoundPromise = questionRepository.findQuestionById(questionId);
    const tagsFromQuestionPromise = questionRepository.getAllTagsFromQuestionId(questionId);
    const [questionFound, tagsFromQuestion] = await Promise.all([
        questionFoundPromise,
        tagsFromQuestionPromise,
    ]);

    if (!questionFound) throw new NotFoundError('The informed question id does not exist');

    const formattedData = helper.questionResponseFormatter(questionFound, tagsFromQuestion);
    return formattedData;
}

async function searchAllUnansweredQuestions(): Promise<Response.UnansweredQuestion[]> {
    const unansweredQuestions = await questionRepository.getAllUnansweredQuestions();
    const formattedUnansweredQuestions = unansweredQuestions.map((question) => ({
        ...question,
        submitAt: helper.parseDateToString(question.submitAt),
    }));

    return formattedUnansweredQuestions;
}

export default {
    openQuestion,
    searchQuestion,
    searchAllUnansweredQuestions,
};
