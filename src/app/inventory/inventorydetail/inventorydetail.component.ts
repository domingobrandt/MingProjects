import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router'; 
import { InventoryService } from '../inventory.service';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { InventarioValidator } from "../inventory.validators";
import { Inventory } from '../inventory';
@Component({
  selector: 'app-inventorydetail',
  templateUrl: './inventorydetail.component.html',
  styleUrls: ['./inventorydetail.component.scss'],
  providers: [InventoryService]
})
export class InventorydetailComponent implements OnInit {

  titulo = "Formulario";
  form: FormGroup;
  inventory:Inventory[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService,
    private fb: FormBuilder
    ) { this.crearControles() }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (!id) return
    this.service.getInventory(id)
                .subscribe(
                  rs => this.inventory = rs,
                  er => console.log('Error: %s', er),
                  () => {
                    if(this.inventory.length > 0){
                      this.form.patchValue({
                        id_pro: this.inventory[0].id_pro,
                        producto: this.inventory[0].producto,
                        stock: this.inventory[0].stock,
                        precio: this.inventory[0].precio,
                        id_prov: this.inventory[0].id_prov
                      })
                    }
                  }
                )
               
    console.log(id);
  }

  crearControles(){
    this.form = this.fb.group({
       id_pro:['', Validators.required,InventarioValidator.valorUnico(this.service)],
       producto:['', Validators.compose([
        Validators.required,
        Validators.maxLength(18)
     ])],
       stock:['', Validators.required],
       precio:['', Validators.required],
       id_prov:['', Validators.required]
    })
  }
  guardarInventario(){
    this.service.addInventory(this.form.value)
                .subscribe(
                  rt => console.log(rt),
                  er => console.log(er),
                  () => console.log('terminado')
                );
  }
  limpiarFormulario() {
    this.form.reset();
  }

}
