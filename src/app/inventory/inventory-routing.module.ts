
import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { InventoryComponent }         from './inventory.component';
import { InventorylistComponent } from './inventorylist/inventorylist.component';
import { InventorydetailComponent } from './inventorydetail/inventorydetail.component';


const inventaryRoutes: Routes = [
    {path: 'inventory', component: InventoryComponent,
        children: [
           { path: '', redirectTo: 'list', pathMatch: 'full' },
           { path: 'list', component: InventorylistComponent },
           { path: 'detail', component: InventorydetailComponent },
           { path: 'detail/:id', component: InventorydetailComponent },
        ]},
 ];
 
 @NgModule({
    imports: [RouterModule.forChild(inventaryRoutes)],
    exports: [RouterModule],
 })
 export class InventaryRoutingModule { }