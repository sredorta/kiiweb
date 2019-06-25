import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiBottomSheetSoftwareUpdateComponent } from './kii-bottom-sheet-software-update.component';

describe('KiiBottomSheetSoftwareUpdateComponent', () => {
  let component: KiiBottomSheetSoftwareUpdateComponent;
  let fixture: ComponentFixture<KiiBottomSheetSoftwareUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiBottomSheetSoftwareUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiBottomSheetSoftwareUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
