import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolesSection } from './roles-section';

describe('RolesSection', () => {
  let component: RolesSection;
  let fixture: ComponentFixture<RolesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolesSection],
    }).compileComponents();

    fixture = TestBed.createComponent(RolesSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
