import { Col, Row } from "antd";
import { RequestConnectList } from "./RequestConnectList";
import { RequestConnectAction } from "./RequestConnectAction";
export interface RequestConnectProps {
  onSuccess?: () => void;
}


export const RequestConnectPage: React.FC<RequestConnectProps> = () => {

  return (
    <Row gutter={[12,12]}>
      <Col  xs={24} sm={24} md={12}>
        <RequestConnectAction/>
      </Col>
      <Col  xs={24} sm={24} md={12}>
        <RequestConnectList/>
      </Col>
    </Row>
  );
};
