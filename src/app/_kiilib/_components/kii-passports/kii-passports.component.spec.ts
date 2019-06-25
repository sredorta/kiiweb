import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiPassportsComponent } from './kii-passports.component';

describe('KiiPassportsComponent', () => {
  let component: KiiPassportsComponent;
  let fixture: ComponentFixture<KiiPassportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiPassportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiPassportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
