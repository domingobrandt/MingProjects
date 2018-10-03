import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router'; 
import { InventoryService } from '../inventory.service';
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';

@Component({
  selector: 'app-inventorydetail',
  templateUrl: './inventorydetail.component.html',
  styleUrls: ['./inventorydetail.component.scss'],
  providers: [InventoryService]
})
export class InventorydetailComponent implements OnInit {

  titulo = " Agregar un nuevo registro";
  form: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService,
    private fb: FormBuilder
    ) { this.crearControles }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (!id) return
    console.log(id);
  }
  
  crearControles(){
    this.form = this.fb.group({
       id_pro:'',
       producto:'',
       stock:'',
       precio:'',
       id_prov:''
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

}
