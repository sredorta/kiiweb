import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiItemFormComponent } from './kii-item-form.component';

describe('KiiItemFormComponent', () => {
  let component: KiiItemFormComponent;
  let fixture: ComponentFixture<KiiItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
