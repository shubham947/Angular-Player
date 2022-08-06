import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgPlyrComponent } from './ng-plyr.component';
import { StopClickPropagationDirective } from './directive/stop-click-propagation.directive';



@NgModule({
  declarations: [
    NgPlyrComponent,
    StopClickPropagationDirective
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    NgPlyrComponent
  ]
})
export class NgPlyrModule { }
