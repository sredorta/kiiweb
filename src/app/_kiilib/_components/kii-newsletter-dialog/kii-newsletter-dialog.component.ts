import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { KiiItemFormComponent } from '../_forms/kii-item-form/kii-item-form.component';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiNewsletterService } from '../../_services/kii-api-newsletter.service';
import { MatDialogRef, MatCheckbox, MatCheckboxChange } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-kii-newsletter-dialog',
  templateUrl: './kii-newsletter-dialog.component.html',
  styleUrls: ['./kii-newsletter-dialog.component.scss']
})
export class KiiNewsletterDialogComponent extends KiiBaseAbstract implements OnInit {
  validator : Validators;
  isDataLoading : boolean = false;
  showTerms : boolean = false;
  acceptedTerms : boolean = false;

  @ViewChild(KiiItemFormComponent, {static:false}) form : KiiItemFormComponent;
  @ViewChild(MatCheckbox, {static:false}) terms : MatCheckbox;
  valid : boolean = false;

  constructor(private dialogRef: MatDialogRef<KiiNewsletterDialogComponent>,
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

  unsubscribeNewsletter() {
    const email = this.form.myForm.value.result;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiNews.unsubscribeNews(email).subscribe(res => {
        this.isDataLoading = false;
        this.dialogRef.close();
      },() => this.isDataLoading = false)
    )
  }

  subscribeNewsletter() {
    const email = this.form.myForm.value.result;
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiNews.subscribeNews(email).subscribe(res => {
        this.isDataLoading = false;
        this.dialogRef.close();
      },() => this.isDataLoading = false)
    )
  }

}
