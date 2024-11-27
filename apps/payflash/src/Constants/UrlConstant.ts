import {appConstant}  from './AppConstant'

const accountUrl = appConstant.apiUrl + "/Accounts" 
const googleLoginAccountUrl = accountUrl + "/google-login"

export  const urlConstant ={ accountUrl, googleLoginAccountUrl} 