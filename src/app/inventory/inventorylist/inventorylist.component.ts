import { Component, OnInit } from '@angular/core';
import { Inventory } from "../inventory";
import { InventoryService } from "../inventory.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrls: ['./inventorylist.component.scss']
})

export class InventorylistComponent implements OnInit {

  list: Inventory[];

  constructor( private router: Router,
    private service: InventoryService) { }

  ngOnInit() {
    this.service.getInventory()
    .subscribe(
        rs => this.list = rs,
        er => console.log(er),
        () => console.log(this.list)
    )
  }
 


  
}