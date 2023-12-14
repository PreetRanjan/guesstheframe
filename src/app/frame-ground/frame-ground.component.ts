import { Component, OnInit } from '@angular/core';
import { GameSession } from '../models/GameSession';
import { Question } from '../models/Question';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-frame-ground',
  templateUrl: './frame-ground.component.html',
  styleUrls: ['./frame-ground.component.css'],
})
export class FrameGroundComponent implements OnInit {
  sessionId: number = 0;
  gameSession: GameSession = null;
  isLoading: boolean = true;
  currentQuestionId: number = 0;
  hasRevealed: boolean = false;
  currentQuestion: Question = {
    contentLink: '',
    // contentLink:
    // 'https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80',
    answer: 'Reveal Answer',
    id: 0,
    type: '0',
    dateCreated: '',
    text: 'Guess The Movie',
  };
  answer: string = 'Reveal Answer';
  currentIndex: number = -1;
  nextFrametext = 'Next';
  prevFrametext = 'First';
  isBlurred: boolean = false;
  currentImageUrl: string = '';
  score1: number = 0;
  score2: number = 0;
  score3: number = 0;
  score4: number = 0;

  activePlayer: number = 0;

  // player1: string = 'S.S. GajarMuli';
  // player2: string = 'Nir-Amish';
  // player3: string = 'Laziz Sheikh';
  // player4: string = 'BL Vish';
  player1: string = 'Player 1';
  player2: string = 'Player 2';
  player3: string = 'Player 3';
  player4: string = 'Player 4';
  constructor(
    private route: ActivatedRoute,
    private gs: GameService,
    private router: Router,
    private http: HttpClient
  ) {
    this.sessionId = route.snapshot.params['id'];
    console.log('Session Laoded: ', this.sessionId);
    gs.GetSessionById(this.sessionId).subscribe((sessions) => {
      this.isLoading = true;
      this.gameSession = sessions;
      this.nextFrame();
      console.log('Loaded First Image: ', this.currentQuestion.contentLink);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

  nextFrame() {
    if (this.nextFrametext == 'End') {
      this.router.navigate(['/']);
    }

    // this.isLoading = true;
    this.currentIndex += 1;
    if (this.currentIndex == this.gameSession.questions.length - 1) {
      this.currentIndex = this.gameSession.questions.length - 1;
      this.currentQuestionId = this.gameSession.questions[this.currentIndex].id;
      this.currentQuestion = this.gameSession.questions[this.currentIndex];

      // this.isLoading = false;
      this.nextFrametext = 'End';
      return;
    } else {
      console.log('Else Section');
      this.currentQuestionId = this.gameSession.questions[this.currentIndex].id;
      this.currentQuestion = this.gameSession.questions[this.currentIndex];

      this.answer = 'Reveal Answer';

      this.hasRevealed = false;
      this.isLoading = false;

      this.prevFrametext = 'Prev';
    }
    this.loadNextImage(this.currentQuestion.contentLink);
  }

  loadNextImage(nextImageUrl) {
    this.isLoading = true;
    this.isBlurred = true;
    const image = new Image();
    image.src = nextImageUrl;

    image.onload = () => {
      this.currentImageUrl = image.src;
      this.isLoading = false;
      this.isBlurred = false;
    };
    image.onerror = (error) => {
      console.error('Error loading image:', error);
      this.isLoading = false;
      this.isBlurred = false;
    };
  }
  revealAnswer() {
    this.hasRevealed = true;
    this.answer = this.currentQuestion.answer;
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
