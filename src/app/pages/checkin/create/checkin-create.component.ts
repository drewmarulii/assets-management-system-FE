import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CheckoutService } from "../../../services/checkout.service";
import { CheckoutResDto } from "../../../dto/checkout/checkout.res.dto";
import { CheckoutDetailResDto } from "../../../dto/checkout/checkout-detail.res.dto";
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
    selector: 'checkin-create',
    templateUrl: './checkin-create.component.html'
})
export class CheckinCreateComponent implements OnInit, AfterViewChecked {

    checkoutCode: string | null = null;
    codes!: CheckoutResDto[];
    assets!: CheckoutDetailResDto[];

    checkinInsertReqDto = this.fb.group({
        detailId: this.fb.array([0])
    });

    constructor(
        private checkoutService: CheckoutService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Checkin Create | Assets Management System');
    }

    ngOnInit(): void {
        this.checkoutService.getCheckout().subscribe((res) => {
            this.codes = res;
        });
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    onCreate(): void {
        if (this.checkinInsertReqDto.valid) {
            const data = this.checkinInsertReqDto.getRawValue();
            this.checkoutService.insertCheckin(data).subscribe((result) => {
                this.router.navigateByUrl('checkouts');
            });
        }
    }

    get detailId() {
        return this.checkinInsertReqDto.get('detailId') as FormArray;
    }

    onAdd() {
        this.detailId.push(this.fb.control(0));
    }

    onDelete(i: number) {
        this.detailId.removeAt(i);
    }

    onChangeCheckoutCode(event: DropdownChangeEvent) {
        const selectedOption = event.value;
      
        if (selectedOption) {
          this.checkoutService.getCheckoutDetail(selectedOption).subscribe((res) => {
            this.assets = res;
          });
        } else {
          this.assets = [];
        }
      }

}
