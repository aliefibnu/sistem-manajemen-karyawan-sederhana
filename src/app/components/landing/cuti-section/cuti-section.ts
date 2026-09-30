import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { Button } from '@openng/optimus-ui/button';
import { Card } from '@openng/optimus-ui/card';
import { DatePicker } from '@openng/optimus-ui/datepicker';
import { Divider } from '@openng/optimus-ui/divider';
import { Fluid } from '@openng/optimus-ui/fluid';
import { Message } from '@openng/optimus-ui/message';
import { TableModule } from '@openng/optimus-ui/table';
import { Tag } from '@openng/optimus-ui/tag';
import { Textarea } from '@openng/optimus-ui/textarea';

export interface LeaveCalculationResult {
  totalCalendarDays: number;
  activeWorkDays: number;
  weekendDays: number;
  isDocRequired: boolean;
  estimatedDeduction: number;
}

export interface LeaveBreakdownItem {
  label: string;
  value: string;
  colorClass: string;
}

@Component({
  selector: 'app-cuti-section',
  imports: [
    FormsModule,
    DecimalPipe,
    Button,
    Card,
    DatePicker,
    Fluid,
    Message,
    TableModule,
    Tag,
    Textarea,
    NgIcon,
  ],
  providers: [
    provideIcons({
      lucideArrowRight,
    }),
  ],
  templateUrl: './cuti-section.html',
})
export class CutiSection {
  readonly startDate = input.required<string>();
  readonly endDate = input.required<string>();
  readonly minEndDate = input<Date | null>(null);
  readonly isDateRangeInvalid = input<boolean>(false);
  readonly reason = input.required<string>();
  readonly isFileUploaded = input.required<boolean>();
  readonly submissionMessage = input<string | null>(null);
  readonly leaveCalculation = input.required<LeaveCalculationResult>();
  readonly leaveBreakdownItems = input.required<LeaveBreakdownItem[]>();

  readonly startDateChange = output<Date | string | null>();
  readonly endDateChange = output<Date | string | null>();
  readonly reasonChange = output<string>();
  readonly fileSelect = output<void>();
  readonly submitSimulation = output<void>();
}
