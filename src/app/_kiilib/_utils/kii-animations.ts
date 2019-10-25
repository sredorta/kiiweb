// animations.ts
import { trigger, state, style, transition, animate, keyframes, query,stagger } from '@angular/animations';

export class KiiAinimations {


    //Animation for blog elements
    public static blog() {
        return [
            // Trigger animation cards array
            trigger('blogAnimation', [
            // Transition from any state to any state
            transition('* => *', [
                // Initially the all cards are not visible
                query(':enter', style({ opacity: 0 }), { optional: true }),

                // Each card will appear sequentially with the delay of 300ms
                query(':enter', stagger('500ms', [
                animate('.5s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                ]))]), { optional: true }),

                // Cards will disappear sequentially with the delay of 300ms
                query(':leave', stagger('500ms', [
                animate('500ms ease-out', keyframes([
                    style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                    style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
                ]))]), { optional: true })
            ]),
            ])
        ]
    };


    //Animation for prices elements
    public static prices() {
        return [
            // Trigger animation cards array
            trigger('pricesAnimation', [
            // Transition from any state to any state
            transition('* => *', [
                // Initially the all cards are not visible
                query(':enter', style({ opacity: 0 }), { optional: true }),

                // Each card will appear sequentially with the delay of 300ms
                query(':enter', stagger('500ms', [
                animate('.5s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                ]))]), { optional: true }),

                // Cards will disappear sequentially with the delay of 300ms
                query(':leave', stagger('500ms', [
                animate('500ms ease-out', keyframes([
                    style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                    style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
                ]))]), { optional: true })
            ]),
            ])
        ]
    };

    public static realisations() {
        return [
            // Trigger animation cards array
            trigger('realisationsAnimation', [
            // Transition from any state to any state
            transition('* => *', [
                // Initially the all cards are not visible
                query(':enter', style({ opacity: 0 }), { optional: true }),

                // Each card will appear sequentially with the delay of 300ms
                query(':enter', stagger('500ms', [
                animate('.5s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateY(-10px) scale(1.1)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                ]))]), { optional: true }),

                // Cards will disappear sequentially with the delay of 300ms
                query(':leave', stagger('500ms', [
                animate('500ms ease-out', keyframes([
                    style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
                    style({ opacity: .5, transform: 'scale(.5)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'scale(0)', offset: 1 }),
                ]))]), { optional: true })
            ]),
            ])
        ]
    };

}