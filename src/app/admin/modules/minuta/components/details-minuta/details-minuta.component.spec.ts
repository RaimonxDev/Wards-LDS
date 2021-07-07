import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMinutaComponent } from './details-minuta.component';

describe('DetailsMinutaComponent', () => {
  let component: DetailsMinutaComponent;
  let fixture: ComponentFixture<DetailsMinutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMinutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
