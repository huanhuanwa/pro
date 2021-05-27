export interface DecoratorActionOptions {
    type: string;
    payload?: any;
}
/**
 * Decorates a method with a action information.
 */
export declare function Action(action?: DecoratorActionOptions | string): (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) => void;
