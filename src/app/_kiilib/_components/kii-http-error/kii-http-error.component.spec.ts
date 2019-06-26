import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiHttpErrorComponent } from './kii-http-error.component';

describe('KiiHttpErrorComponent', () => {
  let component: KiiHttpErrorComponent;
  let fixture: ComponentFixture<KiiHttpErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiHttpErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiHttpErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
