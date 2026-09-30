import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LayoutService } from '../../../core/services/layout/layout';
import { Configurator } from './configurator';

describe('Configurator', () => {
  let component: Configurator;
  let fixture: ComponentFixture<Configurator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Configurator],
      providers: [provideRouter([]), LayoutService],
    }).compileComponents();

    fixture = TestBed.createComponent(Configurator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list available presets', () => {
    expect(component.presets).toContain('Aura');
    expect(component.presets).toContain('Lara');
    expect(component.presets).toContain('Nora');
  });

  it('should change menu mode', () => {
    component.onMenuModeChange('overlay');
    expect(component.layoutService.layoutConfig().menuMode).toBe('overlay');
  });
});

