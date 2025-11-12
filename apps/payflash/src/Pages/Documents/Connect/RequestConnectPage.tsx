import { Col, Row } from "antd";
import { RequestConnectList } from "./RequestConnectList";
import { RequestConnectAction } from "./RequestConnectAction";
export interface RequestConnectProps {
  onSuccess?: () => void;
}


export const RequestConnectPage: React.FC<RequestConnectProps> = () => {

  return (
    <Row gutter={[12,12]}>
      <Col sm={24} md={12}>
      <RequestConnectAction/>
      </Col>
       <Col sm={24} md={12}>
      <RequestConnectList/>
      </Col>
    </Row>
  );
};
