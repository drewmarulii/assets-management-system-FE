import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CheckoutDetailResDto } from "../../../dto/checkout/checkout-detail.res.dto";
import { CheckoutService } from "../../../services/checkout.service";

@Component({
    selector: 'checkout-detail-create',
    templateUrl: './checkout-detail-list.component.html'
})
export class CheckoutDetailCreateComponent implements OnInit {
    details!: CheckoutDetailResDto[];
    code!: string;

    constructor(
        private checkoutService: CheckoutService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(paramMap => {
            const checkoutCode = paramMap.get('code');
            if (checkoutCode) {
                this.code = checkoutCode;
                this.getCheckoutDetails();
            }
        });
    }

    private getCheckoutDetails() {
        this.checkoutService.getCheckoutDetail(this.code)
            .subscribe((res) => {
                this.details = res;
            });
    }
}
