import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPlayerComponent } from './ng-player.component';
import { StopClickPropagationDirective } from './directive/stop-click-propagation.directive';



@NgModule({
  declarations: [
    NgPlayerComponent,
    StopClickPropagationDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    NgPlayerComponent
  ]
})
export class NgPlayerModule { }
