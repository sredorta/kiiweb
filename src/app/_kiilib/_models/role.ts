export interface IRole {
    id: number;
    name:string;
}

export class Role {
    id:number;
    name:string;


    constructor(obj: IRole | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key]) 
                    this[key] = obj[key];
            });
        } 
    }


    /**Extracts the current user and formats it to the interface required */
    /*to(format:string) {
        if (format == "IUser")
        return <IRole>JSON.parse(JSON.stringify(this));
    }*/

}