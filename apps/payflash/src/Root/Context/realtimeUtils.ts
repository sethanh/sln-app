import { RealtimeData, RealtimeKeys } from "./Types";

export const realtimeDataParse = (data: RealtimeData): RealtimeData => {
    return {
        key: getRealtimeKey(data),
        data: data.data,
    };
};

export const getRealtimeKey = (data: RealtimeData): RealtimeKeys => {
    return data.key.split('-')[0] as RealtimeKeys;
};

export const getRealtimeJob = (data: RealtimeData) => {
    return data.key.split('_')[0];
};
