import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSidenavComponent } from './kii-sidenav.component';

describe('KiiSidenavComponent', () => {
  let component: KiiSidenavComponent;
  let fixture: ComponentFixture<KiiSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
