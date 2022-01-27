import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class PostsService {
    getStudyDocs(query) {
        return axios
            .get(`${API_URL}/files/study-docs`, {
                data: query,
                withCredentials: true,
                headers: { Accept: 'application/json' },
            })
            .then((res) => res.data.items)
    }

    getInfoDocs(query) {
        return axios
            .get(`${API_URL}/files/info-docs`, {
                data: query,
                withCredentials: true,
                headers: { Accept: 'application/json' },
            })
            .then((res) => res.data.items)
    }

    addStudyDoc(data) {
        return axios
            .post(`${API_URL}/files/study-docs`, data, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data)
    }

    addInfoDoc(data) {
        return axios
            .post(`${API_URL}/files/info-docs`, data, {
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data)
    }

    getStudyDocsTree(query) {
        return axios
            .get(`${API_URL}/files/study-docs/categories`, {
                params: { categories: query },
                withCredentials: true,
                headers: { Accept: 'application/json' },
            })
            .then((res) => res.data)
    }

    getInfoDocsTree(query) {
        return axios
            .get(`${API_URL}/files/info-docs/categories`, {
                params: { categories: query },
                withCredentials: true,
                headers: { Accept: 'application/json' },
            })
            .then((res) => res.data)
    }

    downloadFile({ url, label }) {
        return axios
            .get(url, {
                responseType: 'blob',
                withCredentials: true,
            })
            .then((response) => {
                const blob = new Blob([response.data])
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = label
                link.click()
                URL.revokeObjectURL(link.href)
            })
            .catch(console.error)
    }
}

export default new PostsService()
