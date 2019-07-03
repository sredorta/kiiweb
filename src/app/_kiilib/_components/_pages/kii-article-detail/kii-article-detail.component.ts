import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kii-article-detail',
  templateUrl: './kii-article-detail.component.html',
  styleUrls: ['./kii-article-detail.component.scss']
})
export class KiiArticleDetailComponent extends KiiBaseAbstract implements OnInit {

  /**Id of the article that we want to display */
  id:number;

  constructor(private route: ActivatedRoute) { super()}

  ngOnInit() {
    this.addSubscriber(
      this.route.params.subscribe(params => {
          console.log(params);
          this.id = +params['id']; // (+) converts string 'id' to a number
          console.log("showing details for article id : " + this.id);
      })
    )
  }

}
