import { PropsWithChildren, createContext, useContext } from 'react';
import { notification } from 'antd';
import { IRealTimeContext } from './Types';
import { useRealtimeInit } from './hooks';
import { RealtimeHandler } from './RealtimeHandler';


const RealtimeContext = createContext<IRealTimeContext>(null!);

export const RealtimeRoot = ({
    children,
}: PropsWithChildren) => {
    const [api, contextHolder] = notification.useNotification({
        stack: {
            threshold: 10,
        },
    });


    const realtimeConn = useRealtimeInit();

    return (
        <>
            {contextHolder}
            <RealtimeContext.Provider value={{
                notify: api,
                realtimeConn,
            }}>
                <RealtimeHandler>{children}</RealtimeHandler>
            </RealtimeContext.Provider>
        </>
    );
};

export const useRealtimeContext = () => {
    const realtimeContext = useContext(RealtimeContext);
    return realtimeContext;
};
