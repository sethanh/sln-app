import { eventUtil } from "@my-monorepo/utils";
import { NotifyEventModel } from "./Enums/NotifyEventModel";

export const notifyEvents = {
    refetchBell: eventUtil.createEvent<NotifyEventModel>('REFETCH_BELL')
};