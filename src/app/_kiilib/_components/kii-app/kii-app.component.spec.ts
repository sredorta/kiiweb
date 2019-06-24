import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAppComponent } from './kii-app.component';

describe('KiiAppComponent', () => {
  let component: KiiAppComponent;
  let fixture: ComponentFixture<KiiAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
