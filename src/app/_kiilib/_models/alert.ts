export interface IAlert {
    id: number;
    userId:number;
    type:string;
    title:string;
    message:string;
    isRead:boolean;
    createdAt:string;
    updatedAt:string;
}

export class Alert {
    id: number = null;
    userId:number = null;
    type:string = null;
    title:string = null;
    message:string = null;
    isRead:boolean = null;
    createdAt:string = null;
    updatedAt:string = null;


    constructor(obj: IAlert | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key] != undefined) 
                    this[key] = obj[key];
            });
        } 
    }


}