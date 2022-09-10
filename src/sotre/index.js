import { createStore } from 'vuex'

let user = JSON.parse(localStorage.getItem('user'))

export default createStore({
    state: () => {
        return {
            isDelete: user ? user.isDelete : "",
            isEdit: user ? user.isEdit : "",
            isAdd: user ? user.isAdd : "",
        }
    },
    mutations: {
        getUty(state) {
            user = JSON.parse(localStorage.getItem('user'))
            state.isDelete = user.isDelete,
                state.isEdit = user.isEdit,
                state.isAdd = user.isAdd
        }
    },
    actions: {
    },
    getters: {
    },
    modules: {
    }
})
