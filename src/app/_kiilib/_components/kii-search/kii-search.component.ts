import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Subject,of } from 'rxjs';
import { KiiBaseAbstract } from '../../_abstracts/kii-base.abstract';
import {debounceTime, delay, distinctUntilChanged, flatMap, map, tap,mergeMap} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'kii-search',
  templateUrl: './kii-search.component.html',
  styleUrls: ['./kii-search.component.scss']
})
export class KiiSearchComponent extends KiiBaseAbstract implements OnInit {
  keyUp = new Subject<string>();
  valueSearch : string = "";

  /**Contains the data to be filtered */
  @Input() data : any[] = [];

  /**Elements per page */
  @Input() itemsPage : number = 12;

  /**Current selected page */
  currentPage:number = 1;

  /**Number of lastPage */
  lastPage:number=1;

  /**Contains the result of the search */
  @Output() result = new EventEmitter<any[]>();  

  /**Contains the current search */
  currentSearch : string = "";

  _dataSource;

  constructor() { super() }


  ngOnChanges(changes:SimpleChanges) {
    if (changes.data) { 
      this.data = changes.data.currentValue;
      this._dataSource = new MatTableDataSource(this.data);
      this.setFilter();
      this.result.emit(this.getPagedElements(this._dataSource.data));
    }
  }

  ngOnInit() {
    this._dataSource = new MatTableDataSource(this.data);
    this.setFilter();
    this.resetSearch();
    this.addSubscriber(
      this.keyUp.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(search => of(search).pipe(
          delay(100),
        )),
      ).subscribe(res => {
        this.currentPage = 1;
        this.applyFilter(res);
        this.currentSearch = res;
      })
    )
  }

  /**Remove any search */
  resetSearch() {
    this.valueSearch = "";
    this.currentSearch = "";
    this.currentPage = 1;
    this.result.emit(this.getPagedElements(this._dataSource.data));
  }

  /**Applies the search filter */
  applyFilter(filterValue:string) {
    if(filterValue!== null) {
      this._dataSource.filter = filterValue.trim().toLowerCase();
      this._dataSource.filteredData.sort((a, b) => b.fweight - a.fweight); //Sort by matching criteria
      this.result.emit(this.getPagedElements(this._dataSource.filteredData));
   } 


  }

  /**Sets filtering criteria */
  setFilter() {
    let obj = this;
    this._dataSource.filterPredicate = function(data, filter: string): boolean {
      //Do not process when two short filter
      if (filter.length<=1) {
        data.fweight = 0;
        return true;
      }
      let weight = 0;
      let words = filter.split(" ");
      for (let word of words) {
        if(word.length>1) {  //Only process from two letters
            word = word.toLowerCase();
            weight = weight + obj._find(data.title,word)*2;
            weight = weight + obj._find(data.description,word)*1;
        }
      }
      data.fweight = weight;  //Add weight of search in data
      if (weight>0)
       return true;
      else
       return false; 
    };
  }

  private _find(str, find) {
    let regex = new RegExp(find, "i"),result=false;
    return regex.exec(str)==null?0:1;
  }


  getPagedElements(elements:any[]) {

    //Calculate lastPage
    this.lastPage = Math.floor(elements.length/this.itemsPage);
    if (elements.length/this.itemsPage > this.lastPage) {
      this.lastPage = this.lastPage + 1;
    }

    let indexRight = (this.currentPage * this.itemsPage);
    let indexLeft = indexRight - this.itemsPage;
    indexRight = indexRight - 1;
    //When page is full
    if (elements.length-1>= indexRight) {
      return elements.slice(indexLeft,indexRight+1);
    } else {
      return elements.slice(indexLeft,elements.length)
    }
  }

  nextPage() {

    this.currentPage = this.currentPage+1;
    this.applyFilter(this.currentSearch);
  }

  previousPage() {
    this.currentPage = this.currentPage-1;
    if (this.currentPage<1) this.currentPage = 1;
    this.applyFilter(this.currentSearch);
  }


}