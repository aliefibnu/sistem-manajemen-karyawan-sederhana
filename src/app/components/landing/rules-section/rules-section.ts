import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBadgeDollarSign,
  lucideCalendarDays,
  lucideFileCheck2,
  lucideShieldCheck,
  lucideSlidersHorizontal,
  lucideUserCheck,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-rules-section',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideCalendarDays,
      lucideFileCheck2,
      lucideBadgeDollarSign,
      lucideSlidersHorizontal,
      lucideUserCheck,
      lucideShieldCheck,
    }),
  ],
  styles: `
    .rules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .rule-card {
      padding: 1.15rem;
      border-radius: 0.6rem;
      border: 1px solid var(--p-content-border-color);
      background: var(--p-content-background);
    }
    .rule-icon {
      width: 2.15rem;
      height: 2.15rem;
      border-radius: 0.45rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
  templateUrl: './rules-section.html',
})
export class RulesSection {}
