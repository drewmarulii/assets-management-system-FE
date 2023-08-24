import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { InvoiceDetailInsertReqDto } from "../../../dto/invoice-detail/invoice-detail-insert.req.dto";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { SupplierResDto } from "../../../dto/supplier/supplier.res.dto";
import { InvoiceService } from "../../../services/invoice.service";
import { ProviderService } from "../../../services/provider.service";
import { SupplierService } from "../../../services/supplier.service";
import { FileUpload } from "primeng/fileupload";
import { InvoiceInsertReqDto } from "src/app/dto/invoice/invoice-insert.req.dto";

@Component({
    selector: 'invoice-create',
    templateUrl: './invoice-create.component.html'
})
export class InvoiceCreateComponent implements OnInit, AfterViewChecked {

    providers!: ProviderResDto[]
    suppliers!: SupplierResDto[]
    details: InvoiceDetailInsertReqDto[] = []
    invoice!: ProviderResDto

    invoiceInsertReqDto = this.fb.group({
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]],
        supplierId: [0],
        invoiceDetails: this.fb.array(this.details)
    })

    constructor(
        private invoiceService: InvoiceService,
        private supplierService: SupplierService,
        private providerService: ProviderService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private cd: ChangeDetectorRef,
        private title: Title
    ) {
        this.title.setTitle('Invoice Create | Assets Management System')
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    ngOnInit(): void {
        this.supplierService.getAllSuppliers()
            .subscribe((res) => {
                this.suppliers = res;
            })

        this.providerService.getAllProviders()
            .subscribe((res) => {
                this.providers = res
            })
    }

    onCreate(): void {
        if (this.invoiceInsertReqDto.valid) {
            const data = this.invoiceInsertReqDto.getRawValue()
            this.invoiceService.insertInvoice(data).subscribe((result) => {
                this.router.navigateByUrl('/invoices')
            })
        }
    }

    fileUpload(event: any, fileUpload: FileUpload) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.invoiceInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                fileUpload.clear()
            })
        }
    }

    get invoiceDetails() {
        return this.invoiceInsertReqDto.get('invoiceDetails') as FormArray
    }

    onAdd() {
        this.invoiceDetails.push(this.fb.group({
            itemName: ['', [Validators.required]],
            providerId: [0, [Validators.required]]
        }))
    }

    onDelete(i: number) {
        this.invoiceDetails.removeAt(i)
    }
}