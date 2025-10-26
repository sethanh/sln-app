/* eslint-disable @typescript-eslint/no-explicit-any */
import { HubConnection } from '@microsoft/signalr';
import { NotificationInstance } from 'antd/es/notification/interface';

export interface IRealTimeContext {
	readonly realtimeConn?: HubConnection;
	readonly notify: NotificationInstance;
}

export interface RealtimeData<T = any> {
	readonly key: RealtimeKeys;
	readonly data: T;
}


export interface RealtimeAppointmentData {
	readonly appointmentId: string;
}

export interface BranchNotificationData {
	readonly branchId: string;
	readonly badge: number;
	readonly profileId: string;
	readonly ignoreId?: string;
	readonly notifyId: string;
}

export type IJobType = 'MESSAGE';

export type AptNotifyStatus = 'book' | 'confirm' | 'no_show' | 'cancel';

export enum RealtimeKeys {
	MessageRefresh = 'MESSAGE_REFRESH',
	Notification = 'NOTIFY'
}

export enum RealtimeMethods { 
	Subscribe = 'Subscribe',
	Update = 'Update',
	Remove = 'Remove',
}

type RealtimeSubscribeArg = { key: string };

export const realtimeSubscribesArg: RealtimeSubscribeArg[] = Object.values(RealtimeKeys).map(val => ({
    key: val,
}));

export enum RealtimeEvents {
	Valued = 'Valued',
	DataFetched = 'DataFetched',
	DataModified = 'DataModified',
	DataAdded = 'DataAdded',
	DataRemoved = 'DataRemoved',
}
