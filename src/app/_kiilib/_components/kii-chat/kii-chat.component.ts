import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiSocketService, IChatMessage, IChatUser, IChatRoom } from '../../_services/kii-socket.service';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {
  /**In the admin context we do some things differently like we do not trigger start of rooms... */
  @Input() isAdminContext : boolean = false;


  /**Contains current chat rooom */
  @Input() room : IChatRoom;


  /**Contains current chat messages */
  messages : IChatMessage[] = [];

  /**Contains chat administrators */
  admins: IChatUser[] = [];


  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(private socket: KiiSocketService, private kiiApiLang: KiiApiLanguageService) {super()}

  ngOnChanges(changes:SimpleChanges) {
    if (changes.room) {
      this.room = changes.room.currentValue;
      //Trigger to get all chat messages  
      this.socket.getChatStoredMessages(this.room.id);
      console.log("Changes",this.room);
    }
  }

  ngOnInit() {
    this.createForm();
    if (!this.isAdminContext) this.socket.chatStart();  //Triggers chat start !

    //Get chat admins
    this.addSubscriber(
      this.socket.onChatAdmins().subscribe(admins => {
        this.admins = admins;
      })
    )
    //Get current chat room if we are not admin
    if (!this.isAdminContext)
      this.addSubscriber(
        this.socket.onChatRoom().subscribe(room => {
          console.log("We recieved the room :", room);
          this.room = room;
          //Trigger to get all chat messages  
          this.socket.getChatStoredMessages(this.room.id);
        })
      )

    //Get current chat messages
    this.addSubscriber(
      this.socket.onChatMessages().subscribe(res => {
        //Filter messages with only current room (admins have messages with all rooms)
        this.messages = res.filter(obj=> obj.room == this.room.id);
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
      let myMessage : IChatMessage = {
        message: this.myForm.controls["newMessage"].value,
        sender: this.socket.socket.id,
        date: new Date(),
        room: this.room.id
      }
      console.log("Sending message:",myMessage);
      this.socket.chatSendMessage(myMessage);
      //If is first message we write then request admins to join
      if (this.socket.isFirstChatMessage() && !this.isAdminContext) {
          this.socket.chatNewNotify(myMessage);
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
