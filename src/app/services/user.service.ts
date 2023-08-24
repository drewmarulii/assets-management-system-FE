import { Injectable } from "@angular/core"
import { UserListResDto } from "../dto/users/user-list.res.dto";
import { Observable } from 'rxjs';
import { BaseService } from "./base.service";
import { UserInsertReqDto } from "../dto/users/user-insert.req.dto";
import { UserUpdateIsActiveReqDto } from "../dto/users/user-update-isactive.req.dto";
import { UserChangePasswordReqDto } from "../dto/users/user-change-password.req.dto";
import { UserProfileUpdateReqDto } from "../dto/users/user-profile-update.req.dto";

@Injectable ({
    providedIn : 'root'
})
export class UserService {

    constructor(private base: BaseService) { }

    getAllUsers(): Observable<UserListResDto[]> {
        return this.base.get<UserListResDto[]>('http://localhost:8080/users', true)
    }

    insertUser(data : UserInsertReqDto) : Observable<UserInsertReqDto> {
        return this.base.post<UserInsertReqDto>('http://localhost:8080/users', data, true)
    }

    isActive(data :UserUpdateIsActiveReqDto) : Observable<UserUpdateIsActiveReqDto> {
        return this.base.patch<UserUpdateIsActiveReqDto>('http://localhost:8080/users', data, true)
    }

    getUserByRole(data : string): Observable<UserListResDto[]> {
        return this.base.get<UserListResDto[]>(`http://localhost:8080/users/search?code=${data}`, true)
    }

    getById(code : number): Observable<UserListResDto> {
        return this.base.get<UserListResDto>(`http://localhost:8080/users/id?code=${code}`, true)
    }

    changePassword(data : UserChangePasswordReqDto) : Observable<UserChangePasswordReqDto> {
        return this.base.patch<UserChangePasswordReqDto>(`http://localhost:8080/users/change-password`, data, true)
    }

    updateProfile(data : UserProfileUpdateReqDto) : Observable<UserProfileUpdateReqDto> {
        return this.base.patch<UserProfileUpdateReqDto>('http://localhost:8080/users/profile', data, true)
    }
}