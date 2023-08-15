import { Component } from '@angular/core';
import { GameSession } from '../models/GameSession';
import { GameService } from '../services/game.service';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  active = 'top';
  gameSessions: GameSession[] = [];
  isLoading: boolean = true;

  showErrorMessage: boolean = false;
  errorMessage: string = 'We are Sorry! We will be back soon!';

  currentDate = new Date();
  constructor(private gs: GameService, private router: Router) {
    delay(3000);
    gs.GetSessions().subscribe({
      next: (sessions) => {
        this.gameSessions = sessions;
        if (this.gameSessions.length == 0) {
          this.showErrorMessage = true;

          this.errorMessage = `No Frames Found!`;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.showErrorMessage = true;
        console.log('Error Occured: ', error);
        this.errorMessage += `\n ${error}`;
      },
      complete: () => console.log('Request Completed!'),
    });
  }
}
