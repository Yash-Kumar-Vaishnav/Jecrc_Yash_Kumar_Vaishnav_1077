import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges {

  @Input() appStatusColor: number = 0; // marks

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appStatusColor >= 50) {
      this.el.nativeElement.style.color = 'green';
    } else {
      this.el.nativeElement.style.color = 'red';
    }
  }
}