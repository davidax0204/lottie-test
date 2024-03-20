import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainObj:any={};
  constructor() { }

  ngOnInit(): void {
  }

  myOTP:any;
  ngAfterViewInit() {
    if ('OTPCredential' in window) {
        this.mainObj.isWebOtpSupported = true;
        window.addEventListener('DOMContentLoaded', e => {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        if (form) {
            form.addEventListener('submit', e => {
            ac.abort();
            });
        }
        var reqObj =  {
          otp: { transport:['sms'] },
          signal: ac.signal
      };
        navigator.credentials.get(
          reqObj
        ).then((otp:any) => {
            if(
              otp
            ){
              if(
                otp && otp.code
              ){
                // alert('GOT OTP***'+ otp.code);
                // input.value = otp.code;
                this.myOTP = otp.code;
              }
            }
            
            // if (form) form.submit();
        }).catch(err => {
            console.log(err);
        });
        });
    }else{
      // this.myOTP = 521456;
      this.mainObj.isWebOtpSupported = false;
      // alert('Web OTP API not supported, Please enter manually.');
    }
  }
}