import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ThemeDirective],
  templateUrl: './app.html'
})
export class App {

  theme = 'light';

}