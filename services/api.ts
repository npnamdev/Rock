import api from '../utils/axiosConfig';


export const loginUser = (email: string, password: string) => {
    return api.post(`api/v1/auth/login`, { email, password });
}

export const registerUser = (username: string, email: string, password: string) => {
    return api.post(`api/v1/auth/register`, { username, email, password });
}

export const verifyEmailAddress = (token: string) => {
    return api.get(`api/v1/auth/verify-email?token=${token}`);
}
