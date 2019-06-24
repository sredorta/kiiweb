/**Setting interface */
export interface ISetting {
    id: number,
    key: string,
    type:string,
    value: string,
    translations: ISettingTranslation[]
  }

/**Setting translations */  
export interface ISettingTranslation {
    id:number;
    settingId:number;
    iso:string;
    value:string;
}  

export class Setting {
    id:number = null;
    key:string = null;
    type:string = null;
    value:string = null;
    translations: ISettingTranslation[] = [];

    private _isLoaded:boolean=false;    //Gives if user has been initialized or not
    constructor(obj:ISetting | null) {
        if (obj) {
            Object.keys(this).forEach(key => {
                if (obj[key]) 
                    this[key] = obj[key];
            });
            this._isLoaded = true;
        } else {
            this.value = "";
        }
        /*console.log("CREATED SETTING --------------------");
        console.log(this);
        console.log("------------------------------------");*/
    }

    /**Returns if setting has been initialized or not */
    exists() {
        return this._isLoaded;
    }

}