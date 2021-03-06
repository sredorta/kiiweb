/**Enumerator with all stats events*/
export enum StatAction {
    NAVIGATION_START = "navigation_start",
    APP_START = "app_start",
    APP_END = "app_end",
    SOCIAL_CLICK = "social_click",
    SOCIAL_SHARE = "social_share",
    CHAT_ENTER = "chat_enter",
    CHAT_LEAVE = "chat_leave",
    CHAT_MESSAGE = "chat_message",
    APP_INSTALL = "app_install",
    NEWSLETTER = "newsletter",
    UNDEFINED = "unknown"
}

  
export interface IStat {
    id: number;
    session:string;
    action:StatAction;
    ressource:string;  //It contains the page in the case of navigation, and facebook... in case of social
}

export interface IStatWindow {
    current : number;
    previous:number;
  }
  
export class StatResult {
    visits_count : IStatWindow = {current:0,previous:0};
    visits_duration : IStatWindow = {current:0,previous:0};
    pages_count : IStatWindow = {current:0,previous:0};
    pages_per_visit : IStatWindow = {current:0,previous:0};
    social_click_count : IStatWindow = {current:0,previous:0};
    chat_click_count : IStatWindow = {current:0,previous:0};
    chat_duration : IStatWindow = {current:0,previous:0};
    chat_message_count : IStatWindow = {current:0,previous:0};
    app_install_count : IStatWindow = {current:0,previous:0};


    visits_hours_histogram : any[] = [[],[],[],[],[],[],[],[]];
    visits_over_day : any[] = [];
    app_over_day : any [] = [];
    newsletter_over_day : any = [];
    referrals_histogram : any[] = [];
    social_over_day : any = {all:[]};
    social_histogram : any[] = [];
    pages_visited_histogram : any = {};
    languages : any[] = [];

    constructor(obj: any | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
        } 
    }
  
}

export class Stat {
    id:number = null;
    session:string = null;
    action:StatAction = StatAction.UNDEFINED;
    ressource:string = null;


    constructor(obj: IStat | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
        } 
    }

}