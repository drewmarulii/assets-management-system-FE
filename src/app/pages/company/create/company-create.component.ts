import { Component } from "@angular/core";
import { CompanyService } from "../../../services/company.service";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";


@Component({
    selector: 'company-create',
    templateUrl: './company-create.component.html'
})
export class CompanyCreateComponent {

    companyInsertReqDto = this.fb.group({
        companyName : ['', [Validators.required]],
        companyAddress: ['', [Validators.required]],
        companyPhone: ['', [Validators.required]],
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]]
    })

    constructor(
        private companyService: CompanyService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Company Create | Assets Management System')
    }

    onCreate() : void {
        if (this.companyInsertReqDto.valid) {
            const data = this.companyInsertReqDto.getRawValue()
            this.companyService.insertCompany(data).subscribe(result => {
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

                this.companyInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })
            })
        }
    }
}