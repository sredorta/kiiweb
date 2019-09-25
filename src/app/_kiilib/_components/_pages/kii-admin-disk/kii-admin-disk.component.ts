import { Component, OnInit } from '@angular/core';
import { KiiBaseAbstract } from '../../../_abstracts/kii-base.abstract';
import { KiiApiDiskService, DiskType } from 'src/app/_kiilib/_services/kii-api-disk.service';

@Component({
  selector: 'kii-admin-disk',
  templateUrl: './kii-admin-disk.component.html',
  styleUrls: ['./kii-admin-disk.component.scss']
})
export class KiiAdminDiskComponent extends KiiBaseAbstract implements OnInit {

  constructor(private kiiApiDisk: KiiApiDiskService) {super() }

  ngOnInit() {
    this.addSubscriber(
      this.kiiApiDisk.scan(DiskType.IMAGES).subscribe(res => {
        console.log("Recieved result",res);
      })
    )
  }

}
