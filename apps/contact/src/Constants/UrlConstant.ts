import {appConstant}  from './AppConstant'


const contactUrl = appConstant.apiUrl + "/Contacts";
const contactProfileUrl = contactUrl+ "/by-profile-name";

export  const urlConstant = { 
    contact:{
        contactCreateUrl: contactUrl,
        contactGetAll: contactUrl,
        contactByProfileName: contactProfileUrl
    }
} 