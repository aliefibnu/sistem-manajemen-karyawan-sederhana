import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBriefcase } from '@ng-icons/lucide';

@Component({
  selector: 'app-footer-section',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucideBriefcase,
    }),
  ],
  templateUrl: './footer-section.html',
})
export class FooterSection {}
