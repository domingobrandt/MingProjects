import { 
    animate, state, style, transition, trigger, AnimationTriggerMetadata } 
 from '@angular/animations';

 export const slide: AnimationTriggerMetadata =
    trigger('routeAnimation',[
       state('*',
          style({
             opacity: 1,
             transform: 'translateX(0)'
          })
       ),
       transition(':enter',[
          style({
             opacity: 0,
             transform: 'translateX(-100%)'
          }),
          animate('0.3s ease-in')
       ]),
       transition(':leave', [
          animate('0.3s ease-out', style({
             opacity: 0,
             transform: 'translateX(100%)'
          }))
       ])
    ]);