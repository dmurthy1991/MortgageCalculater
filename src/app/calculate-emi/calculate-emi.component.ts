import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-emi',
  templateUrl: './calculate-emi.component.html',
  styleUrls: ['./calculate-emi.component.scss']
})
export class CalculateEMIComponent implements OnInit {
  mortgageForm: FormGroup;
  submitted = false;
  emiVal;
  interestCalc
  principalCalc

  constructor() { }

  ngOnInit(): void {
    this.mortgageForm = new FormGroup({
      loanAmount: new FormControl('', Validators.required),
      interestPercent: new FormControl('', Validators.required),
      amortizationPeriod: new FormControl('', Validators.required),
      loanTerm: new FormControl('', Validators.required)

    })
  }

  get formDetails() {
    return this.mortgageForm.controls;
  }


  calculateEMI() {
    this.submitted = true;

    if (this.mortgageForm.invalid) {
      return;
    }

    let loanAmt = this.mortgageForm.controls['loanAmount'].value;
    let interest = parseFloat((this.mortgageForm.controls['interestPercent'].value / (12 * 100)).toFixed(5));
    let term = this.mortgageForm.controls['amortizationPeriod'].value * 12;

    this.emiVal = Math.round(loanAmt * ((interest * Math.pow((1 + interest), term))/(Math.pow((1+interest), term)-1)))
    this.interestCalc = Math.round(loanAmt * interest );
    this.principalCalc = Math.round(this.emiVal - this.interestCalc)
  }
}
