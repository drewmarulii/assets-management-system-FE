import { Component } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SupplierService } from "src/app/services/supplier.service";

@Component({
    selector: 'supplier-update',
    templateUrl: './supplier-update.component.html'
})
export class SupplierUpdateComponent {

    supplierUpdateReqDto = this.fb.group({
        supplierName: '',
        supplierPhone: '',
        file: '',
        fileExtension: ''
    })

    constructor(
        private supplierService: SupplierService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('Supplier Update | Assets Management System')
    }

    onUpdate(): void {
        if (this.supplierUpdateReqDto.valid) {
            const data = this.supplierUpdateReqDto.getRawValue()
 
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

                this.supplierUpdateReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                console.log(resultBase64)
                console.log(resultExtension)
            })
        }
    }
}