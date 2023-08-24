import { Injectable } from "@angular/core"
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { InvoiceResDto } from "../dto/invoice/invoice.res.dto";
import { InvoiceInsertReqDto } from "../dto/invoice/invoice-insert.req.dto";
import { InvoiceDetailResDto } from "../dto/invoice-detail/invoice-detail.res.dto";

@Injectable ({
    providedIn : 'root'
})
export class InvoiceService {
    patchValue: any;

    constructor(private base: BaseService) { }

    getAllInvoices(): Observable<InvoiceResDto[]> {
        return this.base.get<InvoiceResDto[]>('http://localhost:8080/invoices', true)
    }

    insertInvoice(data : InvoiceInsertReqDto) : Observable<InvoiceInsertReqDto> {
        return this.base.post<InvoiceInsertReqDto>('http://localhost:8080/invoices', data, true)
    }

    getInvoiceDetail(code : string) : Observable<InvoiceDetailResDto[]> {
        return this.base.get<InvoiceDetailResDto[]>(`http://localhost:8080/invoices/detail?code=${code}`, true)
    }

    getInvoiceByCode(code : string): Observable<InvoiceResDto> {
        return this.base.get<InvoiceResDto>(`http://localhost:8080/invoices/search?code=${code}`, true)
    }

    getAllInvoiceDetail() : Observable<InvoiceDetailResDto[]> {
        return this.base.get<InvoiceDetailResDto[]>('http://localhost:8080/invoices/detail-all', true)
    }
}