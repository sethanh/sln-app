import {appConstant}  from './AppConstant'

const accountUrl = appConstant.apiUrl + "/Accounts" 
const getCurrentAccountUrl   = accountUrl + "/me" 
const googleLoginAccountUrl = accountUrl + "/google-login"

const paymentQrUrl = appConstant.apiUrl + "/PaymentQrs";
const paymentQrBankUrl = paymentQrUrl + "/banks";
const paymentQrCreateQr =  paymentQrUrl + "/qr";

export  const urlConstant = { 
    account: {
        accountUrl,
        googleLoginAccountUrl,
        getCurrentAccountUrl
    },
    paymentQr:{
        paymentQrBankUrl,
        paymentQrCreateQr
    }
} 