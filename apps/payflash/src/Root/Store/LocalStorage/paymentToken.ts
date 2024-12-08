import { appConstant } from '@my-monorepo/payflash/Constants'
import { setToken, getToken, removeToken } from '@my-monorepo/utils'

const setPaymentToken = (
    value: string
) => {
    return setToken(value, appConstant.appName)
}

const getPaymentToken = () => {
    return getToken(appConstant.appName)
}

const removePaymentToken = () => {
    return removeToken(appConstant.appName)
}

export const paymentToken = {
    setPaymentToken,
    getPaymentToken,
    removePaymentToken
};