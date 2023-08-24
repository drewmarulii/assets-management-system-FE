import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutListComponent } from "./list/checkout-list.component";
import { CheckoutCreateComponent } from "./create/checkout-create.component";
import { CheckoutDetailCreateComponent } from "./detail/checkout-detail-list.component";
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
import { CalendarModule } from 'primeng/calendar';

const routes: Routes = [
    {
        path: '',
        component: CheckoutListComponent
    },
    {
        path: 'new',
        component: CheckoutCreateComponent
    },
    {
        path: 'detail/:code',
        component: CheckoutDetailCreateComponent
    }
]

@NgModule({
    declarations: [
        CheckoutListComponent,
        CheckoutCreateComponent,
        CheckoutDetailCreateComponent
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
        CalendarModule
    ],
    exports: [
        CheckoutListComponent,
        CheckoutCreateComponent,
        CheckoutDetailCreateComponent,
        RouterModule
    ]
})

export class CheckoutRouting {

}