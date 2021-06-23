import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMinutaComponent } from './crear-minuta.component';

describe('CrearMinutaComponent', () => {
  let component: CrearMinutaComponent;
  let fixture: ComponentFixture<CrearMinutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMinutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
