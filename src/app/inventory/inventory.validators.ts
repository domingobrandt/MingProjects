import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { InventoryService } from './inventory.service';
import { Key } from 'protractor';
import { resolve, reject } from 'q';

export class InventarioValidator {

    static valorUnico(service: InventoryService): ValidatorFn {
        return (control: AbstractControl): {[key:string]:any} =>{
            if(this.isPresent(Validators.required(control))) return null;
            var v = control.value;
            return new Promise((resolve, reject) => {
                service.getInventory(v).subscribe(
                    data => {
                        if (data.length > 0)
                           resolve({valorUnico:true});
                        else
                           resolve(null);
                     },
                     err => resolve({valorUnico:true})
                )
            })
        }
    }
    static isPresent(obj:any):boolean{
        return obj !== undefined && obj !== null;
    }
}