import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InventoryComponent }  from './inventory.component';
import { InventorylistComponent }    from './inventorylist/inventorylist.component';
import { InventorydetailComponent }  from './inventorydetail/inventorydetail.component';
import { InventoryService } from './inventory.service';
import { InventaryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    InventoryComponent,InventorydetailComponent,
    InventorylistComponent,
    
  ],
  imports: [
    CommonModule,
    InventaryRoutingModule,
    HttpModule,ReactiveFormsModule
    ],
 
  providers: [InventoryService],

  exports: [
    InventoryComponent,InventorydetailComponent,
    InventorylistComponent
 ]
  
})
export class InventoryModule { }
