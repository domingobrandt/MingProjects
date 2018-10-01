import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router'; 

@Component({
  selector: 'app-inventorydetail',
  templateUrl: './inventorydetail.component.html',
  styleUrls: ['./inventorydetail.component.scss']
})
export class InventorydetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (!id) return
    console.log(id);
  }

}
