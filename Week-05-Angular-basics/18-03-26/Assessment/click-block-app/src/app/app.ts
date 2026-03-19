import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective],
  templateUrl: './app.html'
})
export class App {

  allowClick = false;

}