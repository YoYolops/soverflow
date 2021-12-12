export default interface Question {
    id?: number,
    question: string,
    student: string,
    class: string,
    tags: string,
    answered?: boolean,
    submitAt?: string,
    answeredAt?: string,
    answeredBy?: string,
    answerId?: number,
};