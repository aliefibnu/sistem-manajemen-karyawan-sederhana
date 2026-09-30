import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBuilding2, lucideCheck, lucideUser } from '@ng-icons/lucide';

@Component({
  selector: 'app-roles-section',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideBuilding2,
      lucideUser,
      lucideCheck,
    }),
  ],
  styles: `
    .role-card {
      padding: 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid var(--p-content-border-color);
      background: var(--p-surface-50);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    :host-context(.app-dark) .role-card {
      background: var(--p-surface-800);
    }
    .role-card--hl {
      border-color: color-mix(in srgb, var(--p-primary-500) 40%, transparent);
      background: color-mix(in srgb, var(--p-primary-500) 4%, var(--p-content-background));
    }
  `,
  templateUrl: './roles-section.html',
})
export class RolesSection {}
