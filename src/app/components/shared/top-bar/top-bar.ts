import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBadgeDollarSign,
  lucideBriefcase,
  lucideBuilding2,
  lucideCalendarDays,
  lucideEllipsisVertical,
  lucideFileCheck2,
  lucideLogIn,
  lucideMenu,
  lucideMoon,
  lucidePalette,
  lucideShieldCheck,
  lucideSun,
  lucideUserCheck,
  lucideUsers,
} from '@ng-icons/lucide';
import { StyleClass } from '@openng/optimus-ui/styleclass';
import { LayoutService } from '../../../core/services/layout/layout';
import { Configurator } from '../configurator/configurator';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, StyleClass, Configurator, NgIcon],
  providers: [
    provideIcons({
      lucideBriefcase,
      lucideBuilding2,
      lucideMenu,
      lucideMoon,
      lucideSun,
      lucidePalette,
      lucideEllipsisVertical,
      lucideCalendarDays,
      lucideBadgeDollarSign,
      lucideFileCheck2,
      lucideShieldCheck,
      lucideUserCheck,
      lucideLogIn,
      lucideUsers,
    }),
  ],
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly layoutService = inject(LayoutService);

  toggleDarkMode(): void {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
