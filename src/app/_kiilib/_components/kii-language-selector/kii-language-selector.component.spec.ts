import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiLanguageSelectorComponent } from './kii-language-selector.component';

describe('KiiLanguageSelectorComponent', () => {
  let component: KiiLanguageSelectorComponent;
  let fixture: ComponentFixture<KiiLanguageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiLanguageSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
