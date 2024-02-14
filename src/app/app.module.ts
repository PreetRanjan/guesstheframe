import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowErrorComponent } from './show-error/show-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { RiddleComponent } from './riddle/riddle.component';
import { RiddleHomeComponent } from './riddle-home/riddle-home.component';
import { ShowWarnimgComponent } from './show-warnimg/show-warnimg.component';
import { AboutComponent } from './about/about.component';
import { Frameground2Component } from './frameground2/frameground2.component';
import { FrameSubmissionComponent } from './frame-submission/frame-submission.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InstructionsComponent,
    ShowErrorComponent,
    LoaderComponent,
    LoginComponent,
    LoadingCardComponent,
    RiddleComponent,
    RiddleHomeComponent,
    ShowWarnimgComponent,
    AboutComponent,
    Frameground2Component,
    FrameSubmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
