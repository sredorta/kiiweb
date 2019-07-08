import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiSocketService, IChatMessage, IChatUser } from '../../_services/kii-socket.service';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {

  /**Contains current chat messages */
  messages : IChatMessage[] = [];

  /**Contains chat administrators */
  admins: IChatUser[] = [];


  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(private socket: KiiSocketService, private kiiApiLang: KiiApiLanguageService) {super()}

  ngOnInit() {
    this.createForm();
    //Recieve the messages and show them and scroll to bottom of window
    this.addSubscriber(
      this.socket.onChatMessages().subscribe((msgs) => {
        if (msgs.length <= 0 ) this.socket.chatStart();
        this.messages = msgs;
        this.scrollBottom();
      })
    )
    //Get chat admins
    this.addSubscriber(
      this.socket.onChatAdmins().subscribe(admins => {
        this.admins = admins;
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

  /**Gets avatar or default avatar */
  getAvatar(avatar:string) {
    if (avatar) return avatar;
    else return './assets/kiilib/images/user-default.jpg';
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
      //If is first message we write then request admins to join
      if (this.socket.isFirstChatMessage()) {
          this.socket.chatNewNotify(this.myForm.controls["newMessage"].value);
      }
      //Reset form value
      this.myForm.controls["newMessage"].setValue("");
    }
  }
}
