import { Component, OnInit } from "@angular/core";
import { UserListResDto } from "../../../dto/users/user-list.res.dto";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NonNullableFormBuilder } from "@angular/forms";
import { UserService } from "../../../services/user.service";

interface Activation {
    name: string
    value: boolean
}
@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

    activation!: Activation[]
    users!: UserListResDto[]
    imgUrl!: string
    visible: boolean = false
    visible1: boolean = false
    status?: string

    userUpdateIsActiveDto = this.fb.group({
        userId: [0],
        isActive: [true]
    })

    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title) {
        this.title.setTitle('User List | Assets Management System')
    }

    ngOnInit() {
        this.activation = [
            { name: 'Activate', value: true },
            { name: 'Unactivate', value: false }
        ]

        this.userLists
    }

    get userLists() {
        return this.userService.getAllUsers()
            .subscribe((res) => {
                this.users = res
            })
    }

    showDialog(id: number) {
        this.visible = true

        this.userUpdateIsActiveDto.patchValue({
            userId: id
        })
    }

    showDialog1(id: number) {
        this.visible1 = true
        this.userService.getById(id).subscribe((res) => {
            this.userUpdateIsActiveDto.patchValue({
                userId: id,
                isActive: res.isActive
            })
        })
    }

    onIsActive() {
        const data = this.userUpdateIsActiveDto.getRawValue()

        this.userService.isActive(data).subscribe((res) => {
            this.userLists
            this.router.navigateByUrl('/users')
        })

        this.userUpdateIsActiveDto.reset()
        this.visible1 = false
    }

    getTag(isActive : boolean) : string {
        if(isActive) {
            this.status = "Active"
            return "success"
        } else {
            this.status = "Inactive"
            return "danger"
        }
    }
}