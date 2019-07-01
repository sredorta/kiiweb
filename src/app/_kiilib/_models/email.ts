export interface IEmail {
    id: number;
    name:string;
    logo:string;
    backgroundContent:string;   //Contains principal image link
    backgroundHeader:string;
    footerColor:string;
    headerColor:string;
    titleColor:string;
    subtitleColor:string;
    textColor:string;
    isProtected:boolean;
    description:string;
    title:string;
    subtitle:string;
    header:string;
    content:string;
    createdAt:string;
    updatedAt:string;
}

export class Email {
    id:number = null;
    name:string = null;
    logo:string = null;
    backgroundContent:string = null;
    backgroundHeader:string = null;
    footerColor:string = null;
    headerColor:string = null;
    titleColor:string = null;
    subtitleColor:string = null;
    textColor:string = null;
    isProtected:boolean = null;
    description:string = null;
    title:string = null;
    subtitle:string = null;
    header:string = null;
    content:string = null;
    createdAt:string = null;
    updatedAt:string = null;

    private _isLoaded:boolean=false;

    constructor(obj: IEmail | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
            this._isLoaded = true;
        } 
    }

    /**Returns if user has been initialized or not */
    exists() {
        return this._isLoaded;
    }
}    