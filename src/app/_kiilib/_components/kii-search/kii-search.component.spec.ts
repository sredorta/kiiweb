import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiSearchComponent } from './kii-search.component';

describe('KiiSearchComponent', () => {
  let component: KiiSearchComponent;
  let fixture: ComponentFixture<KiiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
