import { Component ,
    OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { fromEvent, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, filter, debounceTime, mergeMap, } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css'
})
export class RxjsDemo implements OnInit, AfterViewInit {

  @ViewChild('clickBtn') clickBtn!: ElementRef;
  @ViewChild('searchBox') searchBox!: ElementRef;

  observableOutput: any[] = [];
  mapOutput: any[] = [];
  filterOutput: any[] = [];
  behaviorOutput: any[] = [];
  clickOutput: any[] = [];
  searchOutput: any[] = [];
  multiMapOutput: any[] = [];
  mergeMap: any[] = [];
  mergeOutput: any[] = [];

  loading = false;
  
  constructor(private http: HttpClient) { }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  //✅NON DOM Logic
  ngOnInit(): void {
    // Example of creating an observable from an array
    const observable$ = of(1, 2, 3, 4, 5);

    //observable
    observable$.subscribe(val=> {
      this.observableOutput.push(val);
    });

    //map
    observable$.pipe(
      map(x => x * 10)
    ).subscribe(res => {
      this.mapOutput.push(res);
    });

    //filter + Map
    observable$.pipe(
      map(x => x % 2 === 0 ? x*100 : null)
    ).subscribe(res => {
       if(res !== null) this.filterOutput.push(res);
    });

    //Multiple Map
    observable$.pipe(
      map(x => x + 1 ),
      map(x => x * 2),
      map(x => `Final: ${x}`)
    ).subscribe(res => {
      this.multiMapOutput.push(res);
    });

    //mergeMap (parallel API calls)
    of(1, 2, 3).pipe(
      mergeMap(id => this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`))
    ).subscribe(res => {
      this.mergeOutput.push(res);
    });
  }
 ngAfterViewInit(): void {
  // Search with filter and switchMap and debounceTime
  fromEvent(this.searchBox.nativeElement, 'input').pipe(
    debounceTime(500),
    map((event: any) => event.target.value.trim()),
    filter(text => text.length >=3 ), // Only search if input length is greater than equal to 3
    switchMap(text => {
      this.loading = true;
      return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/todos?title_like=${text}`);
    })
  ).subscribe({
    next: (res) => {
        this.searchOutput = res;
      this.loading = false;
    
    },
    error: (err) => {
      console.error('Error fetching search results', err);
      this.searchOutput = [];
      this.loading = false;
    },
    complete: () => {      console.log('Search completed');
    }
  });
}
}