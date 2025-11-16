import { useEffect } from 'react';
import { useRealtimeContext } from '../RealtimeRoot';
import { RealtimeData, RealtimeEvents } from '../Types';
import { getRealtimeJob, realtimeDataParse } from '../realtimeUtils';
import { MessageEventModel, messageEvents, notifyEvents } from '@my-monorepo/payflash/Events';
import { NotifyEventModel } from '@my-monorepo/payflash/Events/Enums/NotifyEventModel';

export const useDataModified = () => {
    const { realtimeConn: conn, notify } = useRealtimeContext();
    
    const notifySuccess = (payload: any) => {
        notify.success({
            message: `${payload.title}`,
            description: `${payload.body}\n`,
            duration: 5,
    });
    }

    // const handleAppointmentRealtime = useAppointmentRealtime();
    // const handleInventorySoldOutNotify = useInventorySoldOutNotify();
    // const handleInventoryLowStockNotify = useInventoryLowStockNotify();
    // const handleRefreshRealTime = useRefreshRealtime();
    // const handleBranchRealTime = useBranchNotify();

    useEffect(() => {
        if (!conn) {
            return;
        }

        conn.on(RealtimeEvents.DataModified, async (data: RealtimeData) => {
            data = realtimeDataParse(data);
            const job = getRealtimeJob(data);

            console.log(job);

            switch (job) {

                case "MESSAGE": {
                    const messageValue = data.data as MessageEventModel;
                    messageEvents.refetchMessage.emit(messageValue)
                    break;
                }
                case "NOTIFY": {
                    const messageValue = data.data as NotifyEventModel;
                    notifyEvents.refetchBell.emit(messageValue);
                }
            }

            notifySuccess(data.data);
        });

        return () => {
            conn.off(RealtimeEvents.DataModified);
        };
    }, [conn]);
};
