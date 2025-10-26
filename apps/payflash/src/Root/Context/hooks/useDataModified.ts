import { useEffect } from 'react';
import { useRealtimeContext } from '../RealtimeRoot';
import { RealtimeData, RealtimeEvents } from '../Types';
import { getRealtimeJob, realtimeDataParse } from '../realtimeUtils';
import { MessageEventModel, messageEvents } from '@my-monorepo/payflash/Events';

export const useDataModified = () => {
    const { realtimeConn: conn } = useRealtimeContext();

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
                default:
                    break;
            }
        });

        return () => {
            conn.off(RealtimeEvents.DataModified);
        };
    }, [conn]);
};
