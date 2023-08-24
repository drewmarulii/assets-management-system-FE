import { Component, OnInit } from "@angular/core";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { SupplierService } from "../../../services/supplier.service";

@Component({
    selector: 'supplier-list',
    templateUrl: './supplier-list.component.html'
})
export class SupplierListComponent implements OnInit {

    visible : boolean = false
    suppliers! : SupplierResDto[]

    constructor(private supplierService : SupplierService) { }

    ngOnInit(): void {
        this.supplierService.getAllSuppliers()
            .subscribe((res) => {
                this.suppliers = res
            })
    }

    showDialog() {
        this.visible = true
    }
}