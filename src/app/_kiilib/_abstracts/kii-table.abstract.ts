import { ViewChild } from '@angular/core';
import { KiiBaseAbstract } from '../_abstracts/kii-base.abstract';
import {MatTable, MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Subject } from 'rxjs';
import {debounceTime, delay, distinctUntilChanged,mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';


export  class KiiTableAbstract extends KiiBaseAbstract  {
    /**Show spinner loading while doing the api call to get table contents */
    isDataLoading : boolean = true;
    /**Stores all data of the table */
    dataSource = null;         
    /**List of strings containing each column we want to display in the table */
    displayedColumns: string[] = [];
    /** Observer that is used when we write on the search to debounce */
    keyUp = new Subject<string>();
    /** Current search string */
    searchString : string = "";
  
    /**Reference to the matTable */
    @ViewChild(MatTable, {static:false}) table : MatTable<any>;
    /**Reference to the paginator */   
    @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;
    /**Reference to the MatSort element */
    @ViewChild(MatSort, {static:false}) sort: MatSort;

    /**Initializes the table with all the data and subscribes to the keyUp of the search */
    initTable(data : any[]) {
        if (data != null) {
            this.dataSource = new MatTableDataSource([...data]);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.applyFilter(this.searchString);
        }
        //Subscribe to search keyup
        this.addSubscriber(
            this.keyUp.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            mergeMap(search => of(search).pipe(
                delay(100),
            )),
            ).subscribe(res => {
            this.searchString = res;
            this.applyFilter(res);
            })
        )
    }

    /**Applies the current filter string to the dataSource */
    applyFilter(filterValue: string) {
        if(filterValue!== null) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
         } 
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    /**Deletes a row from the table by providing the id */
    deleteRow(id:number) {
        const itemIndex = this.dataSource.data.findIndex(obj => obj.id == id);
        this.dataSource.data.splice(itemIndex, 1);
        this.dataSource.paginator = this.paginator;
        this.table.renderRows();
    }

}