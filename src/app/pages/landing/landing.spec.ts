import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate active work days excluding weekend days', () => {
    // 2026-10-05 (Monday) to 2026-10-11 (Sunday) = 7 total days, 2 weekend days, 5 active work days
    component.startDate.set('2026-10-05');
    component.endDate.set('2026-10-11');

    const calc = component.leaveCalculation();
    expect(calc.totalCalendarDays).toBe(7);
    expect(calc.weekendDays).toBe(2);
    expect(calc.activeWorkDays).toBe(5);
    expect(calc.isDocRequired).toBe(true);
    expect(calc.estimatedDeduction).toBe(5 * 227272);
  });

  it('should not require document for 3 or fewer work days', () => {
    // 2026-10-05 (Monday) to 2026-10-07 (Wednesday) = 3 work days
    component.startDate.set('2026-10-05');
    component.endDate.set('2026-10-07');

    const calc = component.leaveCalculation();
    expect(calc.activeWorkDays).toBe(3);
    expect(calc.isDocRequired).toBe(false);
  });

  it('should calculate gross and net salary with HRD adjustments', () => {
    component.monthlyWorkDays.set(22);
    component.dailySalaryRate.set(227272);
    component.approvedLeaveDays.set(2);
    component.adjustmentType.set('bonus_nominal');
    component.adjustmentValue.set(250000);

    const gross = 22 * 227272; // 4999984
    const deduction = 2 * 227272; // 454544
    const bonus = 250000;

    expect(component.salaryGross()).toBe(gross);
    expect(component.salaryLeaveDeduction()).toBe(deduction);
    expect(component.salaryAdjustmentAmount()).toBe(bonus);
    expect(component.salaryNetTotal()).toBe(gross - deduction + bonus);
  });

  it('should validate file upload requirement on submit', () => {
    component.startDate.set('2026-10-05');
    component.endDate.set('2026-10-11'); // 5 days -> isDocRequired = true
    component.isFileUploaded.set(false);

    component.onSimulateCutiSubmit();
    expect(component.submissionMessage()).toContain('Wajib mengunggah Surat Pernyataan');

    component.toggleFileUpload();
    expect(component.isFileUploaded()).toBe(true);

    component.onSimulateCutiSubmit();
    expect(component.submissionMessage()).toContain('berhasil disimulasikan');
  });

  it('should switch role tabs', () => {
    expect(component.activeRoleTab()).toBe('karyawan');
    component.setRole('hrd');
    expect(component.activeRoleTab()).toBe('hrd');
  });

  it('should adjust endDate when startDate is set past current endDate', () => {
    component.startDate.set('2026-10-05');
    component.endDate.set('2026-10-08');

    component.onStartDateChange('2026-10-15');
    expect(component.startDate()).toBe('2026-10-15');
    expect(component.endDate()).toBe('2026-10-15');
  });

  it('should prevent endDate from being earlier than startDate', () => {
    component.startDate.set('2026-10-15');
    component.endDate.set('2026-10-20');

    component.onEndDateChange('2026-10-10');
    expect(component.endDate()).toBe('2026-10-15');
  });

  it('should compute minEndDate accurately from startDate', () => {
    component.startDate.set('2026-10-05');
    const minDate = component.minEndDate();
    expect(minDate).toBeTruthy();
    expect(minDate?.getFullYear()).toBe(2026);
    expect(minDate?.getMonth()).toBe(9); // October (0-indexed)
    expect(minDate?.getDate()).toBe(5);
  });

  it('should reject submission if endDate is less than startDate', () => {
    component.startDate.set('2026-10-20');
    component.endDate.set('2026-10-10');

    expect(component.isDateRangeInvalid()).toBe(true);
    expect(component.leaveCalculation().activeWorkDays).toBe(0);

    component.onSimulateCutiSubmit();
    expect(component.submissionMessage()).toContain('tidak boleh lebih awal');
  });
});
