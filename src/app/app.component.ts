import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  myOTP: string = '';
  private abortController: AbortController = new AbortController();

  ngAfterViewInit(): void {
    // Check if the OTPCredential API is supported
    if ('OTPCredential' in window) {
      this.listenForOTP();
    } else {
      console.warn('Web OTP API is not supported in this browser.');
    }
  }

  private listenForOTP(): void {
    const otpRequest = {
      otp: { transport: ['sms'] },
      signal: this.abortController.signal,
    };
  
    navigator.credentials.get(otpRequest as any)
      .then((otp: any) => {
        if (otp && otp.code) {
          this.myOTP = otp.code; // Automatically fill the OTP
          console.log('OTP received:', otp.code);
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  submitOTP(): void {
    // Add additional logic for OTP submission
    alert('OTP Submitted: ' + this.myOTP);
  }

  ngOnDestroy(): void {
    // Abort the controller when the component is destroyed to clean up resources
    this.abortController.abort();
  }
}