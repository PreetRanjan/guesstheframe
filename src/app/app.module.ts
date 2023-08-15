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
