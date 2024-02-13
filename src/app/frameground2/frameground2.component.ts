import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GameSession } from '../models/GameSession';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../services/game.service';

declare var window: any;

@Component({
  selector: 'app-frameground2',
  templateUrl: './frameground2.component.html',
  styleUrls: ['./frameground2.component.css'],
})
export class Frameground2Component implements OnInit, AfterViewInit {
  gameSession: GameSession = {
    id: 0,
    title: 'ScoopCast GuessTheFrame',
    dateCreated: new Date().toString(),
    questions: [],
  };
  sessionId: number = 0;
  isLoading: boolean = true;
  currentIndex: number = 0;
  // question variables
  answer: string = 'Answer';
  answerModal: any;
  // Score variables
  score1: number = 0;
  score2: number = 0;
  score3: number = 0;
  score4: number = 0;

  //Player Names
  player1: string = 'S.S. GajarMuli';
  player2: string = 'Nir-Amish';
  player3: string = 'Laziz Sheikh';
  player4: string = 'BL Vish';
  @ViewChild('carouselFrame') myCarousal: ElementRef;
  // Carousal for Frame Image
  carousal: any;
  constructor(
    private route: ActivatedRoute,
    private gs: GameService,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    this.sessionId = route.snapshot.params['id'];
    console.log('Session Loaded: ', this.sessionId);
    gs.GetSessionById(this.sessionId).subscribe((sessions) => {
      this.isLoading = true;
      this.gameSession = sessions;
      console.log(this.gameSession);

      this.answer = this.gameSession.questions[this.currentIndex].answer;
      this.isLoading = false;
    });
  }
  ngAfterViewInit(): void {
    // Listen to Bootstrap 5 event using Renderer2
    this.renderer.listen(
      this.myCarousal.nativeElement,
      'slid.bs.carousel',
      () => {
        // Handle button click event
        console.log('Carousal Slided!!! to ', this.currentIndex);
        this.answer = this.gameSession.questions[this.currentIndex].answer;
      }
    );
  }

  ngOnInit(): void {
    //Initialize Carousal
    this.carousal = new window.bootstrap.Carousel(
      document.getElementById('carouselExample')
    );

    //Initialize Modal
    this.answerModal = new window.bootstrap.Modal(
      document.getElementById('answer_modal')
    );
  }

  nextCarousal() {
    this.carousal.next();
    if (
      this.currentIndex >= 0 &&
      this.currentIndex < this.gameSession.questions.length - 1
    ) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
    console.log(this.currentIndex);
  }
  prevCarousal() {
    this.carousal.prev();
    if (this.currentIndex == 0) {
      this.currentIndex = this.gameSession.questions.length - 1;
    } else {
      this.currentIndex -= 1;
    }
  }

  revealAnswer() {
    //Show the answer Modal with answer

    this.answerModal.show();
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
