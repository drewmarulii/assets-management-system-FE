import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { SupplierResDto } from "../dto/supplier/supplier.res.dto";
import { SupplierInsertReqDto } from "../dto/supplier/supplier-insert.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class SupplierService {

    constructor(private base: BaseService) { }

    getAllSuppliers(): Observable<SupplierResDto[]> {
        return this.base.get<SupplierResDto[]>('http://localhost:8080/suppliers', true)
    }

    insertSupplier(data : SupplierInsertReqDto) : Observable<SupplierInsertReqDto> {
        return this.base.post<SupplierInsertReqDto>('http://localhost:8080/suppliers', data, true)
    }
}