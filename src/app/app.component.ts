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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      myOTP: ['', [Validators.required]],
    });

    this.myOTP = this.form.get('myOTP');
  }

  ngAfterViewInit(): void {
    this.triggerOtpListener();
    console.log('Component initialized');
  }

  triggerOtpListener() {
    this.abortController = new AbortController();

    if ('OTPCredential' in window) {
      this.listenForOTP();
    } else {
      console.warn('Web OTP API is not supported in this browser.');
    }
  }

  private listenForOTP(): void {
    // this.abortController = new AbortController();

    const otpRequest = {
      otp: { transport: ['sms'] },
      signal: this.abortController.signal,
    };

    navigator.credentials.get(otpRequest as any).then((otp: any) => {
      if (otp && otp.code) {
        this.myOTP?.setValue(otp.code);
        this.triggerOtpListener();  // Restart the listener
      }
    });
  }

  submitOTP(): void {
    if (this.form.valid) {
      alert('OTP Submitted: ' + this.form.value.myOTP);
    } else {
      alert('Please enter a valid OTP.');
    }
  }

  ngOnDestroy(): void {
    this.abortController.abort();
  }
}
