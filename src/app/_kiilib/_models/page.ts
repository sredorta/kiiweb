export interface IPage {
    id: number;
    page:string;
    title:string;
    description:string;
    image:string;
}

export class Page {
    id: number = null;
    page:string = null;
    title:string = null;
    description:string = null;   
    image:string = null;

    private _isLoaded:boolean=false;

    constructor(obj: IPage | null) {
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
        return <IPage>JSON.parse(JSON.stringify(this));
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
   
}