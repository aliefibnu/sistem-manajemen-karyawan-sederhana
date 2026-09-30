import { Component, computed, inject, signal } from '@angular/core';
import { ToastModule } from '@openng/optimus-ui/toast';
import {
  CutiSection,
  type LeaveBreakdownItem,
  type LeaveCalculationResult,
} from '../../components/landing/cuti-section/cuti-section';
import { FooterSection } from '../../components/landing/footer-section/footer-section';
import {
  type AdjustmentOption,
  GajiSection,
  type SalaryBreakdownRow,
} from '../../components/landing/gaji-section/gaji-section';
import { HeroSection } from '../../components/landing/hero-section/hero-section';
import { RolesSection } from '../../components/landing/roles-section/roles-section';
import { RulesSection } from '../../components/landing/rules-section/rules-section';
import { MessageService } from '@openng/optimus-ui/api';

export type {
  LeaveCalculationResult,
  LeaveBreakdownItem,
} from '../../components/landing/cuti-section/cuti-section';
export type {
  SalaryBreakdownRow,
  AdjustmentOption,
} from '../../components/landing/gaji-section/gaji-section';

@Component({
  selector: 'app-landing',
  imports: [
    HeroSection,
    CutiSection,
    GajiSection,
    RulesSection,
    RolesSection,
    FooterSection,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './landing.html',
})
export class Landing {
  // --- Modul Cuti & Kehadiran Simulator ---
  readonly startDate = signal<string>('2026-10-05'); // Senin
  readonly endDate = signal<string>('2026-10-11'); // Minggu
  readonly reason = signal<string>('Urusan keluarga mendesak dan keperluan administrasi');
  readonly isFileUploaded = signal<boolean>(false);
  readonly submissionMessage = signal<string | null>(null);
  private msgServ = inject(MessageService);

  readonly minEndDate = computed<Date | null>(() => {
    const startStr = this.startDate();
    if (!startStr) return null;
    const parts = startStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    const d = new Date(startStr);
    return isNaN(d.getTime()) ? null : d;
  });

  readonly isDateRangeInvalid = computed<boolean>(() => {
    const start = this.startDate();
    const end = this.endDate();
    return !!start && !!end && end < start;
  });

  readonly leaveCalculation = computed<LeaveCalculationResult>(() => {
    const startStr = this.startDate();
    const endStr = this.endDate();

    if (!startStr || !endStr || endStr < startStr) {
      return {
        totalCalendarDays: 0,
        activeWorkDays: 0,
        weekendDays: 0,
        isDocRequired: false,
        estimatedDeduction: 0,
      };
    }

    const start = new Date(startStr);
    const end = new Date(endStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      return {
        totalCalendarDays: 0,
        activeWorkDays: 0,
        weekendDays: 0,
        isDocRequired: false,
        estimatedDeduction: 0,
      };
    }

    const current = new Date(start);
    let activeWorkDays = 0;
    let weekendDays = 0;
    let totalCalendarDays = 0;

    while (current <= end) {
      totalCalendarDays++;
      const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        activeWorkDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    const isDocRequired = activeWorkDays > 3;
    const dailyRate = this.dailySalaryRate();
    const estimatedDeduction = activeWorkDays * dailyRate;

    return {
      totalCalendarDays,
      activeWorkDays,
      weekendDays,
      isDocRequired,
      estimatedDeduction,
    };
  });

  readonly leaveBreakdownItems = computed<LeaveBreakdownItem[]>(() => {
    const calc = this.leaveCalculation();
    const rate = this.dailySalaryRate();
    return [
      {
        label: 'Tarif Harian Tetap',
        value: `Rp ${rate.toLocaleString('id-ID')}`,
        colorClass: 'text-surface-900 dark:text-surface-0',
      },
      {
        label: 'Hari Kerja Aktif',
        value: `${calc.activeWorkDays} hari`,
        colorClass: 'text-primary font-bold',
      },
      {
        label: 'Akhir Pekan (Bebas Potong)',
        value: `${calc.weekendDays} hari`,
        colorClass: 'text-emerald-600 dark:text-emerald-400',
      },
      {
        label: 'Status Dokumen Tambahan',
        value: calc.isDocRequired
          ? this.isFileUploaded()
            ? 'Terlampir ✓'
            : 'Wajib Diunggah ✗'
          : 'Tidak Perlu',
        colorClass: calc.isDocRequired
          ? this.isFileUploaded()
            ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
            : 'text-red-600 dark:text-red-400 font-semibold'
          : 'text-muted-color',
      },
    ];
  });

  // --- Modul Rekapitulasi Gaji Simulator ---
  readonly dailySalaryRate = signal<number>(227272);
  readonly monthlyWorkDays = signal<number>(22);
  readonly approvedLeaveDays = signal<number>(2);
  readonly adjustmentType = signal<string>('bonus_nominal');
  readonly adjustmentValue = signal<number>(250000);

  readonly adjustmentOptions: AdjustmentOption[] = [
    { label: 'Bonus (+) Nominal', value: 'bonus_nominal' },
    { label: 'Bonus (+) Persen', value: 'bonus_percent' },
    { label: 'Potongan (-) Nominal', value: 'potongan_nominal' },
    { label: 'Potongan (-) Persen', value: 'potongan_percent' },
  ];

  readonly salaryGross = computed(() => {
    return this.monthlyWorkDays() * this.dailySalaryRate();
  });

  readonly salaryLeaveDeduction = computed(() => {
    return this.approvedLeaveDays() * this.dailySalaryRate();
  });

  readonly salaryAdjustmentAmount = computed(() => {
    const type = this.adjustmentType();
    const val = Number(this.adjustmentValue()) || 0;
    const gross = this.salaryGross();

    switch (type) {
      case 'bonus_nominal':
        return val;
      case 'bonus_percent':
        return Math.round((gross * val) / 100);
      case 'potongan_nominal':
        return -val;
      case 'potongan_percent':
        return -Math.round((gross * val) / 100);
      default:
        return 0;
    }
  });

  readonly salaryNetTotal = computed(() => {
    const gross = this.salaryGross();
    const leaveDeduction = this.salaryLeaveDeduction();
    const adj = this.salaryAdjustmentAmount();
    return Math.max(0, gross - leaveDeduction + adj);
  });

  readonly salaryBreakdownRows = computed<SalaryBreakdownRow[]>(() => {
    const workDays = this.monthlyWorkDays();
    const rate = this.dailySalaryRate();
    const gross = this.salaryGross();
    const leaveDays = this.approvedLeaveDays();
    const leaveDeduction = this.salaryLeaveDeduction();
    const adj = this.salaryAdjustmentAmount();
    const adjType = this.adjustmentType();
    const adjVal = this.adjustmentValue();

    let adjLabel = 'Penyesuaian';
    let adjDesc = adjType;
    if (adjType === 'bonus_nominal') {
      adjLabel = 'Bonus (Nominal)';
      adjDesc = 'Tambahan tetap';
    } else if (adjType === 'bonus_percent') {
      adjLabel = 'Bonus (Persen)';
      adjDesc = `+${adjVal}% dari gaji pokok`;
    } else if (adjType === 'potongan_nominal') {
      adjLabel = 'Potongan (Nominal)';
      adjDesc = 'Deduksi khusus';
    } else if (adjType === 'potongan_percent') {
      adjLabel = 'Potongan (Persen)';
      adjDesc = `-${adjVal}% dari gaji pokok`;
    }

    return [
      {
        component: 'Gaji Pokok',
        description: `${workDays} hari × Rp ${rate.toLocaleString('id-ID')}`,
        amountText: `Rp ${gross.toLocaleString('id-ID')}`,
        colorClass: 'text-surface-900 dark:text-surface-0',
      },
      {
        component: 'Potongan Cuti',
        description: `${leaveDays} hari × Rp ${rate.toLocaleString('id-ID')}`,
        amountText: `−Rp ${leaveDeduction.toLocaleString('id-ID')}`,
        colorClass: 'text-red-600 dark:text-red-400',
      },
      {
        component: adjLabel,
        description: adjDesc,
        amountText: `${adj >= 0 ? '+' : '−'}Rp ${Math.abs(adj).toLocaleString('id-ID')}`,
        colorClass:
          adj >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
      },
    ];
  });

  // Role Showcase State
  readonly activeRoleTab = signal<'karyawan' | 'hrd'>('karyawan');

  private formatDateString(value: Date | string | null): string {
    if (!value) return '';
    if (value instanceof Date) {
      const yyyy = value.getFullYear();
      const mm = String(value.getMonth() + 1).padStart(2, '0');
      const dd = String(value.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
    return String(value);
  }

  onStartDateChange(value: Date | string | null): void {
    const formatted = this.formatDateString(value);
    this.startDate.set(formatted);
    if (formatted && this.endDate() && this.endDate() < formatted) {
      this.endDate.set(formatted);
    }
  }

  onEndDateChange(value: Date | string | null): void {
    const formatted = this.formatDateString(value);
    if (!formatted) {
      this.endDate.set('');
      return;
    }
    if (this.startDate() && formatted < this.startDate()) {
      this.endDate.set(this.startDate());
      return;
    }
    this.endDate.set(formatted);
  }

  onSimulateCutiSubmit(): void {
    if (this.isDateRangeInvalid())
      return this.msgServ.add({
        severity: 'error',
        summary: 'Tanggal selesai cuti tidak boleh lebih awal dari tanggal mulai cuti.',
      });

    const calc = this.leaveCalculation();
    if (calc.activeWorkDays <= 0)
      return this.msgServ.add({
        severity: 'error',
        summary: 'Harap pilih rentang tanggal cuti yang valid.',
      });

    if (calc.isDocRequired && !this.isFileUploaded())
      return this.msgServ.add({
        severity: 'error',
        summary:
          'Pengajuan melebihi 3 hari kerja aktif. Wajib mengunggah Surat Pernyataan Bertanggung Jawab!',
      });
    return this.msgServ.add({
      severity: 'info',
      summary: `Permohonan cuti (${calc.activeWorkDays} hari kerja) berhasil disimulasikan dan dikirim ke HRD untuk validasi.`,
    });
  }

  onFileSelect(): void {
    this.isFileUploaded.set(true);
  }

  toggleFileUpload(): void {
    this.isFileUploaded.update((prev) => !prev);
  }

  setRole(role: 'karyawan' | 'hrd'): void {
    this.activeRoleTab.set(role);
  }
}
