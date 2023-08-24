import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { InvoiceService } from "../../../services/invoice.service";
import { InvoiceResDto } from "src/app/dto/invoice/invoice.res.dto";
import { Observable } from "rxjs";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
    let route = activatedRoute
    if (parentLevel) {
        for (let i = 0; i < parentLevel; i++) {
            if (route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}
@Component({
    selector: 'invoice-detail-list',
    templateUrl: './invoice-detail-list.component.html'
})
export class InvoiceDetailListComponent implements OnInit {

    imgUrl?: number
    invDetails!: InvoiceDetailResDto[]
    code!: string
    invoice?: InvoiceResDto

    constructor(
        private invoiceService: InvoiceService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {

        getParams(this.route, 0).subscribe((res) => {
            this.invoiceService.getInvoiceByCode(String(res['id']))
                .subscribe((res) => {
                    this.invoice = res
                })

            this.invoiceService.getInvoiceDetail(String(res['id']))
                .subscribe((res) => {
                    this.invDetails = res
                })
        })
    }
} 