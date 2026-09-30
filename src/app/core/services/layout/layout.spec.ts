import { TestBed } from '@angular/core/testing';
import { LayoutService } from './layout';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutService],
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle dark mode state', () => {
    expect(service.isDarkTheme()).toBe(false);
    service.layoutConfig.update((state) => ({ ...state, darkTheme: true }));
    expect(service.isDarkTheme()).toBe(true);
  });

  it('should toggle menu state', () => {
    service.layoutConfig.update((state) => ({ ...state, menuMode: 'overlay' }));
    expect(service.isOverlay()).toBe(true);
    service.onMenuToggle();
    expect(service.layoutState().overlayMenuActive).toBe(true);
  });
});

