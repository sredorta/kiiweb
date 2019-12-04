// animations.ts
import { trigger, state, style, transition, animate, keyframes, query,stagger } from '@angular/animations';

export class KiiAinimations {

    //Animation for contact elements
    public static contact() {
        return [
            trigger('contactAnimation', [
                state('collapsed', style({opacity:0.1})),
                state('expanded', style({opacity:1})),
                transition('expanded <=> collapsed', animate('.5s .3s cubic-bezier(0.4, 0.0, 0.2, 1)')),
              ]),
        ]
    };

    //Animation for blog elements
    public static blog() {
        return [
            trigger('blogAnimation', [
                transition('* <=> *', [ 
                    query('.element', style({transform:'scale(0)'}),{optional:true}),
                    query('.element', stagger('0.5s', [animate('0.5s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };


    //Animation for prices elements
    public static prices() {
        return [
            trigger('pricesAnimation', [
                transition('* <=> *', [ 
                    query('.element', style({opacity:0.1,transform: 'translateX(-100vw)'}),{optional:true}),
                    query('.element', stagger('1s', [animate('1s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };

    public static realisations() {
        return [
            trigger('realisationsAnimation', [
                transition('* <=> *', [ 
                    query('.element, .element-comment', style({opacity:0.1,transform: 'translateX(-100vw)'}),{optional:true}),
                    query('.element, .element-comment', stagger('1s', [animate('1s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };
    //Animation for demo elements
    public static demo() {
        return [
            trigger('demoAnimation', [
                transition('* <=> *', [ 
                    query('.element', style({transform:'scale(0)'}),{optional:true}),
                    query('.element', stagger('0.5s', [animate('0.5s  ease-in-out')]),{optional:true})
                ])
            ])
        ]
    };
}
