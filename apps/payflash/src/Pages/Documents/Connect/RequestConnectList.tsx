import {
  AccountConnectionGetAllResponse,
  AccountConnectionStatus} from "@my-monorepo/payflash/Models";
import { ButtonCommon, FlexBox, TextCommon } from "@my-monorepo/ui";
import {  Avatar, Card, Spin } from "antd";
import { currentAccountAtom, usePaymentHttpQuery } from "@my-monorepo/payflash/Root";
import { urlConstant } from "@my-monorepo/payflash/Constants";
import { ICPayments } from "@my-monorepo/payflash/Assets";
import { useAtom } from "jotai";


export interface AddFriendFormProps {
  onSuccess?: () => void;
}


export const RequestConnectList: React.FC<AddFriendFormProps> = () => {
    const [currentAccount] = useAtom(currentAccountAtom);
    const { data, isLoading: connectionLoading } =
        usePaymentHttpQuery<AccountConnectionGetAllResponse>({
      url: urlConstant.connection.accountConnectionGetAllUrl,
      method: 'GET',
      queryParams: {
        status: AccountConnectionStatus.Wait
      }
    });


  return (
    <FlexBox direction="column" gap={12}>
      <TextCommon>Account connected request list</TextCommon>
      <Spin spinning={connectionLoading}>
        <FlexBox direction="column" gap={8} > 
            { data?.items?.map((accountConnect) => {
              const account = accountConnect.accountRequestId == currentAccount?.id ? accountConnect.accountAccept : accountConnect.accountRequest;
              const needAccept = accountConnect.accountRequestId != currentAccount?.id;
              return( <Card style={{ marginBottom: 8 }}>
                <FlexBox alignItems="center" gap={12} justifyContent="space-between">
                    <FlexBox gap={8} flex="none">
                        <Avatar
                            src={
                                account?.photo?.relativePath
                                    ? `${import.meta.env.VITE_API_URL}/${account.photo.relativePath}`
                                    : account?.googleAccounts?.[0]?.picture
                            }
                            size={48}
                        />
                        <FlexBox preset="column-start">
                            <TextCommon fontWeight={500}>{account?.name}</TextCommon>
                            <TextCommon>{account?.email}</TextCommon>
                        </FlexBox>
                    </FlexBox>
                          {
                            needAccept
                              ?  <ButtonCommon icon={<ICPayments.Connection />}>
                                                              Accept
                                                          </ButtonCommon>
                              :<FlexBox alignItems="center" direction="column" flex="none">
                                <ICPayments.Clock />
                                <TextCommon >Wait accept</TextCommon>
                            </FlexBox>
                          }
                            
                       
                </FlexBox>
            </Card>)
            })}
        </FlexBox>
      </Spin>
    </FlexBox>
  );
};
