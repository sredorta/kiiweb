import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSliderChange } from '@angular/material';
import { KiiApiStatsService } from '../../../_services/kii-api-stats.service';
import { StatResult } from 'src/app/_kiilib/_models/stat';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
import * as deepmerge from 'deepmerge';

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})



export class KiiAdminStatsComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Days of the analysis */
  days : number = 1;

  /**When we are loading new analyisis */
  isDataLoading : boolean = false;

  result : StatResult = new StatResult(null);

  /**Default options for google charts */
  defaultChartOptions : any = {
    backgroundColor:'#212121',
    colors:['#26a69a'], 
    vAxis:{textStyle:{color:'white'},baselineColor:'white'}, 
    hAxis:{textStyle:{color:'white'},baselineColor:'white'},   
    legend: {position:'none'},
    /*chartArea: {
      backgroundColor: {
          stroke: 'white',
          strokeWidth: 1
      }
    }*/
    
  }

  histoHoursVisits : any = {};

  constructor(private kiiApiStats: KiiApiStatsService,private translate: TranslateService,private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId); }

  ngOnInit() {
    let barOptions = {bar: {groupWidth: '90%'},hAxis:{textStyle:{fontSize:10},slantedText:true,slantedTextAngle:90}};
    this.histoHoursVisits = deepmerge.all([this.defaultChartOptions,barOptions]);
    //this.histoHoursVisits.hAxis = 
    console.log(this.histoHoursVisits);
    this.generateStats();
  }

  //When we change the period we recompute the stats
  onDaysSliderChange(event:MatSliderChange) {
    this.days = event.value;
    this.generateStats();
  }

  /**Generates the stats */
  private generateStats() {
    this.isDataLoading = true;
    this.addSubscriber(
      this.kiiApiStats.analyze(this.days).subscribe(res => {
        this.result = res;
        console.log("RESULTING STATS",res);
        this.isDataLoading = false;
      },
      () => this.isDataLoading = false)
    )
  }





}
