import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, PLATFORM_ID, Service, signal } from '@angular/core';

export interface LayoutConfig {
  preset: string;
  primary: string;
  surface: string | undefined | null;
  darkTheme: boolean;
  menuMode: string;
}

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  configSidebarVisible: boolean;
  mobileMenuActive: boolean;
  menuHoverActive: boolean;
  activePath: string | null;
}

@Service()
export class LayoutService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  readonly layoutConfig = signal<LayoutConfig>({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
  });

  readonly layoutState = signal<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    mobileMenuActive: false,
    menuHoverActive: false,
    activePath: null,
  });

  readonly theme = computed(() => (this.layoutConfig().darkTheme ? 'dark' : 'light'));
  readonly isSidebarActive = computed(
    () => this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive,
  );
  readonly isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  readonly getPrimary = computed(() => this.layoutConfig().primary);
  readonly getSurface = computed(() => this.layoutConfig().surface);
  readonly isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  constructor() {
    effect(() => {
      const config = this.layoutConfig();

      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      if (!this.initialized || !config) {
        this.initialized = true;
        this.toggleDarkMode(config);
        return;
      }

      this.handleDarkModeTransition(config);
    });
  }

  private handleDarkModeTransition(config: LayoutConfig): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const doc = document as unknown as { startViewTransition?: (callback: () => void) => void };
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        this.toggleDarkMode(config);
      });
    } else {
      this.toggleDarkMode(config);
    }
  }

  toggleDarkMode(config?: LayoutConfig): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const currentConfig = config ?? this.layoutConfig();
    if (currentConfig.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !prev.overlayMenuActive,
      }));
    }

    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuDesktopInactive: !prev.staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        mobileMenuActive: !prev.mobileMenuActive,
      }));
    }
  }

  showConfigSidebar(): void {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
  }

  hideConfigSidebar(): void {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
  }

  isDesktop(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    return window.innerWidth > 991;
  }

  isMobile(): boolean {
    return !this.isDesktop();
  }
}

