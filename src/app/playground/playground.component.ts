import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../models/Question';
import { GameService } from '../services/game.service';
import { GameSession } from '../models/GameSession';
import { max } from 'rxjs/operators';

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
  nextFrametext = 'Next';
  prevFrametext = 'First';
  constructor(
    private route: ActivatedRoute,
    private gs: GameService,
    private router: Router
  ) {
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
    if (this.nextFrametext == 'End') {
      this.router.navigate(['/']);
    }
    this.isLoading = true;
    this.currentIndex += 1;
    if (this.currentIndex == this.gameSession.questions.length - 1) {
      this.currentIndex = this.gameSession.questions.length - 1;
      this.isLoading = false;
      this.nextFrametext = 'End';
      return;
    } else {
      this.currentQuestionId = this.gameSession.questions[this.currentIndex].id;
      this.currentQuestion = this.gameSession.questions[this.currentIndex];

      this.answer = 'Reveal Answer';

      this.hasRevealed = false;
      this.isLoading = false;

      this.prevFrametext = 'Prev';
    }
  }

  prevFrame() {
    if (this.currentIndex > 0) {
      this.isLoading = true;
      this.currentIndex -= 1;

      this.currentQuestionId = this.gameSession.questions[this.currentIndex].id;
      this.currentQuestion = this.gameSession.questions[this.currentIndex];

      this.answer = 'Reveal Answer';

      this.hasRevealed = false;
      this.isLoading = false;
      if (this.currentIndex == this.gameSession.questions.length - 1) {
        this.nextFrametext = 'End';
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
    }
  }
  score1: number = 0;
  score2: number = 0;
  score3: number = 0;
  score4: number = 0;

  player1: string = 'GajarMuli';
  player2: string = 'Nir-Amish';
  player3: string = 'LazizSheikh';
  player4: string = 'BL Vish';

  get MaxScore() {
    let scores = [this.score1, this.score2, this.score3, this.score4];
    if (Math.max(...scores) > 0) {
      return Math.max(...scores);
    }
  }

  scorePlus(i) {
    if (i == 1) {
      this.score1 += 1;
    } else if (i == 2) {
      this.score2 += 1;
    } else if (i == 3) {
      this.score3 += 1;
    } else if (i == 4) {
      this.score4 += 1;
    }
  }

  scoreMinus(i) {
    if (i == 1) {
      if (this.score1 <= 0) {
        this.score1 = 0;
      } else {
        this.score1 -= 1;
      }
    } else if (i == 2) {
      if (this.score2 <= 0) {
        this.score2 = 0;
      } else {
        this.score2 -= 1;
      }
    } else if (i == 3) {
      if (this.score3 <= 0) {
        this.score3 = 0;
      } else {
        this.score3 -= 1;
      }
    } else if (i == 4) {
      if (this.score4 <= 0) {
        this.score4 = 0;
      } else {
        this.score4 -= 1;
      }
    }
  }
}
