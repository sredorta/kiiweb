import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
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
  
  /**Contains the preview of the email */
  //@ViewChildren('preview') preview : QueryList<ElementRef>;
  @ViewChild('container',{static:false}) container : ElementRef;

  constructor(private kiiApiEmail: KiiApiEmailService) { super() }

  ngOnInit() {
    this.loadPreview();
  }

  /**Loads current preview */
  loadPreview() {
    this.isPreviewLoading = true;
    console.log(this.email);
    let subscription =  this.kiiApiEmail.preview(this.email).subscribe(html => {
      console.log(html);
        this.container.nativeElement.innerHTML = html;
        this.isPreviewLoading = false;
      }, () => {
        this.isPreviewLoading = false
        subscription.unsubscribe();
      });
  }
}
