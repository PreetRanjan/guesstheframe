import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameSession } from '../models/GameSession';
import { Question } from '../models/Question';
import { QuestionModel } from '../models/QuestionModel';
import { settings } from '../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  GameSessions: GameSession[] = [];
  constructor(private http: HttpClient) {
    this.GetSessions().subscribe((x) => (this.GameSessions = x));
  }

  GetSessions() {
    // throw new Error('Request cound not be completed!');
    return this.http.get<GameSession[]>(`${settings.url}/api/GameSession`);
  }

  GetSessionById(sessionId) {
    return this.http.get<GameSession>(
      `${settings.url}/api/GameSession/` + sessionId
    );
  }

  CreateForms(ques: QuestionModel[]) {
    ques.forEach((q) => {
      var formData = new FormData();
      formData.append('text', q.answer);
      formData.append('title', q.title);
      this.http.post(
        'https://guessthemovieapi.azurewebsites.net/api/Frames/PostQuestions/',
        formData
      );
    });
  }
}