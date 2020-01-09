import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ActivatedRouteSnapshot, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'kubiiks';
  currentPath :string = null;
  constructor(private activatedRoute:ActivatedRoute,private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        if (data.state.root.firstChild && data.state.root.firstChild.firstChild && data.state.root.firstChild.firstChild.data && data.state.root.firstChild.firstChild.data.localizeRouter && data.state.root.firstChild.firstChild.data.localizeRouter.path) {
          console.log(data.state.root.firstChild.firstChild.data.localizeRouter.path);
          this.currentPath = data.state.root.firstChild.firstChild.data.localizeRouter.path;
        }
      }
    });
  }

}

