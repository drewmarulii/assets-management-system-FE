import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeListComponent } from "./list/employee-list.componet";
import { EmployeeCreateComponent } from "./create/employee-create.component";
import { EmployeeUpdateComponent } from "./update/employee-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';

const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent
    },
    {
        path: 'new',
        component: EmployeeCreateComponent
    },
    {
        path: 'update/:id',
        component: EmployeeUpdateComponent
    }
]

@NgModule({
    declarations: [
        EmployeeListComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule, 
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule
    ],
    exports: [
        EmployeeListComponent,
        EmployeeCreateComponent,
        EmployeeUpdateComponent,
        RouterModule
    ]
})
export class EmployeeRouting {

}