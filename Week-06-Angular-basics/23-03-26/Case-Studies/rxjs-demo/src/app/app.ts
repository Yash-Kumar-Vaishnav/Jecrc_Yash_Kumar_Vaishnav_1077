import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RxjsDemo } from './components/rxjs-demo/rxjs-demo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RxjsDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
  // template: '<app-rxjs-demo></app-rxjs-demo>'
})
export class App {
  protected readonly title = signal('rxjs-demo');
}
