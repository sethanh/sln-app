import {appConstant}  from './AppConstant'

const accountUrl = appConstant.apiUrl + "/Accounts" 
const getCurrentAccountUrl   = accountUrl + "/me" 
const accountDetail   = accountUrl + "/:id"
const googleLoginAccountUrl = accountUrl + "/google-login"
const AccountLogin = accountUrl + "/login"

const paymentQrUrl = appConstant.apiUrl + "/PaymentQrs";
const paymentQrBankUrl = paymentQrUrl + "/banks";
const paymentQrCreateQr =  paymentQrUrl + "/qr";
const paymentQrDeleteUrl =  paymentQrUrl + "/:id";
const paymentQrUpdateUrl =  paymentQrUrl + "/:id";

const photoUrl = appConstant.apiUrl + "/Photos";

const contactUrl = appConstant.apiUrl + "/Contacts";
const contactUpdateUrl = contactUrl + "/:id";
const contactDeleteUrl = contactUrl + "/:id";

const conversationUrl = appConstant.apiUrl + "/Conversations";
const conversationUpdateUrl = conversationUrl + "/:id";
const conversationDeleteUrl = conversationUrl + "/:id";

const chatMessageUrl = appConstant.apiUrl + "/ChatMessages";
const chatMessageUpdateUrl = chatMessageUrl + "/:id";
const chatMessageDeleteUrl = chatMessageUrl + "/:id";

export  const urlConstant = { 
    account: {
        accountUrl,
        googleLoginAccountUrl,
        getCurrentAccountUrl,
        accountDetail,
        AccountLogin
    },
    paymentQr:{
        paymentQrBankUrl,
        paymentQrCreateQr,
        paymentQrUrl,
        paymentQrUpdateUrl,
        paymentQrDeleteUrl
    },
    photo:{
        photoCreateUrl: photoUrl,
    },
    contact:{
        contactCreateUrl: contactUrl,
        contactGetAll: contactUrl,
        contactUpdateUrl: contactUpdateUrl,
        contactDeleteUrl: contactDeleteUrl
    },
    conversation:{
        conversationUrl,
        conversationUpdateUrl,
        conversationDeleteUrl
    },
    message: {
        chatMessageUrl,
        chatMessageUpdateUrl,
        chatMessageDeleteUrl
    }
} 