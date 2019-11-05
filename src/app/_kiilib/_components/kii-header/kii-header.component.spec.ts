import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiHeaderComponent } from './kii-header.component';

describe('KiiHeaderComponent', () => {
  let component: KiiHeaderComponent;
  let fixture: ComponentFixture<KiiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
