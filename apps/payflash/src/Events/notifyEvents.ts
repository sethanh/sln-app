import { eventUtil } from "@my-monorepo/utils";

export const notifyEvents = {
    refetchBell: eventUtil.createEvent<void>('REFETCH_BELL')
};