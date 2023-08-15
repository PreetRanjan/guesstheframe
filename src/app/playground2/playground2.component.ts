import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Question } from '../models/Question';
import { GameSession } from '../models/GameSession';

@Component({
  selector: 'app-playground2',
  templateUrl: './playground2.component.html',
  styleUrls: ['./playground2.component.css'],
})
export class Playground2Component {
  session_id: number = 0;
  currentIndex: number = 0;
  currentSession: GameSession;
  currentQuestion: Question = {
    contentLink:
      'https://sonicsharedstorage.blob.core.windows.net/frames/loading_placeholder.png',
    answer: 'Reveal Answer',
    id: 0,
    type: '0',
    dateCreated: '',
    text: 'Guess The Movie',
  };
  answer: string = 'REVEAL ANSWER';
  hasRevealed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private gs: GameService,
    private router: Router
  ) {
    let session_id = route.snapshot.params['session_id'];
    let questionIndex = route.snapshot.params['qid'];
    this.session_id = session_id;
    console.log('Load for: ', session_id, questionIndex);
    this.currentIndex = parseInt(questionIndex);
    this.currentSession = gs.GameSessions.find((x) => x.id == session_id);
    this.currentQuestion = this.currentSession.questions[questionIndex];

    // this.answer = this.currentSession.questions[0].answer;
  }
  revealAnswer() {
    this.hasRevealed = true;
    this.answer = this.currentQuestion.answer;
  }
  nextFrame() {
    this.currentIndex += 1;
    // this.router.navigate([
    //   'playgrund2',
    //   { session_id: this.session_id, qid: this.currentIndex },
    // ]);
  }

  prevFrame() {}
}
