import { urlConstant } from "@my-monorepo/contact/Constants";
import { ContactResponse } from "@my-monorepo/contact/Models";
import { useContactHttpQuery } from "@my-monorepo/contact/Root";
import { FlexBox } from "@my-monorepo/ui";
import { DigitalBusinessCard } from "./Components/DigitalBusinessCard";
import { Row, Spin } from "antd";
import './HomePage.css';


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
    <Spin spinning={isLoading}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '16px', position: 'relative', background:'linear-gradient(145deg, #f6f5fdff, #e5e5f3ff)' }}>
        <div className="bgh-1"/>
        <div className="bgh-2"/>
        <div className="bgh-3"/>
        <div className="bgh-4"/>
        <div className="bgh-5"/>
        <div className="bgh-6"/>
        <FlexBox flex={1} width={'100%'} height={'100%'} alignItems="center" justifyContent="center" direction="column">
          <FlexBox flex={1} direction="column">
            <DigitalBusinessCard contact={contact} />
          </FlexBox>
        </FlexBox>
      </Row>
    </Spin>
  );
};