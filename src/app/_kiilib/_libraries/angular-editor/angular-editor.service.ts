import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {CustomClass} from './config';

export interface UploadResponse {
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AngularEditorService {

  savedSelection: Range | null;
  selectedText: string;
  uploadUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private doc: any
  ) { }

  /**
   * Executed command from editor header buttons exclude toggleEditorMode
   * @param command string from triggerCommand
   */
  executeCommand(command: string) {
    const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
    if (commands.includes(command)) {
      this.doc.execCommand('formatBlock', false, command);
      return;
    }
    this.doc.execCommand(command, false, null);
  }

  /**
   * Create URL link
   * @param url string from UI prompt
   */
  createLink(url: string, className:string) {
      let newUrl : string = "";
      if (className!="default")
        newUrl = '<a href="' + url + '" class="'+className+'">' + this.selectedText + '</a>';
      else
        newUrl = '<a href="' + url + '" >' + this.selectedText + '</a>';

      this.insertHtml(newUrl);
  }

  /**Inserts font awesome icon */
  insertIcon(iconClasses : string) {
    const html = '<i class="'+iconClasses+'"></i>';
    this.insertHtml(html);
  }


  /**
   * insert color either font or background
   *
   * @param color color to be inserted
   * @param where where the color has to be inserted either text/background
   */
  insertColor(color: string, where: string): void {
    const restored = this.restoreSelection();
    if (restored) {
      if (where === 'textColor') {
        this.doc.execCommand('foreColor', false, color);
      } else {
        this.doc.execCommand('hiliteColor', false, color);
      }
    }
  }

  /**
   * Set font name
   * @param fontName string
   */
  setFontName(fontName: string) {
    this.doc.execCommand('fontName', false, fontName);
  }

  /**
   * Set font size
   * @param fontSize string
   */
  setFontSize(fontSize: string) {
    document.execCommand('formatblock', false, 'span');
    try {
    let selectedElement : any = window.getSelection().focusNode.parentNode;
    let value = "14px";
    switch (fontSize) {
      case "1":
        value="0.6em";
        break;
      case "2":
        value="0.8em";
        break;
      case "3":
        value="1em";
        break;
      case "4":
        value="1.2em"      
        break;
      case "5":
        value="1.4em";
        break;
      case "6":
        value="1.8em";
        break;
      case "7":
        value="2em"      
        break;
    }
    console.log("Applying size", value);
    selectedElement.style.fontSize = value;
    } catch(error) {
       console.log(error);
    }
    //console.log("ListId is:", listId);
    //listId..addClass("oder2");
    //  this.doc.execCommand('fontSize', false, fontSize);
  }

  /**
   * Create raw HTML
   * @param html HTML string
   */
  insertHtml(html: string): void {
    const isHTMLInserted = this.doc.execCommand('insertHTML', false, html);
    if (!isHTMLInserted) {
      throw new Error('Unable to perform the operation');
    }
  }

