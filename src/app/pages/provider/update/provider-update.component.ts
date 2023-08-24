import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ProviderService } from "src/app/services/provider.service";

@Component({
    selector: 'provider-update',
    templateUrl: './provider-update.component.html'
})
export class ProviderUpdateComponent {

    providerUpdateReqDto = this.fb.group({
        providerName: [''],
        file: '',
        fileExtension: ''
    })

    constructor(
        private providerService: ProviderService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Provider Create | Assets Management System')
    }

    onUpdate(): void {
        if (this.providerUpdateReqDto.valid) {
            const data = this.providerUpdateReqDto.getRawValue()

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

                this.providerUpdateReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}