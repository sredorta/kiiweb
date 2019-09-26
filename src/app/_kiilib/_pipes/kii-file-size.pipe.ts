import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kiiFileSize'
})
export class KiiFileSizePipe implements PipeTransform {

  private units = [
    'B',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];

  transform(bytes: number = 0, precision: number = 2 ) : string {
    if (!isFinite(bytes))  return '?';

    let unit = 0;

    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    if (unit == 0) precision = 0;
    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }

}

