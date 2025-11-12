import { ICPayments } from "@my-monorepo/payflash/Assets";
import { urlConstant } from "@my-monorepo/payflash/Constants";
import { AccountConnectionResponse, AccountConnectionStatus, AccountResponse } from "@my-monorepo/payflash/Models";
import { currentAccountAtom, usePaymentHttpCommand } from "@my-monorepo/payflash/Root";
import { ButtonCommon, FlexBox, TextCommon } from "@my-monorepo/ui";
import { Avatar, Card } from "antd";
import { useAtom } from "jotai";
import { useCallback } from "react";

// ✅ Memoized AccountCard
interface AccountCardProps {
    account: AccountResponse;
    connections?: AccountConnectionResponse[];
    onConnect: () => void;
}

export const AccountCard: React.FC<AccountCardProps> =
    ({ account, connections, onConnect }) => {
        const [currentAccount] = useAtom(currentAccountAtom);
        const connectionItem = connections?.find(
            (ac) => ac.accountAcceptId === account.id || ac.accountRequestId === account.id
        );
        const isConnected = connectionItem?.status === AccountConnectionStatus.Accepted;
        const isWaiting = connectionItem?.status === AccountConnectionStatus.Wait;
        const isRejected = connectionItem?.status === AccountConnectionStatus.Rejected;

        const { mutateAsync: createAsync, isPending: creating } = usePaymentHttpCommand<AccountConnectionResponse>();

        const handleConnect = useCallback(
            async (account: AccountResponse) => {
                await createAsync({
                    url: urlConstant.connection.accountConnectionUrl,
                    requestOptions: {
                        method: "POST",
                        body: { accountRequestId: currentAccount?.id, accountAcceptId: account.id }
                    }
                });

                onConnect?.();
            },
            [createAsync, currentAccount?.id, onConnect]
        );

        return (
            <Card style={{ marginBottom: 8 }}>
                <FlexBox alignItems="center" gap={12} justifyContent="space-between">
                    <FlexBox gap={8} flex="none">
                        <Avatar
                            src={
                                account.photo?.relativePath
                                    ? `${import.meta.env.VITE_API_URL}/${account.photo.relativePath}`
                                    : account?.googleAccounts?.[0]?.picture
                            }
                            size={48}
                        />
                        <FlexBox preset="column-start">
                            <TextCommon fontWeight={500}>{account.name}</TextCommon>
                            <TextCommon>{account.email}</TextCommon>
                        </FlexBox>
                    </FlexBox>

                    <FlexBox gap={8} flex="none">
                        {isConnected && (
                            <FlexBox alignItems="center" direction="column">
                                <ICPayments.Team />
                                <TextCommon >Connected</TextCommon>
                            </FlexBox>
                        )}

                        {isWaiting && (
                            <FlexBox alignItems="center" direction="column">
                                <ICPayments.Clock />
                                <TextCommon >Wait accept</TextCommon>
                            </FlexBox>
                        )}

                        {isRejected && (
                            <ButtonCommon icon={<ICPayments.Connection />} onClick={onConnect}>
                                Reconnect
                            </ButtonCommon>
                        )}

                        {!connectionItem && (
                            <ButtonCommon icon={<ICPayments.Connection />} onClick={() => handleConnect(account)} loading={creating}>
                                Connect
                            </ButtonCommon>
                        )}
                    </FlexBox>
                </FlexBox>
            </Card>
        );
    };

