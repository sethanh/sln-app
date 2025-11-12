import { Block, FlexBox } from "@my-monorepo/ui"
import { useState } from "react";
import { Segmented } from "antd";
import { ConnectPageContent } from "./ConnectPageContent";

export const ConnectPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"Friends" | "Requests">("Requests");
    // const [loadingInitial,] = useState(false);
    // const [loadingMore,] = useState(false);
    // const [hasMore,] = useState(true);


    // const { setGlobalDrawer, resetGlobalDrawerState } = useGlobalDrawer();


    // const { mutateAsync } = usePaymentHttpCommand<AccountConnectionUpdateResponse>();


    // const { refetch } = usePaymentHttpQuery<AccountConnectionGetAllResponse>({
    //     url: urlConstant.connection.accountConnectionGetAllUrl,
    //     method: "GET",
    //     queryParams: {
    //         status: ConnectActionEnum.Wait,
    //         isSender: isSender,
    //         pageSize: 200,
    //         useCountTotal: true
    //     },
    // });



    return (
        <FlexBox direction="column" gap={4}>
            <FlexBox flex='none' >
                Connect Page
            </FlexBox>
            <FlexBox flex='none' alignItems="center" justifyContent='center'>
                <Block padding={2} backgroundColor="white" borderRadius={8}>
                    <Segmented 
                        options={['Friends', 'Requests']} 
                        defaultValue={activeTab} 
                        onChange={value => setActiveTab(value as "Friends" | "Requests")} 
                    />
                </Block>
            </FlexBox>
            <ConnectPageContent activeTab={activeTab} />
        </FlexBox>
    )
}