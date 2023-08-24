import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CheckoutTypeResDto } from "../../../dto/checkout/checkout-type.res.dto";
import { EmployeeResDto } from "../../../dto/employee/employee.res.dto";
import { LocationResDto } from "../../../dto/location/location.res.dto";
import { AssetGeneralResDto } from "../../../dto/asset/asset-general.res.dto";
import { CheckoutService } from "../../../services/checkout.service";
import { EmployeeService } from "../../../services/employee.service";
import { LocationService } from "../../../services/location.service";
import { AssetService } from "../../../services/asset.service";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { AssetResDto } from "../../../dto/asset/asset.res.dto";
import { CheckoutDetailInsertReqDto } from "../../../dto/checkout/checkout-detail-insert.req.dto";
import { convertUTCToLocalDateTime } from "src/app/util/date.converter";
import { DropdownChangeEvent } from "primeng/dropdown";

@Component({
    selector: 'checkout-create',
    templateUrl: './checkout-create.component.html'
})
export class CheckoutCreateComponent implements OnInit, AfterViewChecked {

    typeCode!: number
    types!: CheckoutTypeResDto[]
    employees!: EmployeeResDto[]
    locations!: LocationResDto[]
    generals!: AssetGeneralResDto[]
    assets!: AssetResDto[]
    cDetails: CheckoutDetailInsertReqDto[] = []
    employee: boolean = false
    location: boolean = false
    general: boolean = false

    checkoutInsertReqDto = this.fb.group({
        employeeId: 0,
        locationId: 0,
        assetGeneralId: 0,
        typeId: 0,
        details: this.fb.array(this.cDetails)
    })

    constructor(
        private checkoutService: CheckoutService,
        private employeeService: EmployeeService,
        private locationService: LocationService,
        private assetService: AssetService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Checkout Create | Assets Management System')
    }

    ngOnInit(): void {
        this.checkoutService.getCheckoutType()
            .subscribe((res) => {
                this.types = res
            })

        this.employeeService.getAllEmployees()
            .subscribe((res) => {
                this.employees = res
            })

        this.locationService.getAllLocations()
            .subscribe((res) => {
                this.locations = res
            })

        this.assetService.getAllAssets()
            .subscribe((res) => {
                this.assets = res
            })

        this.assetService.getAssetGeneral()
            .subscribe((res) => {
                this.generals = res
            })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    returnDateConvert(event: any, i: number) {
        this.details.at(i).patchValue({
            dueDate: new Date(convertUTCToLocalDateTime(event))
        })
    }

    onCreate(): void {
        if (this.checkoutInsertReqDto.valid) {
            const data = this.checkoutInsertReqDto.getRawValue()
            this.checkoutService.insertCheckout(data).subscribe((result) => {
                this.router.navigateByUrl('/checkouts')
            })
        }
    }

    get details() {
        return this.checkoutInsertReqDto.get('details') as FormArray
    }

    onAdd() {
        this.details.push(this.fb.group({
            assetId: [0, [Validators.required]],
            dueDate: [],
            dateTemp: ['']
        }))
    }

    onDelete(i: number) {
        this.details.removeAt(i)
    }

    onChange(event : DropdownChangeEvent) {
        const selectedOption = event.value
        
        if(selectedOption === 1) {
            this.employee = true
            this.general = false
            this.location = false
        } else if (selectedOption === 2) {
            this.employee = false
            this.general = true
            this.location = false
        } else if (selectedOption === 3) {
            this.employee = false
            this.general = false
            this.location = true
        }
    }
}