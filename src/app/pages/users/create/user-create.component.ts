import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { UserRoleResDto } from "../../../dto/users/user-role.res.dto";
import { RoleService } from "../../../services/role.service";
import { UserService } from "../../../services/user.service";
import { FileUpload } from "primeng/fileupload";

@Component({
    selector: 'user-create',
    templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit, AfterViewChecked {

    roles!: UserRoleResDto[]
    loading!: boolean

    userInsertReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        roleId: [0, [Validators.required]],
        userFullName: ['', [Validators.required]],
        userGender: ['', [Validators.required]],
        userAddress: ['', [Validators.required]],
        file: ['', [Validators.required]],
        fileExtension: ['', [Validators.required]]
    })

    constructor(
        private userService: UserService,
        private roleService: RoleService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Create User | Assets Management System')
    }

    ngOnInit() {
        this.roleService.getAllRoles()
            .subscribe((res) => {
                this.roles = res;
            })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    onCreate(): void {

        if (this.userInsertReqDto.valid) {
            const data = this.userInsertReqDto.getRawValue()
            this.loading = true

            this.userService.insertUser(data).subscribe(result => {
                this.loading = false
                this.router.navigateByUrl('/users')
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

                this.userInsertReqDto.patchValue({
                    file: resultBase64,
                    fileExtension: resultExtension
                })

                fileUpload.clear()
            })
        }
    }
}