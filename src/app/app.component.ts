import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  mainObj:any={};
  constructor() { }

  ngOnInit(): void {
  }

  myOTP:any;
}