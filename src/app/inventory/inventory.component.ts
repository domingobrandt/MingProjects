import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    trigger('animacion', [
        state('inactive', style({
            transform: 'scale(1)'
        })),
        state('active', style({
            backgroundColor: '#cfd8dc',
            transform: 'scale(1.1)'
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
    ])
]
})
export class InventoryComponent implements OnInit {
  estado1 = "inactive";
  estado2 = "inactive";
  constructor() { }

  ngOnInit() {
  }

}
