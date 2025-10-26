import { useEffect } from 'react';
import { useRealtimeContext } from '../RealtimeRoot';
import { RealtimeData, RealtimeEvents } from '../Types';
import { getRealtimeJob, realtimeDataParse } from '../realtimeUtils';

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

            // switch (job) {
            //     case 'APPOINTMENT': {
            //         handleAppointmentRealtime(data);
            //         break;
            //     }
            //     case 'INVENTORY': {
            //         if (data.key.startsWith(RealtimeKeys.InventorySoldOut)) {
            //             handleInventorySoldOutNotify(data.data);
            //         }
            //         if (data.key.startsWith(RealtimeKeys.InventoryLowStock)) {
            //             handleInventoryLowStockNotify(data.data);
            //         }
            //         break;
            //     }
            //     case 'REFRESH': {
            //         handleRefreshRealTime(data);
            //         break;
            //     }
            //     case 'BRANCH': {
            //         handleBranchRealTime(data);
            //         break;
            //     }
            //     default:
            //         break;
            // }
        });

        return () => {
            conn.off(RealtimeEvents.DataModified);
        };
    }, [conn]);
};
