import { appConstant, urlConstant } from "@my-monorepo/payflash/Constants";
import { AddFriendForm } from "@my-monorepo/payflash/Forms";
import { AccountConnectionDetailResponse, AccountConnectionGetAllResponse, AccountConnectionUpdateResponse } from "@my-monorepo/payflash/Models/Connections";
import { usePaymentHttpCommand, usePaymentHttpQuery } from "@my-monorepo/payflash/Root";
import { Block, ButtonCommon, FlexBox, FormikForm, ListCommon, ListItemCommon, SelectField, TextCommon, useGlobalDrawer } from "@my-monorepo/ui"
import { Avatar } from "antd";
import { useRef, useState, useEffect } from "react";
import { ConnectActionEnum } from "./Enums";

export const ConnectPage : React.FC = () => {
    const [isSender, setIsSender] = useState(true);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const listRef = useRef<HTMLDivElement | null>(null);

    const {globalDrawer, setGlobalDrawer, resetGlobalDrawerState } = useGlobalDrawer();

    const selectOptions = [
        { value: "true", label: "Sent Requests" },
        { value: "false", label: "Received Requests" }
    ]

    const renderItem = (item: AccountConnectionDetailResponse) => {
        const photoUrl = item.photo?.relativePath ? 
        `${appConstant.apiUrl}/${item.photo.relativePath}` : item.googleAccounts?.[0]?.picture;

        return (
            <ListItemCommon
                key={item.id}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px"
                }}
            >
               <Avatar src={photoUrl} size={48} />
               <FlexBox
                    preset="column-start"
                    padding="1rem"
               >
                    <TextCommon fontWeight={500} fontSize={17}>{item.name}</TextCommon>
                    <TextCommon fontSize={12}>{item.email}</TextCommon>
               </FlexBox>
                {!isSender ? (
                    <FlexBox position="absolute" right="12px" gap="8px">
                        <ButtonCommon
                        onClick={async () => { 
                            await handleConnectAction(item, ConnectActionEnum.Accepted); 
                        }}>
                            Accept
                        </ButtonCommon>
                        <ButtonCommon
                        onClick={async () => { 
                            await handleConnectAction(item, ConnectActionEnum.Rejected); 
                        }}>
                            Reject
                        </ButtonCommon>
                    </FlexBox>
                ) : (
                    <ButtonCommon 
                        onClick={async () => { 
                            await handleConnectAction(item, ConnectActionEnum.Canceled); 
                    }}>
                        Cancel Request
                    </ButtonCommon>
                )}
            </ListItemCommon>
        )
    }

    const { mutateAsync } = usePaymentHttpCommand<AccountConnectionUpdateResponse>();

    const handleConnectAction = async (item: AccountConnectionDetailResponse, action: ConnectActionEnum) => {

        await mutateAsync({
            url: urlConstant.connection.accountConnectionUpdateUrl,
            requestOptions: {
                method: "PATCH",
                routeParams: {
                    id: item.connectionId,
                },
                body: {
                    id: item.connectionId,
                    status: action
                }
            }
        });

        refetch();
    };

    const { data : requestList, refetch } = usePaymentHttpQuery<AccountConnectionGetAllResponse>({
        url: urlConstant.connection.accountConnectionGetAllUrl,
        method: "GET",
        queryParams: {
            status: ConnectActionEnum.Wait,
            isSender: isSender,
            pageSize: 200,
            useCountTotal: true
        },
    });

    useEffect(() => {
        refetch();
    }, [isSender]);

    return (
        <FlexBox preset="column-start">
            <Block position="relative" backgroundColor="white" width="100%" height="12%" display="flex" justifyContent="center" alignItems="center">
                <Block position="absolute" left="16px">
                    <FormikForm
                        initialValues={{ listType: isSender ? 'true' : 'false' }}
                        onSubmit={() => {}} // can be no-op
                    >
                        {(formik) => (
                            <SelectField
                                fieldName="listType"
                                options={selectOptions}
                                onChange={(value) => setIsSender(value==="true")}
                            />
                        )}
                    </FormikForm>
                </Block>

                <ButtonCommon 
                    style={{ position: 'absolute', right: '16px' }} 
                    onClick={() => {
                        setGlobalDrawer({
                            isOpen: true,
                            content: <AddFriendForm onSuccess={() => {refetch(); resetGlobalDrawerState();}} />,
                            submitText: "Send Request",
                        })
                    }}
                >
                    Add friend
                </ButtonCommon>
            </Block>

            <ListCommon
                containerStyle={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#f4f4f4ff" }}
                containerClassName="friend-list-container"
                data={requestList?.items || []}
                loadingInitial={loadingInitial}
                loadingMore={loadingMore}
                hasMore={hasMore}
                renderItem={renderItem}
                listItemKey="id"
                listRef={() => { listRef.current = document.querySelector('.rc-virtual-list-holder'); }}
            />
        </FlexBox>
    )
}