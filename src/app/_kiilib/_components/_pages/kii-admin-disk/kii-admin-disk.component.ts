import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskResult } from '../../../_services/kii-api-disk.service';
import * as deepmerge from 'deepmerge';



@Component({
  selector: 'kii-admin-disk',
  templateUrl: './kii-admin-disk.component.html',
  styleUrls: ['./kii-admin-disk.component.scss']
})


export class KiiAdminDiskComponent extends KiiBaseAbstract implements OnInit {

  isDataLoading : boolean = true;
  result : DiskResult = new DiskResult(null);
  pieOptionsMain : any = {};
  pieOptions : any = {};


  /**Default options for google charts */
  defaultChartOptions : any = {
    backgroundColor:'#212121',
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
    chartArea: {left:0,right:0,top:10,bottom:20,width: '100%', 'height': '100%'},
    titleTextStyle: {
      color:'white',
      fontSize:18,
      bold:true
    },
  }




  constructor(private kiiApiDisk: KiiApiDiskService) {super() }

  ngOnInit() {

    this.pieOptions = deepmerge.all([this.defaultChartOptions,
      {
        colors:['#558B2F','#7CB342','#9CCC65','#C5E1A5','#F1F8E9'], 
        pieSliceTextStyle: {
          color: 'white',
        },
      }
    ]); 
    this.pieOptionsMain = deepmerge.all([this.defaultChartOptions,
      {
        colors:['#558B2F','#757575','#757575'], 
        pieHole:0.4,
        pieSliceTextStyle: {
          color: 'white',
        },
      }
    ]); 
    this.addSubscriber(
      this.kiiApiDisk.scan().subscribe(res => {
        this.result = res;
        this.isDataLoading = false;
      },()=> this.isDataLoading = false)
    )
  }

  /**When we ask for optimize disk */
  onDelete() {
    this.isDataLoading = true;
    this.kiiApiDisk.optimize().subscribe(res => {
      this.result = res;
      this.isDataLoading = false;
    },()=> this.isDataLoading = false)
  }

}
