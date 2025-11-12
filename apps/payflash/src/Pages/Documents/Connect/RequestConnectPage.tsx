import {
  AccountConnectionGetAllResponse,
  AccountConnectionResponse,
  AccountGetAllSearchResponse,
  AccountResponse
} from "@my-monorepo/payflash/Models";
import { FlexBox } from "@my-monorepo/ui";
import { Input, Spin } from "antd";
import { useState, useCallback, memo, useEffect } from "react";
import { usePaymentHttpCommand } from "@my-monorepo/payflash/Root";
import { urlConstant } from "@my-monorepo/payflash/Constants";
import { AccountCard } from "./Components/AccountCard";

const { Search } = Input;

export interface AddFriendFormProps {
  onSuccess?: () => void;
}

// ✅ Memoized Search Input
const SearchInput = memo(({ onSearch }: { onSearch: (value: string) => void }) => (
  <Search placeholder="Enter email to search..." onSearch={onSearch} />
));




export const RequestConnectPage: React.FC<AddFriendFormProps> = () => {
    const [textSearch, setTextSearch] = useState<string>("");
    const [searchedAccounts, setSearchedAccounts] = useState<AccountResponse[]>([]);
    const [accountConnects, setAccountConnects] = useState<AccountConnectionResponse[]>([]);

    const { mutateAsync: searchAsync, isPending: searchLoading } = usePaymentHttpCommand<AccountGetAllSearchResponse>();

    const { mutateAsync: getConnectAsync, isPending: connectionLoading } =
        usePaymentHttpCommand<AccountConnectionGetAllResponse>({
        onSuccess(data) {
        setAccountConnects(data.items);
      }
    });

  const handleConnect = useCallback(
    async () => {
      const [searches, connects] = await Promise.all([
                    searchAsync({
                        url: urlConstant.account.accountUrl,
                        requestOptions: { method: "GET", queryParams: { email: textSearch } }
                    }),
                    getConnectAsync({
                        url: urlConstant.connection.accountConnectionGetAllUrl,
                        requestOptions: { method: "GET", queryParams: { email: textSearch } }
                    })
                ]);

                    setSearchedAccounts(searches?.items || []);
                    setAccountConnects(connects?.items || []);
                
    },
    [getConnectAsync, searchAsync, textSearch]
  );


    useEffect(() => {

        if (textSearch.trim().length === 0) {
            return;
        }

        const fetchData = async () => {
            try {
                const [searches, connects] = await Promise.all([
                    searchAsync({
                        url: urlConstant.account.accountUrl,
                        requestOptions: { method: "GET", queryParams: { email: textSearch } }
                    }),
                    getConnectAsync({
                        url: urlConstant.connection.accountConnectionGetAllUrl,
                        requestOptions: { method: "GET", queryParams: { email: textSearch } }
                    })
                ]);

                setSearchedAccounts(searches?.items || []);
                setAccountConnects(connects?.items || []);
                
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();

    }, [textSearch]);


  return (
    <FlexBox direction="column" gap={12} padding={24}>
      <SearchInput onSearch={setTextSearch} />
      <Spin spinning={searchLoading || connectionLoading}>
        <FlexBox direction="column" gap={8} > 
            { searchedAccounts.map((account) => (<AccountCard key={account.id} account={account} connections={accountConnects} onConnect={handleConnect} />))}
        </FlexBox>
      </Spin>
    </FlexBox>
  );
};
