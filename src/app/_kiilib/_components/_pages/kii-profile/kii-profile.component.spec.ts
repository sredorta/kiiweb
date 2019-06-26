import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiProfileComponent } from './kii-profile.component';

describe('KiiProfileComponent', () => {
  let component: KiiProfileComponent;
  let fixture: ComponentFixture<KiiProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
