import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appWebOtp]'
})
export class WebOtpDirective implements AfterViewInit {
  constructor(private el: ElementRef, private ngControl: NgControl) {}

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
          this.ngControl.control?.setValue(otp.code);
        }
      });
  }
}