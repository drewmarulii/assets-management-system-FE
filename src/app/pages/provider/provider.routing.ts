import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProviderListComponent } from "./list/provider-list.component";
import { ProviderCreateComponent } from "./create/provider-create.component";
import { ProviderUpdateComponent } from "./update/provider-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from 'primeng/fileupload';

const routes: Routes = [
    {
        path: '',
        component: ProviderListComponent
    },
    {
        path: 'new',
        component: ProviderCreateComponent
    },
    {
        path: 'update/:id',
        component: ProviderUpdateComponent
    },
]

@NgModule({
    declarations: [
        ProviderListComponent,
        ProviderCreateComponent,
        ProviderUpdateComponent
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
        ProviderListComponent,
        ProviderCreateComponent,
        ProviderUpdateComponent,
        RouterModule
    ]
})
export class ProviderRouting {

}