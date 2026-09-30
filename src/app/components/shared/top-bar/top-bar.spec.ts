import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LayoutService } from '../../../core/services/layout/layout';
import { TopBar } from './top-bar';

describe('TopBar', () => {
  let component: TopBar;
  let fixture: ComponentFixture<TopBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBar],
      providers: [provideRouter([]), LayoutService],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode when toggleDarkMode is called', () => {
    expect(component.layoutService.isDarkTheme()).toBe(false);
    component.toggleDarkMode();
    expect(component.layoutService.isDarkTheme()).toBe(true);
  });
});

