import {Role, IRole} from "./role";

export interface IArticle {
    id: number;
    key:string;
    cathegory:string;
    image:string;   //Contains principal image link
    backgroundImage:string;
    public:boolean;
    title:string;
    description:string;
    content:string;
    createdAt:string;
    updatedAt:string;
}

export class Article {
    id: number = null;
    key:string = null;
    cathegory:string = null;
    image:string = null;   //Contains principal image link
    backgroundImage:string = null;
    public:boolean = null;
    title:string = null;
    description:string = null;
    content:string = null;
    createdAt:string = null;
    updatedAt:string = null;

    private _isLoaded:boolean=false;

    constructor(obj: IArticle | null) {
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


    /**Updates current values */
    update(obj: any){
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key]) 
                    this[key] = obj[key];
            });
        } 
    }

    /**Extracts the current user and formats it to the interface required */
    to(format:string) {
        if (format == "IArticle")
        return <IArticle>JSON.parse(JSON.stringify(this));
    }

    /**REturns article image */
    public getImage() {
        if (this.image) {
            return this.image;
        } else
            return './assets/kiilib/images/no-photo-available.jpg';
    }

    /**Returns article image url*/
    public getImageUrl() {
        return 'url(' + this.getImage() + ')';
    }

    /**Returns article background image */
    public getBackgroundImageUrl() {
        if (this.backgroundImage) {
            if (this.backgroundImage == "none") return 'none';
            return 'url(' + this.backgroundImage + ')';
        } else
            return 'none';
    }


   
}
