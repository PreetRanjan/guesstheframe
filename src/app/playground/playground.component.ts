import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/Question';
import { GameService } from '../services/game.service';
import { GameSession } from '../models/GameSession';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent {
  sessionId: number = 0;
  gameSession: GameSession = null;
  isLoading: boolean = true;
  currentQuestionId: number = 0;
  hasRevealed: boolean = false;
  currentQuestion: Question = {
    contentLink:
      'https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80',
    answer: 'Reveal Answer',
    id: 0,
    type: '0',
    dateCreated: '',
    text: 'Guess The Movie',
  };
  answer: string = 'Reveal Answer';
  currentIndex: number = 0;
  nextFrametext = 'NEXT FRAME';
  constructor(private route: ActivatedRoute, private gs: GameService) {
    this.sessionId = route.snapshot.params['id'];
    console.log(this.sessionId);

    gs.GetSessionById(this.sessionId).subscribe((sessions) => {
      this.gameSession = sessions;
      this.currentQuestionId = this.gameSession.questions[0].id;
      this.currentQuestion = this.gameSession.questions[0];

      this.isLoading = false;
    });
  }

  revealAnswer() {
    this.hasRevealed = true;
    this.answer = this.currentQuestion.answer;
  }
  nextFrame() {
    this.isLoading = true;
    this.currentIndex += 1;

    this.currentQuestionId = this.gameSession.questions[this.currentIndex].id;
    this.currentQuestion = this.gameSession.questions[this.currentIndex];

    this.answer = 'Reveal Answer';

    this.hasRevealed = false;
    this.isLoading = false;
    if (this.currentIndex == this.gameSession.questions.length - 1) {
      this.nextFrametext = 'END OF SESSION';
      return;
    }
  }
}
