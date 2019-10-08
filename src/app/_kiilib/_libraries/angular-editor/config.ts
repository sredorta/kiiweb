export interface CustomClass {
  name: string;
  class: string;
  tag?: string;
}

export interface Font {
  name: string;
  class: string;
}

export interface AngularEditorConfig {
  editable?: boolean;
  spellcheck?: boolean;
  height?: 'auto' | string;
  minHeight?: '0' | string;
  maxHeight?: 'auto' | string;
  width?: 'auto' | string;
  minWidth?: '0' | string;
  translate?: 'yes' | 'now' | string;
  enableToolbar?: boolean;
  showToolbar?: boolean;
  placeholder?: string;
  defaultParagraphSeparator?: string;
  defaultFontName?: string;
  defaultFontSize?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | string;
  uploadUrl?: string;
  fonts?: Font[];
  customClasses?: CustomClass[];
  sanitize?: boolean;
  toolbarPosition?: 'top' | 'bottom';
}

export const angularEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '3',
  fonts: [
    {class: 'font-arial', name: 'Arial'},
    {class: 'font-arial-black', name: 'Arial Black'},
    {class: 'font-comic-sans-ms', name: 'Comic Sans MS'},
    {class: 'font-impact', name: 'Impact'},
    {class: 'font-lucida', name: 'Lucida Sans Unicode'},
    {class: 'font-thaoma', name: 'Tahoma'},
    {class: 'font-trebuchet-ms', name: 'Trebuchet MS'},
    {class: 'font-verdana', name: 'Verdana'},
    {class: 'font-georgia', name: 'Georgia'},
    {class: 'font-palatino-linotype', name: 'Palatino Linotype'},
    {class: 'font-times-new-roman', name: 'Times New Roman'},
    {class: 'font-courier-new', name: 'Courier New'},
    {class: 'font-lucida-console', name: 'Lucida Console'},
  ],
  uploadUrl: 'v1/image',
  sanitize: true,
  toolbarPosition: 'top',
};
