import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiBottomSheetCookiesComponent } from './kii-bottom-sheet-cookies.component';

describe('KiiBottomSheetCookiesComponent', () => {
  let component: KiiBottomSheetCookiesComponent;
  let fixture: ComponentFixture<KiiBottomSheetCookiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiBottomSheetCookiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiBottomSheetCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
