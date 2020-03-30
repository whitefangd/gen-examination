import QuestionModel from './question-model';



declare class Question1001Model implements QuestionModel {
  content: string;
  answers: Array<Question1001AnswerModel>;
}

export default Question1001Model;