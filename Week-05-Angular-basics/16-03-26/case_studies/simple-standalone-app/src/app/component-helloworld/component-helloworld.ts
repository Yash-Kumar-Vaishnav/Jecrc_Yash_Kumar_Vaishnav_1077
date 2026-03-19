import { Component } from '@angular/core';

@Component({
  selector: 'app-component-helloworld',
  templateUrl: './component-helloworld.html',
  styleUrls: ['./component-helloworld.css']
})
export class ComponentHelloworld {

  name = "Yash Vaishnav";
  course = ".NET Full Stack";
  email = "yash@email.com";

  showAlert(){
    alert("Button Clicked!");
  }

}