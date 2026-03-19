import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective implements OnChanges {

  @Input() appTheme: string = ''; // 'dark' or 'light'

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appTheme === 'dark') {
      this.el.nativeElement.style.backgroundColor = '#333';
      this.el.nativeElement.style.color = '#fff';
    } else {
      this.el.nativeElement.style.backgroundColor = '#fff';
      this.el.nativeElement.style.color = '#000';
    }
  }
}