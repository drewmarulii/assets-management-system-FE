import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ProviderService } from "../../../services/provider.service";

@Component({
    selector: 'provider-create',
    templateUrl: './provider-create.component.html'
})
export class ProviderCreateComponent {

    providerInsertReqDto = this.fb.group({
        providerName : [''],
        file : '',
        fileExtension : ''
    })

    constructor(
        private providerService: ProviderService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Provider Create | Assets Management System')
    }

    onCreate() : void {
        if (this.providerInsertReqDto.valid) {
            const data = this.providerInsertReqDto.getRawValue()
            this.providerService.insertProvider(data).subscribe((result) => {
                this.router.navigateByUrl('/providers')
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

                this.providerInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })
            })
        }
    }
}