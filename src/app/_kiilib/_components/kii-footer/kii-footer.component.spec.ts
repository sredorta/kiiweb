import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiFooterComponent } from './kii-footer.component';

describe('KiiFooterComponent', () => {
  let component: KiiFooterComponent;
  let fixture: ComponentFixture<KiiFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
