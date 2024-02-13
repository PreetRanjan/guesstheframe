import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PlaygroundComponent } from './playground/playground.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { HttpClientModule } from '@angular/common/http';
import { Playground2Component } from './playground2/playground2.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { PostFramesComponent } from './post-frames/post-frames.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { SubmitframetestComponent } from './submitframetest/submitframetest.component';

import { SurveyComponent } from './survey/survey.component';
import { FrameSubmissionComponent } from './framesubmission/framesubmission.component';
import { LoginComponent } from './login/login.component';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { RiddleComponent } from './riddle/riddle.component';
import { Playground3Component } from './playground3/playground3.component';
import { RiddleHomeComponent } from './riddle-home/riddle-home.component';
import { FrameGroundComponent } from './frame-ground/frame-ground.component';
import { ShowWarnimgComponent } from './show-warnimg/show-warnimg.component';
import { AboutComponent } from './about/about.component';
import { Frameground2Component } from './frameground2/frameground2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlaygroundComponent,
    InstructionsComponent,
    Playground2Component,
    ShowErrorComponent,
    PostFramesComponent,
    LoaderComponent,
    SubmitframetestComponent,
    SurveyComponent,
    FrameSubmissionComponent,
    LoginComponent,
    LoadingCardComponent,
    RiddleComponent,
    Playground3Component,
    RiddleHomeComponent,
    FrameGroundComponent,
    ShowWarnimgComponent,
    AboutComponent,
    Frameground2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
