import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { AssetTypeResDto } from "../../../dto/asset/asset-type.res.dto";
import { AssetStatusResDto } from "../../../dto/asset/asset-status.res.dto";
import { CompanyResDto } from "../../../dto/company/company.res.dto";
import { InvoiceDetailResDto } from "../../../dto/invoice-detail/invoice-detail.res.dto";
import { AssetService } from "../../../services/asset.service";
import { CompanyService } from "../../../services/company.service";
import { InvoiceService } from "../../../services/invoice.service";
import { FileUpload } from "primeng/fileupload";
import { RoleCode } from "src/app/constant/role.contant";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'asset-create',
    templateUrl: './asset-create.component.html'
})
export class AssetCreateComponent implements OnInit, AfterViewChecked {
    types!: AssetTypeResDto[]
    status!: AssetStatusResDto[]
    companies!: CompanyResDto[]
    invDetails!: InvoiceDetailResDto[]


    assetInsertReqDto = this.fb.group({
        assetName: ['', [Validators.required]],
        typeId: [0, [Validators.required]],
        statusId: [0, [Validators.required]],
        companyId: [0, [Validators.required]],
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]],
        invDetailId: [0, [Validators.required]]
    })

    constructor(
        private assetService: AssetService,
        private authService: AuthService,
        private companyService: CompanyService,
        private invoiceService: InvoiceService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Asset Create | Assets Management System')
    }

    ngOnInit(): void {
        
        this.assetService.getAllTypes()
            .subscribe((res) => {
                this.types = res;
            })

        this.assetService.getAllStatus()
            .subscribe((res) => {
                this.status = res;
            })

        this.companyService.getAllCompanies()
            .subscribe((res) => {
                this.companies = res;
            })

        this.invoiceService.getAllInvoiceDetail()
            .subscribe((res) => {
                this.invDetails = res;
            })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    onCreate(): void {
        if (this.assetInsertReqDto.valid) {
            const data = this.assetInsertReqDto.getRawValue()
            this.assetService.insertAsset(data).subscribe((result) => {
                this.router.navigateByUrl('/assets')
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

                this.assetInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                fileUpload.clear()
            })
        }
    }
}