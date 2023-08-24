import { Component, OnInit } from "@angular/core";
import { InvoiceResDto } from "../../../dto/invoice/invoice.res.dto";
import { InvoiceService } from "../../../services/invoice.service";

@Component({
    selector: 'invoice-list',
    templateUrl: './invoice-list.component.html'
})
export class InvoiceListComponent implements OnInit {

    invoices! : InvoiceResDto[]

    constructor(private invoiceService : InvoiceService) { }

    ngOnInit(): void {
        this.invoiceService.getAllInvoices()
            .subscribe((res) => {
                this.invoices = res
            })
    }
}