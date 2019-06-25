import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { KiiBottomSheetSoftwareUpdateComponent } from '../_components/kii-bottom-sheet-software-update/kii-bottom-sheet-software-update.component';
import { isPlatformBrowser } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class KiiMiscService {


  constructor() { }

}
