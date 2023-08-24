import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { FileUpload } from "primeng/fileupload";
import { UserListResDto } from "src/app/dto/users/user-list.res.dto";
import { AuthService } from "src/app/services/auth.service";
import { RoleService } from "src/app/services/role.service";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'user-update',
    templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit {

    userDetail!: UserListResDto

    userUpdateReqDto = this.fb.group({
        id: [0, [Validators.required]],
        userEmail: ['', [Validators.required]],
        roleId: [0, [Validators.required]],
        userFullName: ['', [Validators.required]],
        userGender: ['', [Validators.required]],
        userAddress: ['', [Validators.required]],
        fileId: [0, [Validators.required]],
        file: [''],
        fileExtension: ['']
    })

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Update Profile | Assets Management System')
    }

    ngOnInit(): void {
        const profile = this.authService.getProfile()
        if (profile) {
            this.userService.getById(profile.id).subscribe((res) => {
                this.userDetail = res
                this.userUpdateReqDto.patchValue({
                    id: res.id,
                    userEmail: res.userEmail,
                    roleId: res.roleId,
                    userFullName: res.userFullname,
                    userGender: res.userGender,
                    userAddress: res.userAddress,
                    fileId: res.fileId
                })
            })
        }
    }

    onUpdate() {
        if(this.userUpdateReqDto.valid) {
            const data = this.userUpdateReqDto.getRawValue()
            this.userService.updateProfile(data).subscribe((res) => {
                this.router.navigateByUrl('/users/profile')
            })
        }
    }

    fileUpload(event: any, fileUpload: FileUpload) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            };
            reader.onerror = error => reject(error);
        });

        for (let file of event.files) {
            toBase64(file).then(result => {
                const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
                const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

                this.userUpdateReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                fileUpload.clear()
            })
        }
    }


}