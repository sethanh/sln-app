import {appConstant}  from './AppConstant'

const accountUrl = appConstant.apiUrl + "/Accounts" 
const getCurrentAccountUrl   = accountUrl + "/me" 
const googleLoginAccountUrl = accountUrl + "/google-login"

const paymentQrUrl = appConstant.apiUrl + "/PaymentQrs";
const paymentQrBankUrl = paymentQrUrl + "/banks";
const paymentQrCreateQr =  paymentQrUrl + "/qr";

const photoUrl = appConstant.apiUrl + "/Photos";

const contactUrl = appConstant.apiUrl + "/Contacts";
const contactUpdateUrl = contactUrl + "/:id";
const contactDeleteUrl = contactUrl + "/:id";

export  const urlConstant = { 
    account: {
        accountUrl,
        googleLoginAccountUrl,
        getCurrentAccountUrl
    },
    paymentQr:{
        paymentQrBankUrl,
        paymentQrCreateQr
    },
    photo:{
        photoCreateUrl: photoUrl,
    },
    contact:{
        contactCreateUrl: contactUrl,
        contactGetAll: contactUrl,
        contactUpdateUrl: contactUpdateUrl,
        contactDeleteUrl: contactDeleteUrl
    }
} 