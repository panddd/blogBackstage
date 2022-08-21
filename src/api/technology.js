import http from '../utils/http'

//查询
export function technologypage(params) {
    return http({
        method: "get",
        url: "technology/page",
        params: params
    })
}

//传参查询
export function selectOne(data) {
    return http({
        method: "get",
        url: "/technology/" + data
    })
}

//增
export const addBlog = (params) => {
    return http({
        method: "post",
        url: "technology/add",
        data: params
    })
}

//文章管理
export const deleteBlog = (params) => {
    return http({
        method: "post",
        url: "technology/delete",
        data: params
    })
}

//改
export const updateBlog = (params) => {
    return http({
        method: "post",
        url: "technology/update",
        data: params
    })
}

//评论分页查询
export const selectComment = (params) => {
    return http({
        method: "get",
        url: "comment/page",
        params
    })
}

export const deleteComment = (params) => {
    return http({
        method: "post",
        url: "comment/delete",
        data: params
    })
}