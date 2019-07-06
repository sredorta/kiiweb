import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiSocketService, IChatMessage } from '../../_services/kii-socket.service';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {

  /**Contains current chat messages */
  messages : IChatMessage[] = [];

  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(private socket: KiiSocketService, private kiiApiLang: KiiApiLanguageService) {super()}

  ngOnInit() {
    this.createForm();
    //Recieve the messages and show them and scroll to bottom of window
    this.socket.chatStart();
    this.addSubscriber(
      this.socket.onChatMessages().subscribe((msgs) => {
        this.messages = msgs;
        this.scrollBottom();
      })
    )
  }

  /**Emit when we are writting in the form */
  ngAfterViewInit() {
    this.control.nativeElement.onfocus = () => (this.socket.chatSetWritting(true));
    this.control.nativeElement.onblur = () => (this.socket.chatSetWritting(false));
  }

  /**Creates the form */
  createForm() {
    this.myForm =  new FormGroup({    
      newMessage: new FormControl('', Validators.compose([])),
    });
  }



  /**Scrolls to bottom of element */
  scrollBottom() {
    try {
      this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(err) { }  
  }

  /**When se submit the form we send the message */
  onSubmit() {
    if (this.myForm.controls["newMessage"].value!="") {
      this.socket.chatSendMessage(this.myForm.controls["newMessage"].value);
      this.myForm.controls["newMessage"].setValue("");
    }
  }
}
