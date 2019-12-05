import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiElementComponent } from './kii-element.component';

describe('KiiElementComponent', () => {
  let component: KiiElementComponent;
  let fixture: ComponentFixture<KiiElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
