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
  dev_errorMessage: string = "Its in BETA. Expect some bugs. ScoopCast!";
  currentDate = new Date();
  constructor(private gs: GameService, private router: Router) {
    delay(30000);
    this.isLoading = true;
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
        this.errorMessage += `\n ${error.message}`;
        this.isLoading = false;
      },
      complete: () => console.log('Request Completed!'),
    });
  }

  deleteSession(index, id) {
    this.gameSessions.splice(index, 1);
    this.gs.DeleteSession(id).subscribe((resp) => {
      alert('Frame Collection Deleted');
    });
  }
}
