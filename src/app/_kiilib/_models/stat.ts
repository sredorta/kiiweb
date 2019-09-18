/**Enumerator with all stats events*/
export enum StatAction {
    NAVIGATION_START = "navigation_start",
    APP_START = "app_start",
    APP_END = "app_end",
    SOCIAL_CLICK = "social_click",
    SOCIAL_SHARE = "social_share",
    CHAT_ENTER = "chat_enter",
    CHAT_LEAVE = "chat_leave",
    UNDEFINED = "unknown"
}

  
export interface IStat {
    id: number;
    session:string;
    action:StatAction;
    ressource:string;  //It contains the page in the case of navigation, and facebook... in case of social
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