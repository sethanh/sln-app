import {
  AccountConnectionGetAllResponse,
  AccountConnectionResponse,
  AccountConnectionStatus,
  AccountGetAllSearchResponse,
  AccountResponse
} from "@my-monorepo/payflash/Models";
import { ButtonCommon, FlexBox, TextCommon } from "@my-monorepo/ui";
import { urlConstant } from "../../Constants";
import { currentAccountAtom, usePaymentHttpCommand } from "../../Root";
import { useAtom } from "jotai";
import { Avatar, Card, Input } from "antd";
import { useState, useCallback, useMemo, memo } from "react";
import { ICPayments } from "@my-monorepo/payflash/Assets";

const { Search } = Input;

export interface AddFriendFormProps {
  onSuccess?: () => void;
}

// ✅ Memoized Search Input
const SearchInput = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <Search placeholder="Enter email to search..." onSearch={onSearch} />
));

// ✅ Memoized AccountCard
interface AccountCardProps {
  account: AccountResponse;
  connectionItem?: AccountConnectionResponse;
  onConnect: () => void;
  creating: boolean;
  connectionLoading: boolean;
}

const AccountCard: React.FC<AccountCardProps> = memo(
  ({ account, connectionItem, onConnect, creating, connectionLoading }) => {
    const isConnected = connectionItem?.status === AccountConnectionStatus.Accepted;
    const isWaiting = connectionItem?.status === AccountConnectionStatus.Wait;
    const isRejected = connectionItem?.status === AccountConnectionStatus.Rejected;

    return (
      <Card loading={connectionLoading} style={{ marginBottom: 8 }}>
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
                <TextCommon color="green">Connected</TextCommon>
              </FlexBox>
            )}

            {isWaiting && (
              <FlexBox alignItems="center" direction="column">
                <ICPayments.Clock />
                <TextCommon color="orange">Wait accept</TextCommon>
              </FlexBox>
            )}

            {isRejected && (
              <ButtonCommon icon={<ICPayments.Connection />} onClick={onConnect}>
                Reconnect
              </ButtonCommon>
            )}

            {!connectionItem && (
              <ButtonCommon icon={<ICPayments.Connection />} onClick={onConnect} loading={creating}>
                Connect
              </ButtonCommon>
            )}
          </FlexBox>
        </FlexBox>
      </Card>
    );
  }
);

export const AddFriendForm: React.FC<AddFriendFormProps> = () => {
  const [currentAccount] = useAtom(currentAccountAtom);
  const [searchedAccounts, setSearchedAccounts] = useState<AccountResponse[]>([]);
  const [accountConnects, setAccountConnects] = useState<AccountConnectionResponse[]>([]);

  const { mutateAsync: searchAsync, isPending: searchLoading } = usePaymentHttpCommand<AccountGetAllSearchResponse>({
    onSuccess(data) {
      setSearchedAccounts(data.items);
    }
  });

  const { mutateAsync: getConnectAsync, isPending: connectionLoading } =
    usePaymentHttpCommand<AccountConnectionGetAllResponse>({
      onSuccess(data) {
        setAccountConnects(data.items);
      }
    });

  const { mutateAsync: createAsync, isPending: creating } = usePaymentHttpCommand<AccountConnectionResponse>();

  // 🔹 Search handler
  const onSearch = useCallback(
    async (email: string) => {
      await searchAsync({
        url: urlConstant.account.accountUrl,
        requestOptions: { method: "GET", queryParams: { email } }
      });

      await getConnectAsync({
        url: urlConstant.connection.accountConnectionGetAllUrl,
        requestOptions: { method: "GET", queryParams: { email } }
      });
    },
    [searchAsync, getConnectAsync]
  );

  // 🔹 Connect / Reconnect handler
  const handleSubmit = useCallback(
    async (account: AccountResponse, index: number) => {
      await createAsync({
        url: urlConstant.connection.accountConnectionUrl,
        requestOptions: {
          method: "POST",
          body: { accountRequestId: currentAccount?.id, accountAcceptId: account.id }
        }
      });

      setSearchedAccounts((prev) => prev.filter((_, i) => i !== index));
    },
    [createAsync, currentAccount?.id]
  );

  // 🔹 Memoized account cards list
  const accountCards = useMemo(() => {
    return searchedAccounts.map((account, index) => {
      const connectionItem = accountConnects.find(
        (ac) => ac.accountAcceptId === account.id || ac.accountRequestId === account.id
      );
      return (
        <AccountCard
          key={account.id}
          account={account}
          connectionItem={connectionItem}
          onConnect={() => handleSubmit(account, index)}
          creating={creating}
          connectionLoading={connectionLoading}
        />
      );
    });
  }, [searchedAccounts, accountConnects, handleSubmit, creating, connectionLoading]);

  return (
    <FlexBox direction="column" gap={12} padding={24}>
      <SearchInput onSearch={onSearch} />
      <FlexBox direction="column" gap={8} >
        {searchLoading
          ? Array.from({ length: 3 }).map((_, i) => <Card key={i} style={{ minHeight: 80, marginBottom: 8 }} loading />)
          : accountCards}
      </FlexBox>
    </FlexBox>
  );
};
