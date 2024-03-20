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
        const input = this.el.nativeElement;
        const ac = new AbortController();
        const form = input.closest('form');

        if (form) {
          form.addEventListener('submit', () => {
            ac.abort();
          });
        }

        const reqObj = {
          otp: { transport:['sms'] },
          signal: ac.signal
        };

        navigator.credentials.get(reqObj).then((otp: any) => {
          if (otp && otp.code) {
            this.ngControl.control?.setValue(otp.code);
          }
        }).catch(err => {
          console.log(err);
        });
      });
    } else {
      console.log('Web OTP API not supported, Please enter manually.');
    }
  }
}