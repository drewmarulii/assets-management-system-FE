import { NgModule } from "@angular/core";
import { NavBarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UrlPipe } from "src/app/pipes/url.pipe";
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations : [
        NavBarComponent,
    ],
    imports : [
        RouterModule,
        CommonModule,
        MenubarModule,
        ButtonModule,
        DropdownModule,
        OverlayPanelModule,
        MenuModule,
        UrlPipe
    ],
    exports: [
        NavBarComponent,
        RouterModule
    ]
})

export class NavbarModule {

}