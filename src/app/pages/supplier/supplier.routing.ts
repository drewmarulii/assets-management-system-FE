import { Input, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierCreateComponent } from "./create/supplier-create.component";
import { SupplierListComponent } from "./list/supplier-list.component";
import { SupplierUpdateComponent } from "./update/supplier-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from "primeng/fileupload";

const routes: Routes = [
    {
        path: '',
        component: SupplierListComponent
    },
    {
        path: 'new',
        component: SupplierCreateComponent
    },
    {
        path: 'update/:id',
        component: SupplierUpdateComponent
    }
]

@NgModule({
    declarations: [
        SupplierListComponent,
        SupplierCreateComponent,
        SupplierUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        FileUploadModule
    ],
    exports: [
        SupplierListComponent,
        SupplierCreateComponent,
        SupplierUpdateComponent,
        RouterModule
    ]
})
export class SupplierRouting {

}