import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { GameSession } from '../models/GameSession';
import { GameService } from '../services/game.service';
import { RiddleHeader } from '../models/Riddle';

@Component({
  selector: 'app-riddle-home',
  templateUrl: './riddle-home.component.html',
  styleUrls: ['./riddle-home.component.css'],
})
export class RiddleHomeComponent {
  active = 'top';
  gameSessions: RiddleHeader[] = [];
  isLoading: boolean = true;

  showErrorMessage: boolean = false;
  errorMessage: string = 'We are Sorry! We will be back soon!';

  currentDate = new Date();
  constructor(private gs: GameService, private router: Router) {
    delay(30000);
    this.isLoading = true;
    gs.GetRiddles().subscribe({
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
    // this.gameSessions.splice(index, 1);
    // this.gs.DeleteSession(id).subscribe((resp) => {
    //   alert('Frame Collection Deleted');
    // });
  }
}
