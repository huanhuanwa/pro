import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PermissionService {

    hasPermission(permissionValue: string, expectedPermissionPoint: string, permissionAllPoints?: string[]){
        return true
    }
    
}