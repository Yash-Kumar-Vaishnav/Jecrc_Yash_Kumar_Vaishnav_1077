import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickBlock]',
  standalone: true
})
export class ClickBlockDirective {

  @Input() appClickBlock: boolean = true; // condition

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.appClickBlock) {
      event.preventDefault();
      event.stopPropagation();
      alert('❌ Click is blocked!');
    }
  }
}