import { Component, ElementRef, HostListener } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {}
  input:string=''
  private abortController = new AbortController();

  ngAfterViewInit(): void {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', () => {
        this.handleWebOTP();
      });
    }
  }

  private handleWebOTP(): void {
    const otpRequest = {
      otp: { transport:['sms'] },
      signal: this.abortController.signal
    };

    navigator.credentials.get(otpRequest)
      .then((otp: any) => {
        if (otp && otp.code) {
          this.input = otp.code
        }
      });
  }
}