import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckinCreateComponent } from "./create/checkin-create.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    {
        path: '',
        component: CheckinCreateComponent
    }
]

@NgModule({
    declarations: [
        CheckinCreateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        ToastModule
    ],
    exports: [
        CheckinCreateComponent,
        RouterModule
    ]
})
export class CheckinRouting {

}