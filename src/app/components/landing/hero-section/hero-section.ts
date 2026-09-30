import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideCalendarCheck,
  lucideCalendarPlus,
  lucideCoins,
  lucideFileCheck2,
} from '@ng-icons/lucide';
import { Button } from '@openng/optimus-ui/button';

@Component({
  selector: 'app-hero-section',
  imports: [Button, NgIcon],
  providers: [
    provideIcons({
      lucideCalendarCheck,
      lucideCalendarPlus,
      lucideCoins,
      lucideFileCheck2,
    }),
  ],
  templateUrl: './hero-section.html',
})
export class HeroSection {}
