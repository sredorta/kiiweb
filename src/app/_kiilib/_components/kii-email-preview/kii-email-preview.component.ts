import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Email } from '../../_models/email';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiEmailService } from '../../_services/kii-api-email.service';

@Component({
  selector: 'kii-email-preview',
  templateUrl: './kii-email-preview.component.html',
  styleUrls: ['./kii-email-preview.component.scss']
})
export class KiiEmailPreviewComponent extends KiiBaseAbstract implements OnInit {

  /**Email to preview */
  @Input() email : Email = new Email(null);

  /**Shows preview spinner if preview is loading */
  isPreviewLoading : boolean = false;
  
  /**Contains the wrapper of the email */
  @ViewChild('wrapper',{static:false}) wrapper : ElementRef;

  /**Contains the preview of the email  scaled*/
  @ViewChild('container',{static:false}) container : ElementRef;

  constructor(private kiiApiEmail: KiiApiEmailService) { super() }

  ngOnInit() {
    this.loadPreview();
  }

  ngOnChanges(changes:SimpleChanges) {
    if (changes.email)
      if (changes.email.currentValue != undefined) {
          this.email = changes.email.currentValue;
          this.loadPreview();
      }
  }

  /**Loads current preview */
  loadPreview() {
    this.isPreviewLoading = true;
    let subscription =  this.kiiApiEmail.preview(this.email).subscribe(html => {
        this.container.nativeElement.innerHTML = html;
        this.isPreviewLoading = false;
      }, () => {
        this.isPreviewLoading = false
        subscription.unsubscribe();
      });
  }
}
