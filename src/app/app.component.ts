import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kiiweb';
  constructor(private translate : TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang(environment.languages[0]);
    this.translate.use(environment.languages[0]);
  }
  setLang(lang:string) {
    this.translate.use(lang);
  }
}

