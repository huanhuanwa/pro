import { Pipe, PipeTransform } from "@angular/core";
import { PermissionService } from "../permission.service";

@Pipe({ name: 'hasPermission' })
export class HasPermissionPipe implements PipeTransform {
    constructor(private permissionService: PermissionService) {}

    transform(permissionValue: string, expectedPermissionPoint: string, permissionAllPoints?: string[]) {
        return this.permissionService.hasPermission(permissionValue, expectedPermissionPoint, permissionAllPoints);
    }
}