import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { RoleCode } from "../../constant/role.contant";
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavBarComponent implements OnInit {
    imgUrl!: number
    roleCode!: string
    items: MenuItem[] | undefined
    profilebar: MenuItem[] | undefined

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        const profile = this.authService.getProfile()
        if (profile) {
            this.imgUrl = profile.photoId
            this.roleCode = profile.roleCode

            this.items = [
                {
                    label: 'Home',
                    routerLink: '/dashboard'
                },
                {
                    label: 'Master Data',
                    visible: !this.isFinance,
                    items: [
                        {
                            label: 'Users',
                            routerLink: '/users',
                            visible: this.isAdmin
                        },
                        {
                            label: 'Assets',
                            routerLink: '/assets',
                            visible: this.isSupportHr
                        },
                        {
                            label: 'Locations',
                            routerLink: '/locations',
                            visible: this.isAdmin
                        },
                        {
                            label: 'Companies',
                            routerLink: '/companies',
                            visible: this.isAdmin
                        },
                        {
                            label: 'Employees',
                            routerLink: '/employees',
                            visible: this.isAdmin
                        },
                        {
                            label: 'Providers',
                            routerLink: '/providers',
                            visible: this.isAdmin
                        },
                        {
                            label: 'Suppliers',
                            routerLink: '/suppliers',
                            visible: this.isAdmin
                        }
                    ]
                },
                {
                    label: 'Checkout',
                    routerLink: '/checkouts',
                    visible: this.isHR
                },
                {
                    label: 'Checkin',
                    routerLink: '/checkin',
                    visible: this.isHR
                },
                {
                    label: 'Invoices',
                    routerLink: '/invoices',
                    visible: this.isFinance
                }
            ];

            this.profilebar = [
                {
                    label: 'Profile',
                    routerLink: '/users/profile'
                },
                {
                    label: 'Change Password',
                    routerLink: '/users/change-password'
                },
                {
                    separator: true
                },
                {
                    label: 'Logout',
                    command: () => { this.onLogout() }
                }
            ]
        }
    }

    get isAdmin(): boolean {
        return RoleCode.ADMIN === this.roleCode
    }

    get isFinance() {
        return RoleCode.FINANCE === this.roleCode
    }

    get isHR() {
        return RoleCode.HR === this.roleCode
    }

    get isSupport() {
        return RoleCode.SUPPORT === this.roleCode
    }

    get isSupportHr() {
        return (this.isHR || this.isSupport)
    }

    onLogout(): void {
        localStorage.clear()
        this.router.navigateByUrl('/login')
    }
}