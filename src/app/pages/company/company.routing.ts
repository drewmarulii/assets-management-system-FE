import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company-list.component";
import { CompanyCreateComponent } from "./create/company-create.component";
import { CompanyUpdateComponent } from "./update/company-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FileUploadModule } from 'primeng/fileupload';

const routes: Routes = [
    {
        path: '',
        component: CompanyListComponent
    },
    {
        path: 'new',
        component: CompanyCreateComponent
    },
    {
        path: 'update/:id',
        component: CompanyUpdateComponent
    }
]

@NgModule({
    declarations: [
        CompanyListComponent,
        CompanyCreateComponent,
        CompanyUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule
    ],
    exports: [
        CompanyListComponent,
        CompanyCreateComponent,
        CompanyUpdateComponent,
        RouterModule
    ]
})
export class CompanyRouting {

}