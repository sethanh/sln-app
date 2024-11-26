import { GoogleOutlined } from '@ant-design/icons';
import { GoogleAuthLogin, IGoogleTokenResponse } from '@my-monorepo/ui'
import { paymentApiFetch } from '@my-monorepo/payflash/Root'
import { IRequestOptions } from 'packages/utils/src/services/IRequestOptions';
import { googleLoginAccountUrl } from '@my-monorepo/payflash/Constants'
import { TokenModel } from '@my-monorepo/payflash/Models'; 

export const GoogleLogin: React.FC = () => {
  const onHandleSuccess = async (token: IGoogleTokenResponse) => {

    var option: IRequestOptions = {
      method: 'POST',
      body: {
        accessToken : token.access_token
      }
    }

    const login = await paymentApiFetch<TokenModel>(
      googleLoginAccountUrl, 
      option, 
      () => { }, 
      () => { },
    );

    console.log('login', login);
  }


  return (
    <div>
      <h1>Custom Google Login Example</h1>
      <GoogleAuthLogin 
        onHandleSuccess={onHandleSuccess} 
        onHandleError={() => { console.log('error') }}
        onHandleClose={()=> {console.log('cloud')}}
      >
        {(login) => (
          <div
            onClick={login}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4285F4',
              color: 'white',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              width: 'fit-content'
            }}
          >
            <GoogleOutlined />
            <div style={{ marginLeft: 8 }}> Sign in with Google </div>
          </div>
        )}
      </GoogleAuthLogin>
    </div>
  );
};