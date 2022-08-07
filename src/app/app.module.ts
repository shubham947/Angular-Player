import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPlyrModule } from 'ng-plyr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgPlyrModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
