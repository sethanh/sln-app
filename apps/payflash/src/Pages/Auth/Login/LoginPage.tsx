import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import { DropboxOutlined, GoogleOutlined, JavaOutlined } from '@ant-design/icons'
import { FlexBox, GoogleAuthLogin, GoogleAuthProvider, IGoogleTokenResponse, TextCommon } from '@my-monorepo/ui'
import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants'
import { IRequestOptions } from 'packages/utils/src/services/IRequestOptions'
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root'
import { TokenModel } from '@my-monorepo/payflash/Models'
import { paymentToken } from '@my-monorepo/payflash/Root'
import { useNavigate } from "react-router"

const LoginPageContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: linear-gradient(135deg, #eef6ff, #f8fbff);
  overflow: hidden;
  font-family: 'Gelion', Helvetica, Arial, sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #e3f0ff, #cde1ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  color: #084396;
  text-align: center;

  h1 {
    margin-top: 2rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    color: #4f596b;
  }

  img {
    max-width: 80%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    background: white;
  }
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
  background: #fff;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  .ant-form-item {
    margin-bottom: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .ant-btn {
    width: 100%;
  }

  .social-login {
    margin: 1rem 0;
    font-size: 0.9rem;
    color: #888;
  }

  .register-link {
    margin-top: 1rem;
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = usePaymentHttpCommand<TokenModel>({})

  const onFinish = (values: unknown) => console.log('Success:', values)
  const onFinishFailed = (errorInfo: unknown) => console.log('Failed:', errorInfo)

  const onHandleSuccess = async (token: IGoogleTokenResponse) => {
    const option: IRequestOptions = {
      method: 'POST',
      body: { accessToken: token.access_token },
    }
    const login = await mutateAsync({
      url: urlConstant.account.googleLoginAccountUrl,
      requestOptions: option,
    })
    if (login) {
      paymentToken.setPaymentToken(login.accessToken)
      navigate('/')
    }
  }

  return (
    <LoginPageContainer>
      <GoogleAuthProvider clientId={appConstant.googleClientId}>
        <Container>
          <LeftPanel>
            <DropboxOutlined style={{ color: '#084396', fontSize: 122 }} />
            <h1>Platform for Payment Success</h1>
            <p>Intelligent · Efficient · Effortless</p>
          </LeftPanel>
          <RightPanel>
            <LoginBox>
              <FlexBox direction="column" alignItems="center" padding={16} borderRadius={8}>
                <JavaOutlined style={{ color: '#084396', fontSize: 52 }} />
                <TextCommon color="#084396">Flash</TextCommon>
                <TextCommon color="#022250">PLATFORM FOR FINANCIAL</TextCommon>
              </FlexBox>

              <div className="login-title">Log in to Flash</div>

              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Email" type="email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Checkbox>Remember me</Checkbox>
                    <a href="#">Forgot password?</a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={true}>
                    Log in
                  </Button>
                </Form.Item>

                <div className="social-login">or</div>

                <GoogleAuthLogin
                  onHandleSuccess={onHandleSuccess}
                  onHandleError={() => console.log('error')}
                  onHandleClose={() => console.log('cloud')}
                >
                  {(login) => (
                    <Button
                      type="default"
                      icon={<GoogleOutlined />}
                      block
                      onClick={login}
                      loading={isPending}
                    >
                      Continue with Google
                    </Button>
                  )}
                </GoogleAuthLogin>
              </Form>
            </LoginBox>
          </RightPanel>
        </Container>
      </GoogleAuthProvider>
    </LoginPageContainer>
  )
}

export { LoginPage }
