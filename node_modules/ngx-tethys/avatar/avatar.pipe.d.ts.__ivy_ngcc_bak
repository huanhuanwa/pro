import { PipeTransform } from '@angular/core';
import { ThyAvatarService } from './avatar.service';
export declare class AvatarShortNamePipe implements PipeTransform {
    transform(name: string): string;
}
export declare class AvatarBgColorPipe implements PipeTransform {
    transform(name: string): {
        'background-color': string;
    };
}
export declare class AvatarSrcPipe implements PipeTransform {
    private thyAvatarService;
    constructor(thyAvatarService: ThyAvatarService);
    transform(src: string, size: number): string;
}
export declare const AvatarPipes: (typeof AvatarShortNamePipe | typeof AvatarBgColorPipe | typeof AvatarSrcPipe)[];
