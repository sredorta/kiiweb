import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { KiiBaseAuthAbstract } from '../../../_abstracts/kii-base-auth.abstract';
import { KiiApiAuthService } from '../../../_services/kii-api-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSliderChange, MatDialog } from '@angular/material';
import { KiiApiStatsService } from '../../../_services/kii-api-stats.service';
import { StatResult } from '../../../_models/stat';
import * as deepmerge from 'deepmerge';
import { KiiApiLanguageService } from '../../../_services/kii-api-language.service';
import { KiiConfirmDialogComponent } from '../../kii-confirm-dialog/kii-confirm-dialog.component';

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
  socialOverTimeOptions : any = {};
  histoHoursVisitsOptions : any = {};
  referralsOptions : any = {};
  histoPagesOptions : any = {};
  languagesOptions : any = {};
  socialHistoOptions : any = {};
  dayOfWeek : number = 7;
  language : string = this.kiiApiLang.get();
  languagesAvailable : any = this.kiiApiLang.getSupportedLanguages();
  socialTypes : any[] = [];
  social : string = "all";
  axisNames : any = {};

  constructor(private dialog: MatDialog,private trans: TranslateService,private kiiApiLang: KiiApiLanguageService ,private kiiApiStats: KiiApiStatsService,private translate: TranslateService,private kiiApiAuth : KiiApiAuthService,@Inject(PLATFORM_ID) private platformId: any) { super(kiiApiAuth,platformId); }




  ngOnInit() {
    this.addSubscriber(
      this.trans.get(["kiilib.stats.axis.visits", "kiilib.stats.axis.day", "kiilib.stats.axis.day_hours", "kiilib.stats.axis.traffic", "kiilib.stats.axis.page","kiilib.stats.axis.social"]).subscribe(res => {
        this.axisNames = res;
      })
    );
    this.addSubscriber(
      this.kiiApiLang.onChange().subscribe(res => {
        this.addSubscriber(
          this.trans.get(["kiilib.stats.axis.visits", "kiilib.stats.axis.day", "kiilib.stats.axis.day_hours", "kiilib.stats.axis.traffic", "kiilib.stats.axis.page","kiilib.stats.axis.social"]).subscribe(res => {
            this.axisNames = res;
          })
        )
      })
    )
    this.histoHoursVisitsOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: this.axisNames['kiilib.stats.axis.day_hours']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
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
          title: this.axisNames['kiilib.stats.axis.traffic']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
        },
        chartArea: {left:50,right:20,top:10,bottom:200,width: '100%', 'height': '100%'},
      }
    ]);
    this.histoPagesOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          slantedText:true,
          slantedTextAngle:90,
          title: this.axisNames['kiilib.stats.axis.page']
        },
        vAxis: {
          title: this.axisNames['kiilib.stats.axis.visits']
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
          title: this.axisNames['kiilib.stats.axis.visits']
        }
      }
    ]);
    this.socialOverTimeOptions = deepmerge.all([this.defaultChartOptions,
      {
        //curveType: 'function',
        hAxis: {
          title: this.axisNames['kiilib.stats.axis.day'],
          format:'d/M/yy',
          slantedText:true,
          slantedTextAngle:90
        },
        vAxis: {
          title:"Clicks"
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
    this.socialHistoOptions = deepmerge.all([this.defaultChartOptions,
      {
        bar: {
          groupWidth: '90%'
        },
        hAxis:{
          title: this.axisNames['kiilib.stats.axis.social']
        },
        vAxis: {
          title:"Clicks"
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
        Object.keys(res.social_over_day).forEach((social) => {
          //Convert dates into Date objects
          for (let elem of res.social_over_day[social]) {
              elem[0] = new Date(elem[0]);
          }
        });
        this.result = res;
        this.pagesVisitedHistogram = this.result.pages_visited_histogram[this.language];
        this.socialTypes = Object.keys(this.result.social_over_day);
        this.isDataLoading = false;
      },
      () => this.isDataLoading = false)
    )
  }


  /**When we delete all elements */
  onDelete() {
    let dialogRef = this.dialog.open(KiiConfirmDialogComponent, {
      panelClass: "admin-theme",
      data: {title: "kiilib.stats.confirm.title", text: "kiilib.stats.confirm.text"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isDataLoading = true;

        this.addSubscriber(
          this.kiiApiStats.reset().subscribe(res => {
            this.result = new StatResult(null);
            this.isDataLoading = false;
          }, () => this.isDataLoading = false)
        )
      }
    });
  }



}
