import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { Observable } from "rxjs";
import { AssetStatusResDto } from "src/app/dto/asset/asset-status.res.dto";
import { AssetTypeResDto } from "src/app/dto/asset/asset-type.res.dto";
import { AssetResDto } from "src/app/dto/asset/asset.res.dto";
import { CompanyResDto } from "src/app/dto/company/company.res.dto";
import { InvoiceDetailResDto } from "src/app/dto/invoice-detail/invoice-detail.res.dto";
import { AssetService } from "src/app/services/asset.service";
import { CompanyService } from "src/app/services/company.service";
import { InvoiceService } from "src/app/services/invoice.service";

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
    selector: 'asset-update',
    templateUrl: './asset-update.component.html'
})
export class AssetUpdateComponent implements OnInit, AfterViewChecked {

    types!: AssetTypeResDto[]
    status!: AssetStatusResDto[]
    companies!: CompanyResDto[]
    invDetails!: InvoiceDetailResDto[]
    assetId!: number
    asset!: AssetResDto

    assetUpdateInsertReqDto = this.fb.group({
        assetName: ['', [Validators.required]],
        typeId: [0, [Validators.required]],
        statusId: [0, [Validators.required]],
        companyId: [0, [Validators.required]],
        fileId: [0, [Validators.required]],
        file: [''],
        fileExtension: [''],
        invDetailId: [0, [Validators.required]],
        version: [0, [Validators.required]]
    })

    constructor(
        private assetService: AssetService,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private invoiceService: InvoiceService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Asset Update | Assets Management System')
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

        getParams(this.route, 0).subscribe((res) => {
            this.assetId = Number(res['id'])
            this.assetService.getById(res['id']).subscribe((res) => {
                this.asset = res

                this.assetUpdateInsertReqDto.patchValue({
                    assetName: res.assetName
                })
            })
        })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    onUpdate() {

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

                this.assetUpdateInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                fileUpload.clear()
            })
        }
    }

}