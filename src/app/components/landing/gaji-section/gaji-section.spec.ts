import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GajiSection } from './gaji-section';

describe('GajiSection', () => {
  let component: GajiSection;
  let fixture: ComponentFixture<GajiSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GajiSection],
    }).compileComponents();

    fixture = TestBed.createComponent(GajiSection);
    fixture.componentRef.setInput('monthlyWorkDays', 22);
    fixture.componentRef.setInput('dailySalaryRate', 227272);
    fixture.componentRef.setInput('approvedLeaveDays', 2);
    fixture.componentRef.setInput('adjustmentType', 'bonus_nominal');
    fixture.componentRef.setInput('adjustmentValue', 250000);
    fixture.componentRef.setInput('adjustmentOptions', [
      { label: 'Bonus (+) Nominal', value: 'bonus_nominal' },
    ]);
    fixture.componentRef.setInput('salaryBreakdownRows', []);
    fixture.componentRef.setInput('salaryNetTotal', 4795440);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
