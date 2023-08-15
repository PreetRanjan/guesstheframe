import { Question } from './Question';

export class GameSession {
  id: number;
  title: string;
  dateCreated: string;
  questions: Question[];
}
