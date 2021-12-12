import questionRepository from '../repositories/questionRepository';
import Question from '../interfaces/Question';
import schema from '../schemas/schemas';
import UnformattedDataError from '../errors/UnformattedDataError';
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

export default {
    openQuestion,
};
