import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router'; 
import { InventoryService } from '../inventory.service';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { InventarioValidator } from "../inventory.validators";
import { Inventory } from '../inventory';
import { slide } from '../animations';

@Component({
  selector: 'app-inventorydetail',
  templateUrl: './inventorydetail.component.html',
  styleUrls: ['./inventorydetail.component.scss'],
  providers: [InventoryService],
  animations: [slide]

})
export class InventorydetailComponent implements OnInit {

  titulo = "";
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
  form: FormGroup;
  inventory:Inventory[];
  esEdicion = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (!id) {
    this.titulo = "Agregar un nuevo registro";
    this.crearControlesNuevo();
    return
    }

    this.titulo = "Edición del registro";
    this.crearControlesEditar();
    this.service.getInventory(id)
                .subscribe(
                  rs => this.inventory = rs,
                  er => console.log('Error: %s', er),
                  () => {
                    if(this.inventory.length > 0){
                      this.esEdicion=true; 
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

  crearControlesNuevo(){
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
  crearControlesEditar(){
    this.form = this.fb.group({
       id_pro:['', Validators.required],
       producto:['', Validators.compose([
        Validators.required,
        Validators.maxLength(18)
     ])],
       stock:['', Validators.required],
       precio:['', Validators.required],
       id_prov:['', Validators.required]
    })
  }
  
  guardarInventario() {
    if (this.esEdicion) {
       this.updateInventory(this.form.value);
    } else {
       this.agregarInventario(this.form.value);
    }
 }

  agregarInventario(inventory:Inventory){
    this.service.addInventory(inventory)
                .subscribe(
                  rt => console.log(rt),
                  er => console.log(er),
                  () => console.log('terminado')
                );
  }
  updateInventory(inventory:Inventory){
    if(!inventory) return;
    this.service.putInventory(inventory)
                .subscribe(
                   rt => console.log(rt),
                   er => console.log(er),
                   () => this.goList()
                )
  }
  limpiarFormulario() {
    this.form.reset();
  }

  goList(){
    let link = ['/inventory/list'];
    this.router.navigate(link);
  }

}
