
import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { KiiItemFormComponent } from '../_forms/kii-item-form/kii-item-form.component';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiNewsletterService } from '../../_services/kii-api-newsletter.service';
import { MatDialogRef, MatCheckbox, MatCheckboxChange, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { KiiTermsDialogComponent } from '../kii-terms-dialog/kii-terms-dialog.component';

@Component({
  selector: 'kii-newsletter',
  templateUrl: './kii-newsletter.component.html',
  styleUrls: ['./kii-newsletter.component.scss']
})
export class KiiNewsletterComponent extends KiiBaseAbstract implements OnInit {
  validator : Validators;
  isDataLoading : boolean = false;
  acceptedTerms : boolean = false;

  @ViewChild(KiiItemFormComponent, {static:false}) form : KiiItemFormComponent;
  @ViewChild(MatCheckbox, {static:false}) terms : MatCheckbox;
  valid : boolean = false;

  constructor(private dialog: MatDialog,
              private kiiApiNews : KiiApiNewsletterService) { 
                super(); 
              }

  ngOnInit() {
    this.validator = Validators.compose([
      Validators.email,
    ]);
  }

  ngAfterViewInit() {
    this.addSubscriber(
      this.form.myForm.valueChanges.subscribe(res => {
        this.valid = this.form.myForm.valid;
      })
    )
    this.addSubscriber(
      this.terms.change.subscribe((res:MatCheckboxChange) => {
        this.acceptedTerms = res.checked;
      })
    )
  }
  /**Opens temrs and conditions dialog */  
  openTermsAndConditionsDialog(): void {
    let dialogRef = this.dialog.open(KiiTermsDialogComponent, {
      panelClass: '',
      data:  null,
      maxHeight:'90vh',
      minHeight:'300px',
      minWidth:'320px',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.acceptedTerms = result;
      this.terms.writeValue(result);
    });
  }

  unsubscribeNewsletter() {
    const email = this.form.myForm.value.result;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiNews.unsubscribeNews(email).subscribe(res => {
        this.isDataLoading = false;
      },() => this.isDataLoading = false)
    )
  }

  subscribeNewsletter() {
    const email = this.form.myForm.value.result;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiNews.subscribeNews(email).subscribe(res => {
        this.isDataLoading = false;
      },() => this.isDataLoading = false)
    )
  }

}
