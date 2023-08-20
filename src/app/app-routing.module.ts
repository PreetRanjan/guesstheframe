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
    path: 'playground/:id',
    component: PlaygroundComponent,
  },
  {
    path: 'playground2/:session_id/:qid',
    component: Playground2Component,
  },
  {
    path: 'submit-frames',
    component: FrameSubmissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
