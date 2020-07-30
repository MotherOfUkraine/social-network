const { default: axios } = require("axios")

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": "52f14339-bde6-4db4-9907-0081b4e95ba8"
        }
    }
)

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    }
}

export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const followAPI = {
    getUnfollow(userId) {
        return instance.delete(`follow/${userId}`).then(res => res.data)
    },
    getFollow(userId) {
        return instance.post(`follow/${userId}`).then(res => res.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photo) {
        const formData = new FormData()
        formData.append('image', photo)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put('/profile', profile)
    }
}


export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}