  /**
   * save selection when the editor is focussed out
   */
  public saveSelection = (): void => {
    if (this.doc.getSelection) {
      const sel = this.doc.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        this.savedSelection = sel.getRangeAt(0);
        this.selectedText = sel.toString();
      }
    } else if (this.doc.getSelection && this.doc.createRange) {
      this.savedSelection = document.createRange();
    } else {
      this.savedSelection = null;
    }
  }

  /**
   * restore selection when the editor is focused in
   *
   * saved selection when the editor is focused out
   */
  restoreSelection(): boolean {
    if (this.savedSelection) {
      if (this.doc.getSelection) {
        const sel = this.doc.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.savedSelection);
        return true;
      } else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
        // this.savedSelection.select();
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * setTimeout used for execute 'saveSelection' method in next event loop iteration
   */
  public executeInNextQueueIteration(callbackFn: (...args: any) => any, timeout = 1e2): void {
    setTimeout(callbackFn, timeout);
  }

  /** check any selection is made or not */
  private checkSelection(): any {

    const selectedText = this.savedSelection.toString();

    if (selectedText.length === 0) {
      throw new Error('No Selection Made');
    }
    return true;
  }

  /**
   * Insert image with Url
   * @param imageUrl The imageUrl.
   */
  insertImage(imageUrl: string, altText:string) {
    const html = '<img src="'+imageUrl+'" alt="' +altText+'" style="max-width:100%;object-fit:cover">';
    this.restoreSelection();
    this.doc.execCommand('insertHTML', false, html);
 
  }

  setDefaultParagraphSeparator(separator: string) {
    this.doc.execCommand('defaultParagraphSeparator', false, separator);
  }

  createCustomClass(customClass: CustomClass) {
    let newTag = this.selectedText;
    if (customClass) {
      const tagName = customClass.tag ? customClass.tag : 'span';
      newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
    }
    this.insertHtml(newTag);
  }

  insertVideo(videoUrl: string) {
    this.restoreSelection();
    if (videoUrl.match('youtu.be')) {
      this.insertYouTubeVideoTag(videoUrl);
    }  else if (videoUrl.match('vimeo.com')) {
      this.insertVimeoVideoTag(videoUrl);
    } else {
      this.insertLocalVideo(videoUrl);
    }

  }

  //Local video from local server
  private insertLocalVideo(videoUrl:string) {
    this.restoreSelection();
    const thumbnail = `
    <video controls="" width="100%">
      <source src="${videoUrl}">
    </video>`;
    this.insertHtml(thumbnail);

  }


  private insertYouTubeVideoTag(videoUrl: string): void {
    this.restoreSelection();
    const tmp = videoUrl.split('/');
    const index = tmp.length-1;
    const id = tmp[index]
    const thumbnail = `
        <iframe width="100%" height="480" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;  
    this.insertHtml(thumbnail);
  }

  private insertVimeoVideoTag(videoUrl: string): void {
    const sub = this.http.get<any>(`https://vimeo.com/api/oembed.json?url=${videoUrl}`).subscribe(data => {
      const imageUrl = data.thumbnail_url_with_play_button;
      const thumbnail = `<div>
        <a href='${videoUrl}' target='_blank'>
          <img src="${imageUrl}" alt="${data.title}"/>
        </a>
      </div>`;
      this.insertHtml(thumbnail);
      sub.unsubscribe();
    });
  }

  nextNode(node) {
    if (node.hasChildNodes()) {
      return node.firstChild;
    } else {
      while (node && !node.nextSibling) {
        node = node.parentNode;
      }
      if (!node) {
        return null;
      }
      return node.nextSibling;
    }
  }

  getRangeSelectedNodes(range, includePartiallySelectedContainers) {
    let node = range.startContainer;
    const endNode = range.endContainer;
    let rangeNodes = [];

    // Special case for a range that is contained within a single node
    if (node === endNode) {
      rangeNodes = [node];
    } else {
      // Iterate nodes until we hit the end container
      while (node && node !== endNode) {
        rangeNodes.push( node = this.nextNode(node) );
      }

      // Add partially selected nodes at the start of the range
      node = range.startContainer;
      while (node && node !== range.commonAncestorContainer) {
        rangeNodes.unshift(node);
        node = node.parentNode;
      }
    }

    // Add ancestors of the range container, if required
    if (includePartiallySelectedContainers) {
      node = range.commonAncestorContainer;
      while (node) {
        rangeNodes.push(node);
        node = node.parentNode;
      }
    }

    return rangeNodes;
  }

  getSelectedNodes() {
    const nodes = [];
    if (this.doc.getSelection) {
      const sel = this.doc.getSelection();
      for (let i = 0, len = sel.rangeCount; i < len; ++i) {
        nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
      }
    }
    return nodes;
  }

  replaceWithOwnChildren(el) {
    const parent = el.parentNode;
    while (el.hasChildNodes()) {
      parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
  }

  removeSelectedElements(tagNames) {
    const tagNamesArray = tagNames.toLowerCase().split(',');
    this.getSelectedNodes().forEach((node) => {
      if (node.nodeType === 1 &&
        tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
        // Remove the node and replace it with its children
        this.replaceWithOwnChildren(node);
      }
    });
  }
}
