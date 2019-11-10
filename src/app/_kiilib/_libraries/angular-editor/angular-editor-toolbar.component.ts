import {Component, ElementRef, EventEmitter, Inject, Output, Renderer2, ViewChild, Input, NgZone} from '@angular/core';
import {AngularEditorService} from './angular-editor.service';
import {HttpResponse} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {CustomClass} from './config';
import {SelectOption} from './ae-select/ae-select.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { KiiVideoGalleryDialogComponent } from '../../_components/kii-video-gallery-dialog/kii-video-gallery-dialog.component';
import { KiiImageGalleryDialogComponent } from '../../_components/kii-image-gallery-dialog/kii-image-gallery-dialog.component';
import { DiskType } from '../../_services/kii-api-disk.service';
import { KiiLinkDialogComponent } from '../../_components/kii-link-dialog/kii-link-dialog.component';

@Component({
  selector: 'angular-editor-toolbar',
  templateUrl: './angular-editor-toolbar.component.html',
  styleUrls: ['./angular-editor-toolbar.component.scss']
})

export class AngularEditorToolbarComponent {
  id = '';
  htmlMode = false;
  showToolbar = true;
  linkSelected = false;
  block = 'default';
  fontName;
  fontSize = '3';
  foreColour;
  backColor;

  headings: SelectOption[] = [
    {
      label: 'Heading 1',
      value: 'h1',
    },
    {
      label: 'Heading 2',
      value: 'h2',
    },
    {
      label: 'Heading 3',
      value: 'h3',
    },
    {
      label: 'Heading 4',
      value: 'h4',
    },
    {
      label: 'Heading 5',
      value: 'h5',
    },
    {
      label: 'Heading 6',
      value: 'h6',
    },
    {
      label: 'Heading 7',
      value: 'h7',
    },
    {
      label: 'Paragraph',
      value: 'p',
    },
    {
      label: 'Heading 7',
      value: 'h7',
    },
    {
      label: 'Predefined',
      value: 'pre'
    },
    {
      label: 'Standard',
      value: 'div'
    },
    {
      label: 'default',
      value: 'default'
    }
  ];

