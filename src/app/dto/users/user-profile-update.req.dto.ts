export interface UserProfileUpdateReqDto {
    id: number
    userEmail: string
    roleId: number
    userFullName: string
    userGender: string
    userAddress: string
    fileId: number
    file: string
    fileExtension: string
}