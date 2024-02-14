import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { LoginComponent } from './login/login.component';
import { RiddleComponent } from './riddle/riddle.component';
import { RiddleHomeComponent } from './riddle-home/riddle-home.component';
import { AboutComponent } from './about/about.component';
import { Frameground2Component } from './frameground2/frameground2.component';
import { FrameSubmissionComponent } from './frame-submission/frame-submission.component';

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
