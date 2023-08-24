import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssetCreateComponent } from "./create/asset-create.component";
import { AssetListComponent } from "./list/asset-list.component";
import { AssetUpdateComponent } from "./update/asset-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

const routes: Routes = [
    {
        path: '',
        component: AssetListComponent
    },
    {
        path: 'new',
        component: AssetCreateComponent
    },
    {
        path: 'update/:id',
        component: AssetUpdateComponent
    }
]

@NgModule({
    declarations: [
        AssetListComponent,
        AssetCreateComponent,
        AssetUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputTextModule,
        RadioButtonModule,
        InputTextareaModule,
        FileUploadModule,
        ToastModule,
        CardModule,
        TagModule
    ],
    exports: [
        AssetListComponent,
        AssetCreateComponent,
        AssetUpdateComponent,
        RouterModule
    ]
})

export class AssetRouting {

}