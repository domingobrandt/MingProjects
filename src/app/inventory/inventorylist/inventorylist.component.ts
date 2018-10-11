import { Component, OnInit, HostBinding } from '@angular/core';
import { Inventory } from "../inventory";
import { InventoryService } from "../inventory.service";
import { Router } from '@angular/router';
import { slide } from '../animations';


@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrls: ['./inventorylist.component.scss'],
  animations: [slide]
  //viewProvider: [InventoryService]
  
})

export class InventorylistComponent implements OnInit {

  list: Inventory[];
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


  constructor( private router: Router,
    private service: InventoryService) { }

  ngOnInit() {
    this.service.getInventories()
    .subscribe(
        rs => this.list = rs,
        er => console.log(er),
        () => console.log(this.list)
    )
  }
  Editar(item:Inventory){
    let link = ["inventory/detail", item.id_pro];
    this.router.navigate(link);
  }

  Borrar(item:Inventory){
    if(!item) return;
    this.service.delInventory(item.id_pro)
      .subscribe(
        rs => console.log(rs),
        er => console.log(er),
        () => {
          this.list = this.list.filter(h => h !== item)
      }
      )
  }


  
}