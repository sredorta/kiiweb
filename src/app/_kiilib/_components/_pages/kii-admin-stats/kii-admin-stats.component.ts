import { Component, OnInit, Inject, PLATFORM_ID, HostListener, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSliderChange } from '@angular/material';
import { KiiApiStatsService } from '../../../_services/kii-api-stats.service';
import { StatResult } from 'src/app/_kiilib/_models/stat';
import { angularEditorConfig } from '@kolkov/angular-editor/lib/config';
import * as deepmerge from 'deepmerge';
import { GoogleChartComponent } from 'angular-google-charts';
import { KiiApiLanguageService } from 'src/app/_kiilib/_services/kii-api-language.service';

@Component({
  selector: 'kii-admin-stats',
  templateUrl: './kii-admin-stats.component.html',
  styleUrls: ['./kii-admin-stats.component.scss']
})



export class KiiAdminStatsComponent extends KiiBaseAuthAbstract implements OnInit {

  /**Days of the analysis */
  days : number = 7;

  /**When we are loading new analyisis */
  isDataLoading : boolean = false;

  result : StatResult = new StatResult(null);

  /**Default options for google charts */
  defaultChartOptions : any = {
    backgroundColor:'#212121',
    colors:['#9ccc65','#ffee58','#ffa726','#8d6e63','#78909C'], 
    vAxis:{
      textStyle:{
        color:'white',
        fontSize:10
      },
      baselineColor:'white',
      titleTextStyle: {
        color:'white',
      }
    }, 
    hAxis:{
      textStyle:{
        color:'white',
        fontSize:10
      },
      baselineColor:'white',
      titleTextStyle: {
        color:'white',
      }
    },   
    legend: {position:'none'},
    chartArea: {left:50,right:20,top:10,bottom:70,width: '100%', 'height': '100%'},
    titleTextStyle: {
      color:'white',
      fontSize:18,
      bold:true
    },
  }

  pagesVisitedHistogram : any[] = [];


  visitsOverTimeOptions : any = {};
  histoHoursVisitsOptions : any = {};
  referralsOptions : any = {};
  languagesOptions : any = {};
  dayOfWeek : number = 7;
  language : string = this.kiiApiLang.get();
  languagesAvailable : any = this.kiiApiLang.getSupportedLanguages();


  constructor(private kiiApiLang: KiiApiLanguageService ,private kiiApiStats: KiiApiStatsService,private translate: TranslateService,private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId); }




  ngOnInit() {
    this.histoHoursVisitsOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: "Day hours"
        },
        vAxis: {
          title:"Visits"
        },
        bubble: {
          size:'value'
        }
      }
    ]);
    this.referralsOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: "Traffic source"
        },
        vAxis: {
          title:"Visits"
        },
        chartArea: {left:50,right:20,top:10,bottom:200,width: '100%', 'height': '100%'},

      }
    ]);
    this.visitsOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        curveType: 'function',
        hAxis: {
          title:"Day",
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title:"Visits"
        }
      }
    ]);
    this.languagesOptions = deepmerge.all([this.defaultChartOptions,
      {
        pieHole:0.4,
        pieSliceTextStyle: {
          color: 'white',
        },
      }
    ]);    


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
        //Convert dates into Date objects
        for (let elem of res.visits_over_day) {
          elem[0] = new Date(elem[0]);
        }
        this.result = res;
        this.pagesVisitedHistogram = this.result.pages_visited_histogram[this.language];
        console.log("STATS RESULT:",res);
        this.isDataLoading = false;
      },
      () => this.isDataLoading = false)
    )
  }





}
