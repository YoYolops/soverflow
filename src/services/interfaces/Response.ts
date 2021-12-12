export interface PostQuestion {
    id: number,
};

export interface UnansweredQuestion {
    question: string,
    student: string,
    class: string,
    tags: string,
    answered: boolean,
    submitAt: string,
};

export interface AnsweredQuestion extends UnansweredQuestion {
	answeredAt: string,
	answeredBy: string,
	answer: string,
}