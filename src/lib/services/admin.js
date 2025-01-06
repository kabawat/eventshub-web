import URLs from '@/lib/endpoints';
import { ServiceAccessAPI, ServiceUnAuthAPI } from "./"

// login 
export const LoginService = async (payload) => {
    try {
        const res = await ServiceUnAuthAPI.post(URLs?.LOGIN, payload)
        return res.data
    } catch (error) {
        throw error
    }
}
export const FetchEventsService = async (payload) => {
    try {
        const { page = 1 } = payload
        const res = await ServiceUnAuthAPI.get(`${URLs?.EVENTS}/?page=${page}`)
        return res.data
    } catch (error) {
        throw error
    }
}
export const FetchEventService = async (payload) => {
    try {
        const { id } = payload
        const res = await ServiceAccessAPI.get(`${URLs?.EVENTS}/${id}/admin`)
        return res.data
    } catch (error) {
        throw error
    }
}
export const createEventsService = async (payload) => {
    try {
        const res = await ServiceAccessAPI.post(`${URLs?.EVENTS}/`, payload)
        return res.data
    } catch (error) {
        throw error
    }
}
export const updateEventsService = async (payload, id) => {
    try {
        const res = await ServiceAccessAPI.put(`${URLs?.EVENTS}/${id}`, payload)
        return res.data
    } catch (error) {
        throw error
    }
}
export const dropEventsService = async (id) => {
    try {
        const res = await ServiceAccessAPI.delete(`${URLs?.EVENTS}/${id}`,)
        return res.data
    } catch (error) {
        throw error
    }
}