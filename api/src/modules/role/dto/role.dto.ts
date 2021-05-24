export class CreateRoleDto {
    id?: string
    readonly name: string
    readonly description: string
    readonly status: string
    readonly menuIdList?: string[]
    readonly permissionIdList?: string[]
}
