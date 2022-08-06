import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopClickPropagation]'
})
export class StopClickPropagationDirective {

  constructor() { }

  @HostListener('click', ["$event"])
  public onClick(event:InputEvent) {
    event?.stopPropagation();
  }

}
