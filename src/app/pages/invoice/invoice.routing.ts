import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceDetailListComponent } from "./detail-list/invoice-detail-list.component";
import { InvoiceListComponent } from "./list/invoice-list.component";
import { InvoiceCreateComponent } from "./create/invoice-create.component";
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
import { ImageModule } from 'primeng/image';

const routes: Routes = [
    {
        path: '',
        component: InvoiceListComponent
    },
    {
        path: 'new',
        component: InvoiceCreateComponent
    },
    {
        path: 'detail/:id',
        component: InvoiceDetailListComponent
    }
]

@NgModule({
    declarations: [
        InvoiceListComponent,
        InvoiceCreateComponent,
        InvoiceDetailListComponent
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
        TagModule,
        ImageModule
    ],
    exports: [
        InvoiceListComponent,
        InvoiceCreateComponent,
        InvoiceDetailListComponent,
        RouterModule
    ]
})
export class InvoiceRouting {

}