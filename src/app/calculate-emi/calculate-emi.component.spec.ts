import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { CalculateEMIComponent } from './calculate-emi.component';

describe('CalculateEMIComponent', () => {
  let component: CalculateEMIComponent;
  let fixture: ComponentFixture<CalculateEMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ ReactiveFormsModule ],
      declarations: [ CalculateEMIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateEMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form to be invalid when empty', () => {
    expect(component.mortgageForm.valid).toBeFalsy();
  });

  it('loan amount field validity', () => {
    let loanAmt = component.mortgageForm.controls['loanAmount']
    expect(loanAmt.valid).toBeFalsy();

    let reqError = {};
    reqError = loanAmt.errors || {};
    expect(reqError['required']).toBeTruthy();
  });

  it('calculate Emi submit should calculate monthly payment val', () => {
    expect(component.mortgageForm.valid).toBeFalsy();
    component.mortgageForm.controls['loanAmount'].setValue('100000');
    component.mortgageForm.controls['interestPercent'].setValue('5');
    component.mortgageForm.controls['amortizationPeriod'].setValue('25');
    component.mortgageForm.controls['loanTerm'].setValue('1');
    expect(component.mortgageForm.valid).toBeTruthy();

    component.calculateEMI();
    expect(component.emiVal).toBe(585);
  });
});
