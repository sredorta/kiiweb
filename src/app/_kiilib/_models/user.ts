import {Role, IRole} from "./role";
import { Alert, IAlert } from './alert';

export interface IUser {
    id: number;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    mobile:string;
    terms:boolean;
    language:string;
    avatar:string;
    isEmailValidated:boolean;
    createdAt:string;
    updatedAt:string;
    roles?:Role[];
    alerts?:Alert[];
}

export class User {
    id:number = null;
    firstName:string = null;
    lastName:string = null;
    email:string = null;
    phone:string = null;
    mobile:string = null;
    language:string = null;
    avatar:string=null;
    isEmailValidated:boolean = null;
    terms:boolean = null;
    createdAt:string = null;
    updatedAt:string = null;
    roles:Role[] = [];
    alerts:Alert[] = [];

    private _isLoaded:boolean=false;    //Gives if user has been initialized or not

    constructor(obj: IUser | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key]) 
                    this[key] = obj[key];
            });
            if (obj.roles) {
                this.roles = [];
                for(let role of obj.roles) {
                    this.roles.push(new Role(<IRole>role));
                }
            }
            if (obj.alerts) {
                this.alerts = [];
                for(let alert of obj.alerts) {
                    this.alerts.push(new Alert(<IAlert>alert));
                }
            }
            this._isLoaded = true;
        } 
    }

    /**Returns if user has been initialized or not */
    exists() {
        return this._isLoaded;
    }

    /**Returns alert count */
    getUnreadAlertCount() {
        if (this.alerts)
            return this.alerts.filter(obj => obj.isRead == false).length;
        return 0;    
    }

    /**Updates current user values by adding new elements */
    update(obj: any){
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
        } 
    }

    /**Extracts the current user and formats it to the interface required */
    to(format:string) {
        if (format == "IUser")
        return <IUser>JSON.parse(JSON.stringify(this));
    }


    /**Saves the token into the localstorage */
    public static saveToken(token:string) {
        localStorage.setItem('token', token);
    }

    /**Gets token from the localstorage */
    public static getToken() {
        return localStorage.getItem('token');
    }

    /**Checks if user has token or not */
    public static hasToken() {
        if (localStorage.getItem("token") === null) return false;
        return true;
    }

    /**Removes token from localstorage */
    public static removeToken() {
        localStorage.removeItem('token');
    }

    /**Returns if user has specified role */
    public hasRole(role:number | string) : boolean {
        if (typeof role == "string") {
            return this.roles.find(obj => obj.name == role) == undefined?false:true;
        } else {
            return this.roles.find(obj => obj.id == role) == undefined?false:true;
        }
    }
    /**Returns if user has any special role */
    public hasRoles() :boolean {
        if (!this.roles) return false;
        if (this.roles.length == 0) return false;
        return true;
    }

}
