import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StyleClass } from '@openng/optimus-ui/styleclass';
import { LayoutService } from '../../../core/services/layout/layout';
import { Configurator } from '../configurator/configurator';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, StyleClass, Configurator],
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

