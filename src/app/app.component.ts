import { Component, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {
  form!: FormGroup;
  myOTP!: AbstractControl | null;
  private abortController: AbortController = new AbortController();

  /**
   *
   */
  constructor(private formBuilder: FormBuilder,) {
    
  }

  ngOnInit(){
    this.form = this.formBuilder.group(
      {
        ['myOTP']: ['', [Validators.required]],
      }
    );
  
    this.myOTP = this.form.get('myOTP') as FormControl;
  }

  ngAfterViewInit(): void {
    this.triggerOtpListener()
  }

  triggerOtpListener(){
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
          // this.myOTP = otp.code;
          this.myOTP?.patchValue(otp.code)
          console.log('OTP received:', otp.code);
        }
      })
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