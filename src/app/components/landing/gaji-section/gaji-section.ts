import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from '@openng/optimus-ui/card';
import { Divider } from '@openng/optimus-ui/divider';
import { Fluid } from '@openng/optimus-ui/fluid';
import { InputNumber } from '@openng/optimus-ui/inputnumber';
import { Message } from '@openng/optimus-ui/message';
import { Select } from '@openng/optimus-ui/select';
import { TableModule } from '@openng/optimus-ui/table';
import { Tag } from '@openng/optimus-ui/tag';

export interface SalaryBreakdownRow {
  component: string;
  description: string;
  amountText: string;
  colorClass: string;
}

export interface AdjustmentOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-gaji-section',
  imports: [
    FormsModule,
    DecimalPipe,
    Card,
    Divider,
    Fluid,
    InputNumber,
    Message,
    Select,
    TableModule,
    Tag,
  ],
  templateUrl: './gaji-section.html',
})
export class GajiSection {
  readonly monthlyWorkDays = input.required<number>();
  readonly dailySalaryRate = input.required<number>();
  readonly approvedLeaveDays = input.required<number>();
  readonly adjustmentType = input.required<string>();
  readonly adjustmentValue = input.required<number>();
  readonly adjustmentOptions = input.required<AdjustmentOption[]>();
  readonly salaryBreakdownRows = input.required<SalaryBreakdownRow[]>();
  readonly salaryNetTotal = input.required<number>();

  readonly monthlyWorkDaysChange = output<number>();
  readonly dailySalaryRateChange = output<number>();
  readonly approvedLeaveDaysChange = output<number>();
  readonly adjustmentTypeChange = output<string>();
  readonly adjustmentValueChange = output<number>();
}
