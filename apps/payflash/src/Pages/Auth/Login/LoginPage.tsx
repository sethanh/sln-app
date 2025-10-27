import React, { useEffect, useMemo } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { JavaOutlined, DropboxOutlined, GoogleOutlined } from '@ant-design/icons';
import { FlexBox, GoogleAuthProvider, GoogleAuthLogin, TextCommon } from '@my-monorepo/ui';
import { usePaymentHttpCommand, paymentToken } from '@my-monorepo/payflash/Root';
import { urlConstant, appConstant } from '@my-monorepo/payflash/Constants';
import { TokenModel } from '@my-monorepo/payflash/Models';
import { IRequestOptions } from 'packages/utils/src/services/IRequestOptions';
import { IGoogleTokenResponse } from '@my-monorepo/ui';
import { useNavigate } from 'react-router';

const LoginPageContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #eef6ff, #f8fbff);
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #e3f0ff, #cde1ff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  .login-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem 0;
  }
`;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = usePaymentHttpCommand<TokenModel>({});
  const [form] = Form.useForm(); // ✅ cần để set lại giá trị

  // ✅ Lấy dữ liệu remember từ localStorage
  const defaultLogin = useMemo(() => {
    try {
      const saved = localStorage.getItem('flash_login');
      if (saved) {
        const parsed = JSON.parse(atob(saved));
        return {
          email: parsed.email || '',
          password: parsed.password || '',
          remember: parsed.remember ?? false,
        };
      }
    } catch {
      localStorage.removeItem('flash_login');
    }
    return { email: '', password: '', remember: false };
  }, []);

  // ✅ Fill lại form khi mount
  useEffect(() => {
    form.setFieldsValue(defaultLogin);
  }, [form, defaultLogin]);

  // ===== HANDLE LOGIN =====
  const onLogin = async (email: string, password: string) => {
    const option: IRequestOptions = { method: 'POST', body: { email, password } };
    const login = await mutateAsync({
      url: urlConstant.account.AccountLogin,
      requestOptions: option,
    });
    if (login) {
      paymentToken.setPaymentToken(login.accessToken);
      navigate('/');
    }
  };

  const onFinish = async (values: { email: string; password: string; remember?: boolean }) => {
    const { email, password, remember } = values;
    await onLogin(email, password);

    if (remember) {
      localStorage.setItem(
        'flash_login',
        btoa(JSON.stringify({ email, password, remember: true }))
      );
    } else {
      localStorage.removeItem('flash_login');
    }
  };

  // ===== GOOGLE LOGIN =====
  const onHandleSuccess = async (token: IGoogleTokenResponse) => {
    const option: IRequestOptions = { method: 'POST', body: { accessToken: token.access_token } };
    const login = await mutateAsync({
      url: urlConstant.account.googleLoginAccountUrl,
      requestOptions: option,
    });
    if (login) {
      paymentToken.setPaymentToken(login.accessToken);
      navigate('/');
    }
  };

  return (
    <LoginPageContainer>
      <GoogleAuthProvider clientId={appConstant.googleClientId}>
        <LeftPanel>
          <DropboxOutlined style={{ color: '#084396', fontSize: 122 }} />
          <h1>Platform for Payment Success</h1>
          <p>Intelligent · Efficient · Effortless</p>
        </LeftPanel>

        <RightPanel>
          <LoginBox>
            <FlexBox direction="column" alignItems="center" padding={16}>
              <JavaOutlined style={{ color: '#084396', fontSize: 52 }} />
              <TextCommon color="#084396">Flash</TextCommon>
              <TextCommon color="#022250">PLATFORM FOR FINANCIAL</TextCommon>
            </FlexBox>

            <div className="login-title">Log in to Flash</div>

            <Form
              form={form} // ✅ cần để có thể setFieldsValue
              name="login"
              onFinish={onFinish}
              autoComplete="off"
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

              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="#">Forgot password?</a>
             <FlexBox direction='column' gap={24}>
              <FlexBox/>
              <FlexBox/>
             </FlexBox>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending} block>
                  Log in
                </Button>
              </Form.Item>

              <div style={{ margin: '1rem 0', textAlign: 'center' }}>or</div>

              <GoogleAuthLogin
                onHandleSuccess={onHandleSuccess}
                onHandleError={() => console.log('error')}
                onHandleClose={() => console.log('closed')}
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
      </GoogleAuthProvider>
    </LoginPageContainer>
  );
};
