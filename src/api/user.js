import http from '../utils/http'

export const login = (params) => {
    return http({
        method: "get",
        url: "user/login",
        params: params
    })
}
