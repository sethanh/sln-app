import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'
import styled from 'styled-components'
import { DropboxOutlined, GoogleOutlined, JavaOutlined } from '@ant-design/icons'
import { FlexBox, GoogleAuthLogin, GoogleAuthProvider, IGoogleTokenResponse, TextCommon } from '@my-monorepo/ui'
import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants'
import { IRequestOptions } from 'packages/utils/src/services/IRequestOptions'
import { paymentApiFetch } from '@my-monorepo/payflash/Root'
import { TokenModel } from '@my-monorepo/payflash/Models'
import { paymentToken } from '@my-monorepo/payflash/Root'
import { useNavigate } from "react-router"

// Styled Components for the Layout
const LoginPageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: #eef6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;

  h1 {
    color: #3a8dff;
    margin-top: 2rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #7a7a7a;
  }

  img {
    max-width: 80%;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;

  .ant-form-item {
    margin-bottom: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .ant-btn {
    width: 100%;
  }

  .social-login {
    margin: 1rem 0;
  }

  .register-link {
    margin-top: 1rem;
  }
  display: flex;
  flex-direction: column;
`;


const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const onFinish = (values: unknown) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log('Failed:', errorInfo);
    };

    const onHandleSuccess = async (token: IGoogleTokenResponse) => {

        const option: IRequestOptions = {
            method: 'POST',
            body: {
                accessToken: token.access_token
            }
        }

        const login = await paymentApiFetch<TokenModel>(
            urlConstant.googleLoginAccountUrl,
            option,
            () => { },
            () => { },
        );

        if (login) {
            paymentToken.setPaymentToken(login.accessToken)
            navigate('/');
        }
    }

    return (
        <LoginPageContainer>
            <GoogleAuthProvider clientId={appConstant.googleClientId}>
                <Container>
                    <LeftPanel>
                        <DropboxOutlined style={{color:'#084396', fontSize: 122}}/>
                        <h1>Platform for Payment Success</h1>
                        <p>Intelligent · Efficient · Effortless</p>
                    </LeftPanel>
                    <RightPanel>
                        <LoginBox>
                            <FlexBox direction='column' alignItems='center' padding={16} borderRadius={8} >
                                <JavaOutlined style={{color:'#084396', fontSize: 52}}/>
                                <TextCommon color='#084396'>Flash</TextCommon>
                                <TextCommon color='#022250'>PLATFORM FOR FINANCIAL</TextCommon>
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
                                    <Button type="primary" htmlType="submit">
                                        Log in
                                    </Button>
                                </Form.Item>

                                <div className="social-login">or</div>
                                <GoogleAuthLogin
                                    onHandleSuccess={onHandleSuccess}
                                    onHandleError={() => { console.log('error') }}
                                    onHandleClose={() => { console.log('cloud') }}
                                >
                                    {(login) => (
                                        <Button
                                            type="default" icon={<GoogleOutlined />}
                                            block
                                            onClick={login}
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
    );
};

export { LoginPage };
