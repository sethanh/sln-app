import {GoogleAuthLogin, IGoogleTokenResponse} from '@my-monorepo/ui'

export const GoogleLogin: React.FC = () => {
    return (
      <div>
        <h1>Custom Google Login Example</h1>
        <GoogleAuthLogin onHandleSuccess={(token: IGoogleTokenResponse)=>{console.log(token)}} onHandleError={()=> {console.log('error')}}>
          {(login) => (
            <button
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
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                alt="Google Logo"
                style={{ width: '20px', height: '20px', marginRight: '10px', verticalAlign: 'middle' }}
              />
              Sign in with Google
            </button>
          )}
        </GoogleAuthLogin>
      </div>
    );
  };