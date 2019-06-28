import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiiAdminArticlesComponent } from './kii-admin-articles.component';

describe('KiiAdminArticlesComponent', () => {
  let component: KiiAdminArticlesComponent;
  let fixture: ComponentFixture<KiiAdminArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiiAdminArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiiAdminArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
