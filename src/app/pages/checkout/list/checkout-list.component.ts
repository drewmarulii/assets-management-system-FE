import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CheckoutResDto } from "src/app/dto/checkout/checkout.res.dto";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
    selector: 'checkout-list',
    templateUrl: './checkout-list.component.html'
})

export class CheckoutListComponent implements OnInit {

    checkouts! : CheckoutResDto[]
    code! : string

    constructor(
        private checkoutService : CheckoutService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.checkoutService.getAllCheckout()
            .subscribe((res) => {
                this.checkouts = res
            })
    }
}