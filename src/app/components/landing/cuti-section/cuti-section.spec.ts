import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CutiSection } from './cuti-section';

describe('CutiSection', () => {
  let component: CutiSection;
  let fixture: ComponentFixture<CutiSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CutiSection],
    }).compileComponents();

    fixture = TestBed.createComponent(CutiSection);
    fixture.componentRef.setInput('startDate', '2026-10-05');
    fixture.componentRef.setInput('endDate', '2026-10-11');
    fixture.componentRef.setInput('minEndDate', new Date('2026-10-05'));
    fixture.componentRef.setInput('isDateRangeInvalid', false);
    fixture.componentRef.setInput('reason', 'Keperluan keluarga');
    fixture.componentRef.setInput('isFileUploaded', false);
    fixture.componentRef.setInput('submissionMessage', null);
    fixture.componentRef.setInput('leaveCalculation', {
      totalCalendarDays: 7,
      activeWorkDays: 5,
      weekendDays: 2,
      isDocRequired: true,
      estimatedDeduction: 1136360,
    });
    fixture.componentRef.setInput('leaveBreakdownItems', []);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
