import Tag from '../repositories/interfaces/Tag';
import questionRepository from '../repositories/questionRepository';

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

export default {
    registerMultipleTagsWithoutRepetition,
};
