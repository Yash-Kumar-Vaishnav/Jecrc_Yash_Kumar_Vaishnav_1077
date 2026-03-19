import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective implements OnChanges {

  @Input() appRole: string = '';   
  @Input() userRole: string = '';  

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.userRole === this.appRole) {
      this.el.nativeElement.style.display = 'block';
    } else {
      this.el.nativeElement.style.display = 'none';
    }
  }
}