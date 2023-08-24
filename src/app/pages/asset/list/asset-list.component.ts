import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AssetStatus } from "src/app/constant/asset.constant";
import { RoleCode } from "src/app/constant/role.contant";
import { AssetStatusResDto } from "src/app/dto/asset/asset-status.res.dto";
import { AssetResDto } from "src/app/dto/asset/asset.res.dto";
import { AssetService } from "src/app/services/asset.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'asset-list',
    templateUrl: './asset-list.component.html'
})
export class AssetListComponent implements OnInit, AfterViewChecked {

    imgUrl!: string
    assets!: AssetResDto[]
    status!: AssetStatusResDto[]
    visible: boolean = false
    visible1: boolean = false
    statusName!: string
    roleCode!: string

    assetUpdateStatusReqDto = this.fb.group({
        assetId: [0, [Validators.required]],
        statusId: [0, [Validators.required]]
    })

    constructor(
        private assetService: AssetService,
        private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Assets List | Assets Management System')
    }

    get isHr() {
        return RoleCode.HR === this.roleCode
    }

    get isSupport() {
        return RoleCode.SUPPORT === this.roleCode
    }

    get isSupportHr() {
        return (this.isHr || this.isSupport)
    }

    ngOnInit(): void {

        const profile = this.authService.getProfile() 
        if(profile) {
            this.roleCode = profile.roleCode
        }

        this.assetList

        this.assetService.getAllStatus()
            .subscribe((res) => {
                this.status = res
            })
    }

    get assetList() {
        return this.assetService.getAllAssets()
            .subscribe((res) => {
                this.assets = res
            })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    showDialog(id: number) {
        this.visible = true

        this.assetUpdateStatusReqDto.patchValue({
            assetId: id
        })
    }

    showDialog1(id: number) {
        this.visible1 = true

        this.assetService.getById(id).subscribe((res) => {
            this.assetUpdateStatusReqDto.patchValue({
                assetId: id,
                statusId: res.statusId
            })
        })
    }

    onStatus() {
        const data = this.assetUpdateStatusReqDto.getRawValue()

        this.assetService.updateStatus(data).subscribe((res) => {
            this.assetList
            this.router.navigateByUrl('/assets')
        })

        this.assetUpdateStatusReqDto.reset()
        this.visible1 = false
    }

    getTag(statusName: string): string {
        if (statusName === AssetStatus.DEPLOY) {
            return "success"
        } else if (statusName === AssetStatus.REPAIR) {
            return "warning"
        } else if (statusName === AssetStatus.PENDING) {
            return "primary"
        }
        else {
            return "danger"
        }
    }
}