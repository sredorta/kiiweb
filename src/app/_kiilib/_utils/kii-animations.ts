// animations.ts
import { trigger, state, style, transition, animate, keyframes, query,stagger } from '@angular/animations';

export class KiiAinimations {

    //Animation for contact elements
    public static contact() {
        return [
            trigger('contactAnimation', [
                transition('* <=> *', [ 
                    query('.element', style({opacity:0.1,transform: 'translateX(100vw)'}),{optional:true}),
                    query('.element', stagger('1s', [animate('1s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };

    //Animation for blog elements
    public static blog() {
        return [
            trigger('blogAnimation', [
                transition('* <=> *', [ 
                    query('.element', style({transform:'scale(0)'}),{optional:true}),
                    query('.element', stagger('0.2s', [animate('0.5s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };


    //Animation for prices elements
    public static prices() {
        return [
            trigger('pricesAnimation', [
                transition('* <=> *', [ 
                    query('.kii-element-wrapper', style({opacity:0.1,transform: 'translateX(100vw)'}),{optional:true}),
                    query('.kii-element-wrapper', stagger('1s', [animate('1s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };

    public static realisations() {
        return [
            trigger('realisationsAnimation', [
                transition('* <=> *', [ 
                    query('.kii-element-wrapper', style({opacity:0.1,transform: 'translateX(100vw)'}),{optional:true}),
                    query('.kii-element-wrapper', stagger('0.5s', [animate('1s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };
    public static realisationsComments() {
        return [
            trigger('realisationsCommentsAnimation', [
                transition('* <=> *', [ 
                    query('kii-article-summary', style({opacity:0.1,transform: 'translateY(100vw)'}),{optional:true}),
                    query('kii-article-summary', stagger('1s', [animate('2s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };
    //Animation for demo elements
    public static demo() {
        return [
            trigger('demoAnimation', [
                transition('* <=> *', [ 
                    query('.kii-element-wrapper', style({transform:'scale(0)'}),{optional:true}),
                    query('.kii-element-wrapper', stagger('0.5s', [animate('0.5s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };
}
