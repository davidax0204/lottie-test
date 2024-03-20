import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appWebOtp]'
})
export class WebOtpDirective {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', () => {
        this.handleWebOTP();
      });
    }
  }

  private handleWebOTP(): void {
    const inputElement = this.el.nativeElement;
    const abortController = new AbortController();
    const formElement = inputElement.closest('form');
    
    if (formElement) {
      formElement.addEventListener('submit', () => {
        abortController.abort();
      });
    }

    const otpRequest = {
      otp: { transport:['sms'] },
      signal: abortController.signal
    };

    navigator.credentials.get(otpRequest)
      .then((otp: any) => {
        if (otp && otp.code) {
          inputElement.value = otp.code; // Set value directly to the input field
        }
      });
  }
}
