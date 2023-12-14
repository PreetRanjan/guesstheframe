export class RiddleHeader {
  id: number;
  title: string;
  riddles: Riddle[];
}

export class Riddle {
  id: number;
  riddleHeaderId: number;
  riddleSpell: string;
  answer: string;
}
