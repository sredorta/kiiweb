import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiNotFoundComponent } from './kii-not-found.component';

describe('KiiNotFoundComponent', () => {
  let component: KiiNotFoundComponent;
  let fixture: ComponentFixture<KiiNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
