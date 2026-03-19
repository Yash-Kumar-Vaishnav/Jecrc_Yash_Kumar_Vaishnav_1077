import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appPrice]',
  standalone: true
})
export class PriceDirective implements OnChanges {

  @Input() appPrice: number = 0;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appPrice > 50000) {
      this.el.nativeElement.style.color = 'red';
    } else {
      this.el.nativeElement.style.color = 'green';
    }
  }
}