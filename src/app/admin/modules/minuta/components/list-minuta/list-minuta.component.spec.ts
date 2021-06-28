import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinutaComponent } from './list-minuta.component';

describe('ListMinutaComponent', () => {
  let component: ListMinutaComponent;
  let fixture: ComponentFixture<ListMinutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMinutaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMinutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
