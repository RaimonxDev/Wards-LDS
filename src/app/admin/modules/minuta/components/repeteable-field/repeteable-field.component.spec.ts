import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeteableFieldComponent } from './repeteable-field.component';

describe('RepeteableFieldComponent', () => {
  let component: RepeteableFieldComponent;
  let fixture: ComponentFixture<RepeteableFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeteableFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeteableFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
