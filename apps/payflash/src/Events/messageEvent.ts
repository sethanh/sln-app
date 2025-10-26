import { eventUtil } from "@my-monorepo/utils";
import { MessageEventModel } from "./Enums";

export const messageEvents = {
    refetchMessage: eventUtil.createEvent<MessageEventModel>('REFETCH_MESSAGE')
};