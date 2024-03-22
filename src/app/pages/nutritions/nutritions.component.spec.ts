import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionsComponent } from './nutritions.component';

describe('NutritionsComponent', () => {
  let component: NutritionsComponent;
  let fixture: ComponentFixture<NutritionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionsComponent]
    });
    fixture = TestBed.createComponent(NutritionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
