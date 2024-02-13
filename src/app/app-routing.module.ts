import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { PlaygroundComponent } from './playground/playground.component';
import { Playground2Component } from './playground2/playground2.component';
import { PostFramesComponent } from './post-frames/post-frames.component';
import { SubmitframetestComponent } from './submitframetest/submitframetest.component';
import { SurveyComponent } from './survey/survey.component';
import { FrameSubmissionComponent } from './framesubmission/framesubmission.component';
import { LoginComponent } from './login/login.component';
import { RiddleComponent } from './riddle/riddle.component';
import { RiddleHomeComponent } from './riddle-home/riddle-home.component';
import { FrameGroundComponent } from './frame-ground/frame-ground.component';
import { AboutComponent } from './about/about.component';
import { Frameground2Component } from './frameground2/frameground2.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'instructions',
    component: InstructionsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'riddles',
    component: RiddleHomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'playriddle/:id',
    component: RiddleComponent,
  },
  {
    path: 'playground/:id',
    component: Frameground2Component,
  },
  {
    path: 'playground2/:session_id/:qid',
    component: Playground2Component,
  },
  {
    path: 'submit-frames',
    component: FrameSubmissionComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
