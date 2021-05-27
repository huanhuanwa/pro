export declare type AttachTypes = 'day' | 'month' | 'year';
export declare class DateRangeItemInfo {
    begin?: number;
    end?: number;
    key?: string;
    text?: string;
    timestamp?: {
        interval?: number;
        unit?: AttachTypes;
    };
}
