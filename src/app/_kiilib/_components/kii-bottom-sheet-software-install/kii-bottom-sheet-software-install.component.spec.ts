import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiBottomSheetSoftwareInstallComponent } from './kii-bottom-sheet-software-install.component';

describe('KiiBottomSheetSoftwareInstallComponent', () => {
  let component: KiiBottomSheetSoftwareInstallComponent;
  let fixture: ComponentFixture<KiiBottomSheetSoftwareInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiBottomSheetSoftwareInstallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiBottomSheetSoftwareInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
