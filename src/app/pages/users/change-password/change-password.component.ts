import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    changePasswordInsertReq = this.fb.group ({
        id: [0, [Validators.required]],
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
    })

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Change Password | Assets Management System')
    }

    ngOnInit(): void {
        const profile = this.authService.getProfile()

        if (profile) {
            this.changePasswordInsertReq.patchValue({
                id: profile?.id
            })   
        }
    }

    onChange() {
        if(this.changePasswordInsertReq.valid) {
            const data = this.changePasswordInsertReq.getRawValue()
            this.userService.changePassword(data).subscribe((res) => {
                this.router.navigateByUrl('/users/profile')
            })
        }
    }
}