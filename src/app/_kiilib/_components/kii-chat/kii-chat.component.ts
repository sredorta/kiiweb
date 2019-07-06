import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiChatService, IChatMessage } from '../../_services/kii-chat.service';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {

  /**Contains current chat messages */
  messages : IChatMessage[] = [];

  @ViewChild('content',{static:false}) content : ElementRef;

  constructor(private chat: KiiChatService, private kiiApiLang: KiiApiLanguageService) {super()}

  ngOnInit() {
    this.createForm();
    //Recieve the messages and show them and scroll to bottom of window
    this.addSubscriber(
      this.chat.onMessages().subscribe((msgs) => {
        this.messages = msgs;
        this.scrollBottom();
      })
    )

  }
  createForm() {
    this.myForm =  new FormGroup({    
      newMessage: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }

  /**Scrolls to bottom of element */
  scrollBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(err) { }  
  }

  /**When se submit the form we send the message */
  onSubmit(value:any) {
    console.log(value);
    if (this.myForm.valid)
      this.chat.echo(value.newMessage);
  }
}
