import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserModule } from "./pages/users/user.module";
import { SupplierModule } from "./pages/supplier/supplier.module";
import { ProviderModule } from "./pages/provider/provider.module";
import { LocationModule } from "./pages/location/location.module";
import { InvoiceModule } from "./pages/invoice/invoice.module";
import { EmployeeModule } from "./pages/employee/employee.module";
import { CheckoutModule } from "./pages/checkout/checkout.module";
import { CheckinModule } from "./pages/checkin/checkin.module";
import { AssetModule } from "./pages/asset/asset.module";
import { CompanyModule } from "./pages/company/company.module";
import { BaseModule } from "./components/base/base.module";
import { BaseComponent } from "./components/base/base.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { roleValidation } from "./validation/role.validation";
import { RoleCode } from "./constant/role.contant";
import { authValidation, authValidationNonLogin } from "./validation/auth.validation";
import { UrlPipe } from "./pipes/url.pipe";
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [authValidation]
    },
    {
        component: BaseComponent,
        path: 'dashboard',
        children: [{
            path: '',
            component: DashboardComponent
        }],
        canMatch : [authValidationNonLogin]
    },
    {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/users/user.module').then(u => UserModule)
    },
    {
        component: BaseComponent,
        path: 'suppliers',
        loadChildren: () => import('./pages/supplier/supplier.module').then(s => SupplierModule),
        data: [RoleCode.ADMIN],
        canMatch: [authValidationNonLogin, roleValidation],
    },
    {
        component: BaseComponent,
        path: 'providers',
        loadChildren: () => import('./pages/provider/provider.module').then(p => ProviderModule),
        data: [RoleCode.ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'companies',
        loadChildren: () => import('./pages/company/company.module').then(c => CompanyModule),
        data: [RoleCode.ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'locations',
        loadChildren: () => import('./pages/location/location.module').then(l => LocationModule),
        data: [RoleCode.ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'invoices',
        loadChildren: () => import('./pages/invoice/invoice.module').then(i => InvoiceModule),
        data: [RoleCode.FINANCE],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'employees',
        loadChildren: () => import('./pages/employee/employee.module').then(e => EmployeeModule),
        data: [RoleCode.ADMIN],
        canMatch: [authValidationNonLogin, roleValidation]
    },
    {
        component: BaseComponent,
        path: 'checkouts',
        loadChildren: () => import('./pages/checkout/checkout.module').then(co => CheckoutModule),
        data: [RoleCode.HR],
        canMatch: [authValidationNonLogin, roleValidation]

    },
    {
        component: BaseComponent,
        path: 'checkin',
        loadChildren: () => import('./pages/checkin/checkin.module').then(ci => CheckinModule),
        data: [RoleCode.HR],
        canMatch: [authValidationNonLogin, roleValidation],
    },
    {
        component: BaseComponent,
        path: 'assets',
        loadChildren: () => import('./pages/asset/asset.module').then(a => AssetModule),
        data: [RoleCode.HR, RoleCode.SUPPORT],
        canMatch: [authValidationNonLogin, roleValidation],
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: "full"
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BaseModule,
        ReactiveFormsModule,
        CommonModule,
        UrlPipe,
        InputTextModule,
        CheckboxModule,
        RadioButtonModule,
        ButtonModule,
        CardModule
    ],
    exports: [
        RouterModule,
        BaseModule,
        DashboardComponent
    ]
})

export class AppRouting {

}