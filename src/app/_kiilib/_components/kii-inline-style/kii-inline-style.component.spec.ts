import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiInlineStyleComponent } from './kii-inline-style.component';

describe('KiiInlineStyleComponent', () => {
  let component: KiiInlineStyleComponent;
  let fixture: ComponentFixture<KiiInlineStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiInlineStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiInlineStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
