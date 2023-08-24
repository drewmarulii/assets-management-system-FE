import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../../../services/company.service";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CompanyResDto } from "src/app/dto/company/company.res.dto";

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
    selector: 'company-update',
    templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {

    companyId!: number
    company?: CompanyResDto

    companyUpdateReqDto = this.fb.group({
        id: [0, [Validators.required]],
        companyName : ['', [Validators.required]],
        companyAddress: ['', [Validators.required]],
        companyPhone: ['', [Validators.required]],
        fileId: [0, [Validators.required]],
        file: [''],
        fileExtension: ['']
    })

    constructor(
        private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Company Create | Assets Management System')
    }

    ngOnInit(): void {
        getParams(this.route, 0).subscribe((res) => {
            this.companyService.getById(Number(res['id'])).subscribe((res) => {
                this.companyUpdateReqDto.patchValue({
                    id: res.id,
                    companyName : res.companyName,
                    companyAddress: res.companyAddress,
                    companyPhone: res.companyPhone,
                    fileId: res.fileId
                })
            })
        })
    }

    onUpdate() : void {
        if (this.companyUpdateReqDto.valid) {
            const data = this.companyUpdateReqDto.getRawValue()
            this.companyService.updateCompany(data).subscribe((res) => {
                this.router.navigateByUrl('/companies')
            })
        }
    }

    fileUpload(event: any) {
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

                this.companyUpdateReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })
            })
        }
    }
}