import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LocationListComponent } from "./list/location-list.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
    {
        path: '',
        component: LocationListComponent
    }
]

@NgModule({
    declarations: [
        LocationListComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule
    ],
    exports: [
        LocationListComponent,
        RouterModule
    ]
})
export class LocationRouting {

}