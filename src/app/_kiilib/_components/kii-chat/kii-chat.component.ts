import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiSocketService, IChatMessage, IChatUser, IChatRoom, IChatData, ChatDataType } from '../../_services/kii-socket.service';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {

  /**Contains current chat messages */
  @Input() messages : IChatMessage[] = [];

  /**Contains chat administrators */
  admins: IChatUser[] = [];

  /**Contains current room info */
  @Input() room : IChatRoom = {
    id:null,
    participants:1,
    date: new Date(),
    messages: []
  };

  /**Contains if is first message sent */
  isFirstMessage : boolean = true;


  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(private socket: KiiSocketService, private kiiApiLang: KiiApiLanguageService) {super()}

  ngOnInit() {
    this.createForm();
    this.socket.getChatAdmins();  //Request chat admins
    //Get chat admins
    this.addSubscriber(
      this.socket.onChatAdmins().subscribe(admins => {
        this.admins = admins;
      })
    )

    //Gets all room-to-room data
    this.addSubscriber(
      this.socket.onDataChange().subscribe((data:IChatData) => {
        console.log("Recieved data:",data);
        if (data) {
          switch (data.type) {
            case ChatDataType.Message :
              this.messages.push(data.object.message);
              break;
            case ChatDataType.Room :
              this.room = data.object.room;  
              break;
            default:
          }
        }
      })
    )

  }

  /**Emit when we are writting in the form */
  ngAfterViewInit() {
    //this.control.nativeElement.onfocus = () => (this.socket.chatSetWritting(true));
    //this.control.nativeElement.onblur = () => (this.socket.chatSetWritting(false));
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
      let myMessage : IChatMessage = {
        message: this.myForm.controls["newMessage"].value,
        sender: this.socket.socket.id,
        date: new Date(),
        room:this.room.id
      }
      this.socket.sendChatData({room:this.room.id, type: ChatDataType.Message, object: {message:myMessage}});
      this.messages.push(myMessage);
      //If is first message we write then request admins to join
      if (!this.room.id && this.isFirstMessage) {
          console.log("Sending notification to all admins !!!!");
          this.socket.chatNewNotify(myMessage);
          this.isFirstMessage = false;
      }
      //Reset form value
      this.myForm.controls["newMessage"].setValue("");
    }
  }

  /**Returns if message is bot */
  isBot(message:IChatMessage) {
      if (message.sender == "bot") return true;
      return false;
  }

  /**Returns if I am the sender of the message */
  iAmSender(message:IChatMessage) {
    if (message.sender == this.socket.socket.id) return true;
    return false;
  }

}