  fonts: SelectOption[] = [{label: '', value: ''}];
  fontSizes: SelectOption[] = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    }
  ];

  customClassId = '-1';
  customClasses: CustomClass[];
  customClassList: SelectOption[] = [{label: '', value: ''}];
  uploadUrl: string;

  tagMap = {
    BLOCKQUOTE: 'indent',
    A: 'link'
  };

  select = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'PRE', 'DIV'];

  buttons = ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'justifyLeft', 'justifyCenter',
    'justifyRight', 'justifyFull', 'indent', 'outdent', 'insertUnorderedList', 'insertOrderedList', 'link'];

  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  @Output() backgroundChange : EventEmitter<string> = new EventEmitter<string>();

  @Input() disk : DiskType = DiskType.CONTENT;

  //@ViewChild('fileInput', {static: false}) myInputFile: ElementRef;

  public get isLinkButtonDisabled(): boolean {
    return this.htmlMode || !Boolean(this.editorService.selectedText);
  }

  constructor(
    private dialog: MatDialog,
    private r: Renderer2,
    private editorService: AngularEditorService,
    @Inject(DOCUMENT) private doc: any
  ) {
  }

  /**
   * Trigger command from editor header buttons
   * @param command string from toolbar buttons
   */
  triggerCommand(command: string) {
    this.execute.emit(command);
  }

  /**
   * highlight editor buttons when cursor moved or positioning
   */
  triggerButtons() {
    if (!this.showToolbar) {
      return;
    }
    this.buttons.forEach(e => {
        const result = this.doc.queryCommandState(e);
        const elementById = this.doc.getElementById(e + '-' + this.id);
        if (result) {
          this.r.addClass(elementById, 'active');
        } else {
          this.r.removeClass(elementById, 'active');
        }
    });
  }

  /**
   * trigger highlight editor buttons when cursor moved or positioning in block
   */
  triggerBlocks(nodes: Node[]) {
    if (!this.showToolbar) {
      return;
    }
    this.linkSelected = nodes.findIndex(x => x.nodeName === 'A') > -1;
    let found = false;
    this.select.forEach(y => {
      const node = nodes.find(x => x.nodeName === y);
      if (node !== undefined && y === node.nodeName) {
        if (found === false) {
          this.block = node.nodeName.toLowerCase();
          found = true;
        }
      } else if (found === false) {
        this.block = 'default';
      }
    });

    found = false;
    if (this.customClasses) {
      this.customClasses.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.customClassId = index.toString();
            found = true;
          }
        } else if (found === false) {
          this.customClassId = '-1';
        }
      });
    }

    Object.keys(this.tagMap).map(e => {
      const elementById = this.doc.getElementById(this.tagMap[e] + '-' + this.id);
      const node = nodes.find(x => x.nodeName === e);
      if (node !== undefined && e === node.nodeName) {
        this.r.addClass(elementById, 'active');
      } else {
        this.r.removeClass(elementById, 'active');
      }
    });

    this.foreColour = this.doc.queryCommandValue('ForeColor');
    //this.fontSize = this.doc.queryCommandValue('FontSize');
    this.fontName = this.doc.queryCommandValue('FontName').replace(/"/g, '');
    this.backColor = this.doc.queryCommandValue('backColor');
  }




  /**
   * insert URL link
   */
  insertUrl() {    
    let url = 'https:\/\/';
    const selection = this.editorService.savedSelection;
    if (selection && selection.commonAncestorContainer.parentElement.nodeName === 'A') {
      const parent = selection.commonAncestorContainer.parentElement as HTMLAnchorElement;
      if (parent.href !== '') {
        url = parent.href;
      }
    }
    let dialogRef = this.dialog.open(KiiLinkDialogComponent, {
      panelClass: 'admin-theme',
      data:  {disk:this.disk},
      minWidth:'310px',

    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.editorService.restoreSelection();
        this.editorService.createLink(res.url.result, res.class);
      }
    });
  }

  /**
   * insert Video link
   */
  insertVideo() {
    this.execute.emit('');
    //Open dialog that shows the video gallery
    let dialogRef = this.dialog.open(KiiVideoGalleryDialogComponent, {
      panelClass: 'admin-theme',
      data:  {disk:this.disk},
      minWidth:'320px'
    });
    dialogRef.afterClosed().subscribe(url => {
      if (url && url !== '' && url !== `https://`) {
        this.editorService.insertVideo(url);
      }
    });
  }

  /**Inserts image using gallery */
  insertImage() {
    let dialogRef = this.dialog.open(KiiImageGalleryDialogComponent, {
      panelClass: 'admin-theme',
      data: {disk:this.disk, hasAltText:true},
      minWidth:'320px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editorService.insertImage(result.url, result.alt, result.size);
    });
  }

  /**Inserts background image using gallery */
  insertImageBackground() {
    let dialogRef = this.dialog.open(KiiImageGalleryDialogComponent, {
      panelClass: 'admin-theme',
      data:  {disk:this.disk, hasAltText:false},
      minWidth:'320px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backgroundChange.emit(result.url);
      }
    });
  }

  /**Removes background image */
  removeImageBackground() {
    this.backgroundChange.emit(null);
  }


  /** insert color */
  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    this.execute.emit('');
  }

  /**
   * set font Name/family
   * @param foreColor string
   */
  setFontName(foreColor: string): void {
    this.editorService.setFontName(foreColor);
    this.execute.emit('');
  }

  /**
   * set font Size
   * @param fontSize string
   */
  setFontSize(fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit('');
  }

  /**
   * toggle editor mode (WYSIWYG or SOURCE)
   * @param m boolean
   */
  setEditorMode(m: boolean) {
    const toggleEditorModeButton = this.doc.getElementById('toggleEditorMode' + '-' + this.id);
    if (m) {
      this.r.addClass(toggleEditorModeButton, 'active');
    } else {
      this.r.removeClass(toggleEditorModeButton, 'active');
    }
    this.htmlMode = m;
  }



  /**
   * Set custom class
   */
  setCustomClass(classId: string) {
    if (classId === '-1') {
      this.execute.emit('clear');
    } else {
      this.editorService.createCustomClass(this.customClasses[+classId]);
    }
  }
}
