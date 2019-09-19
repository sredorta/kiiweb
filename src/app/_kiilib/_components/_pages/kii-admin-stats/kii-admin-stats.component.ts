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

  visitsOverTimeOptions : any = {};
  histoHoursVisitsOptions : any = {};

  testData = [
    //['ID', 'DAY', 'HOUR', 'BubbleColor', 'BubbleSize'],
    ['',  1, 0, 1,100],
    ['',  1, 1, 1,150],
    ['',  1, 2, 1,80],
    ['',  1, 3, 1,20],
    ['',  2, 0, 1,10],
    ['',  2, 1, 1,7000],
    ['',  2, 2, 1,20],
    ['',  2, 3, 1,30],
    ['',  3, 0, 1,40],
    ['',  3, 1, 1,60],
    ['',  3, 2, 1, 60],
    ['',  3, 3, 1, 60],
    ['',  4, 0, 1,40],
    ['',  4, 1, 1,60],
    ['',  4, 2, 1, 60],
    ['',  4, 3, 1, 60],
    ['',  5, 0, 1,40],
    ['',  5, 1, 1,60],
    ['',  5, 2, 1, 60],
    ['',  5, 3, 1, 60],
    ['',  6, 0, 1,40],
    ['',  6, 1, 1,60],
    ['',  6, 2, 1, 60],
    ['',  6, 3, 1, 60],
    ['',  7, 0, 1,40],
    ['',  7, 1, 1,60],
    ['',  7, 2, 1, 60],
    ['',  7, 3, 1, 60],
    ['',  8, 0, 1,40],
    ['',  8, 1, 1,60],
    ['',  8, 2, 1, 60],
    ['',  8, 3, 1, 60],
    ['',  9, 0, 1,40],
    ['',  9, 1, 1,60],
    ['',  9, 2, 1, 60],
    ['',  9, 3, 1, 60],
/*
    ['0-1', 10,      10,    10,    10,    10,   10,    10],
    ['1-2', 1,        2,     4,     1,     1,    1,     1],
    ['2-3', 0,        2,     4,     0,     0,    5,     1],
    ['3-4', 1,        2,     4,     1,     1,    1,     1],
    ['4-5', 1,        2,     4,     1,     1,    1,     1],
    ['5-6', 1,        2,     4,     1,     1,    1,     1],*/

  ]

  constructor(private kiiApiStats: KiiApiStatsService,private translate: TranslateService,private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId); }




  


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
        this.isDataLoading = false;
      },
      () => this.isDataLoading = false)
    )
  }





}
