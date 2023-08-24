import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserListComponent } from "./list/user-list.component";
import { UserCreateComponent } from "./create/user-create.component";
import { UserProfileComponent } from "./profile/user-profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserUpdateComponent } from "./update/user-update.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../components/button/button.component";
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'new',
        component: UserCreateComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'profile/update/:id',
        component: UserUpdateComponent
    }
]

@NgModule({
    declarations : [
        UserListComponent,
        UserCreateComponent,
        UserProfileComponent,
        UserUpdateComponent,
        ChangePasswordComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ButtonComponent,
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
        ProgressSpinnerModule
    ],
    exports: [
        UserListComponent,
        UserCreateComponent,
        UserProfileComponent,
        UserUpdateComponent,
        ChangePasswordComponent,
        RouterModule        
    ]
})
export class UserRouting {

}