import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SupplierService } from "../../../services/supplier.service";

@Component({
    selector: 'supplier-create',
    templateUrl: './supplier-create.component.html'
})
export class SupplierCreateComponent {

    supplierInsertReqDto = this.fb.group({
        supplierName : ['', [Validators.required]],
        supplierPhone : ['', [Validators.required]],
        file : ['', [Validators.required]],
        fileExtension : ['', [Validators.required]]
    })

    constructor(
        private supplierService: SupplierService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Supplier Create | Assets Management System')
    }

    onCreate() : void {
        if (this.supplierInsertReqDto.valid) {
            const data = this.supplierInsertReqDto.getRawValue()
            this.supplierService.insertSupplier(data).subscribe((result) => {
                this.router.navigateByUrl('/suppliers')
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

                this.supplierInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })
            })
        }
    }
}