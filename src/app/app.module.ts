import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { WebOtpDirective } from './web-otp.directive';
import { WebOtp2Directive } from './web-otp2.directive';

@NgModule({
  declarations: [
    AppComponent,
    WebOtpDirective,
    WebOtp2Directive,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
