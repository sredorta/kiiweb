import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import { KiiApiLanguageService } from '../../_services/kii-api-language.service';
import { KiiFormAbstract } from '../../_abstracts/kii-form.abstract';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KiiSocketService, IChatMessage, IChatUser, IChatRoom, IChatData, ChatDataType, SocketEvents } from '../../_services/kii-socket.service';
import { KiiApiAuthService } from '../../_services/kii-api-auth.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../../_models/user';
import { TranslateService } from '@ngx-translate/core';
import { KiiApiStatsService } from '../../_services/kii-api-stats.service';
import { StatAction } from '../../_models/stat';

@Component({
  selector: 'kii-chat',
  templateUrl: './kii-chat.component.html',
  styleUrls: ['./kii-chat.component.scss']
})
export class KiiChatComponent extends KiiFormAbstract implements OnInit {

  /**Contains current chat messages */
  @Input() messages : IChatMessage[] = [];

  /**If we are in the admin context we don't send FirstMessage */
  @Input() isAdminContext : boolean = false;

  /**Contains chat administrators */
  admins: IChatUser[] = [];

  /**When other chat partner is writting message */
  writting : boolean = false;

  /**Contains current room info */
  @Input() room : IChatRoom = {
    id:null,
    participants:1,
    date: new Date(),
    messages: [],
    language: environment.languages[0]
  };

  /**Contains if is first message sent */
  isFirstMessage : boolean = true;

  loggedInUser: User = new User(null);

  you: string = 'You';


  /**Content of the chat */
  @ViewChild('content',{static:false}) content : ElementRef;

  /**Message control */
  @ViewChild('control',{static:false}) control : ElementRef;

  constructor(private kiiApiStats : KiiApiStatsService,
              private socket: KiiSocketService, 
              private kiiApiLang: KiiApiLanguageService, 
              private kiiApiAuth: KiiApiAuthService,
              private translate: TranslateService) {super()}

  ngOnInit() {
    this.kiiApiStats.send(StatAction.CHAT_ENTER,null);
    this.createForm();
    this.socket.getChatAdmins();  //Request chat admins
    this.socket.chatStart();      //Creates and gets room if we are not admin
    this.addSubscriber(
      this.translate.get("kiilib.you").subscribe(message => {
          this.you = message;
      })
    )

    //Get chat admins
    this.addSubscriber(
      this.socket.onChatAdmins().subscribe(admins => {
        this.admins = admins;
      })
    )
    this.addSubscriber(
      this.kiiApiAuth.getLoggedInUser().subscribe(user => {
        this.loggedInUser = user;
      })
    )
    //Gets all room-to-room data
    this.addSubscriber(
      this.socket.onDataChange().subscribe((data:IChatData) => {
        if (data) {
          switch (data.type) {
            case ChatDataType.Message :
              this.messages.push(data.object.message);
              break;
            case ChatDataType.StoredMessagesRequest:
              //Give back our stored messages
              this.socket.socket.emit(SocketEvents.CHAT_DATA, {room:this.room.id, type:ChatDataType.StoredMessagesResponse, object:{messages:this.messages,language:this.kiiApiLang.get()}});
              break;
            case ChatDataType.Room :
              this.room = data.object.room;  
              break;
            case ChatDataType.Participants :
              this.room.participants = data.object.participants;
              break;  
            case ChatDataType.Writting :
              this.writting = data.object.value; 
              break;   
            default:
          }
        }
      })
    )

  }

  /**Emit when we are writting in the form */
  ngAfterViewInit() {
    this.control.nativeElement.onfocus = () => (this.socket.sendChatData({room:this.room.id,type:ChatDataType.Writting,object:{value:true}}));
    this.control.nativeElement.onblur = () => (this.socket.sendChatData({room:this.room.id,type:ChatDataType.Writting,object:{value:false}}));
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
        room:this.room.id,
        isBot:false,
        senderName: this.loggedInUser.firstName
      }
      if (this.isFirstMessage && !this.isAdminContext) {
         this.socket.sendChatData({room:this.room.id, type: ChatDataType.FirstMessage, object: {message:myMessage}});
         this.isFirstMessage = false;
      } else 
         this.socket.sendChatData({room:this.room.id, type: ChatDataType.Message, object: {message:myMessage}});
      this.kiiApiStats.send(StatAction.CHAT_MESSAGE,null);
      this.messages.push(myMessage);
      //Reset form value
      this.myForm.controls["newMessage"].setValue("");
    }
  }

  /**Returns if message is bot */
  isBot(message:IChatMessage) {
      return message.isBot;
  }

  /**Returns if I am the sender of the message */
  iAmSender(message:IChatMessage) {
    if ((message.sender == this.socket.socket.id) && (message.isBot == false)) return true;
    return false;
  }

  getMessageOwner(message:IChatMessage) {
    if (message.isBot) return 'bot';
    if (message.sender == this.socket.socket.id) return this.you;
    if (message.senderName) return message.senderName;
    return null;
  }

  ngOnDestroy() {
    this.kiiApiStats.send(StatAction.CHAT_LEAVE,null);
    //Unsubscribe all
    for (let subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

}
