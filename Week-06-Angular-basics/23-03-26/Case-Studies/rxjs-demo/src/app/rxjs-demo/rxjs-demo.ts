import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of, interval, from } from 'rxjs';
import { map, filter, take, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo implements OnInit {

  // Data holders (UI ke liye)
  simpleData: number[] = [];
  mappedData: number[] = [];
  filteredData: number[] = [];
  multipleMapData: number[] = [];
  mergeMapData: any[] = [];

  ngOnInit() {

    // 🔹 1. Simple Observable (of)
    of(1, 2, 3, 4, 5).subscribe(val => {
      this.simpleData.push(val);
    });


    // 🔹 2. map operator
    of(1, 2, 3, 4, 5).pipe(
      map(x => x * 10)
    ).subscribe(val => {
      this.mappedData.push(val);
    });


    // 🔹 3. filter + map
    of(1, 2, 3, 4, 5, 6).pipe(
      filter(x => x % 2 === 0),   // even
      map(x => x * 100)
    ).subscribe(val => {
      this.filteredData.push(val);
    });


    // 🔹 4. Multiple map chaining
    of(1, 2, 3).pipe(
      map(x => x + 1),
      map(x => x * 2),
      map(x => x - 1)
    ).subscribe(val => {
      this.multipleMapData.push(val);
    });


    // 🔹 5. interval (live stream)
    interval(1000).pipe(
      take(5) // sirf 5 values
    ).subscribe(val => {
      console.log("Interval:", val);
    });


    // 🔹 6. mergeMap (parallel API calls simulation)
    const users = of(1, 2, 3);

    users.pipe(
      mergeMap(userId => this.fakeApiCall(userId))
    ).subscribe(result => {
      this.mergeMapData.push(result);
    });

  }


  // 🔥 Fake API function
  fakeApiCall(id: number) {
    return of(`User Data for ID: ${id}`);
  }

}cd