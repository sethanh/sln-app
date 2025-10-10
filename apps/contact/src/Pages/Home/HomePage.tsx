import { urlConstant } from "@my-monorepo/contact/Constants";
import { ContactResponse } from "@my-monorepo/contact/Models";
import { useContactHttpQuery } from "@my-monorepo/contact/Root";
import { Block, FlexBox } from "@my-monorepo/ui";
import { DigitalBusinessCard } from "./Components/DigitalBusinessCard";
import { Spin } from "antd";


interface HomeProps {
    domain: string;
}

export function HomePage(props: HomeProps) {
    const slugToQuery = props.domain ?? "";

    const { data: contact, isLoading } = useContactHttpQuery<ContactResponse>({
        url: urlConstant.contact.contactByProfileName,
        method: "GET",
        queryParams: {
            profileName: slugToQuery
        }
    }
    );

    return (
      <Block width={'100vw'} height={'100vh'}>
        <Spin spinning={isLoading}>
          <FlexBox flex={1} width={'100%'} height={'100%'} alignItems="center" justifyContent="center">
            <DigitalBusinessCard contact={contact}/>
          </FlexBox>
        </Spin>
      </Block>
    );
};