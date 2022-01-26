import { uniqBy } from '@/utils/uniqBy'
import FileService from '../services/files.service'

const initialState = {
    studyDocs: [],
    infoDocs: [],
    studyDocsFileTree: null,
    page: 1,
}

export const files = {
    namespaced: true,
    state: initialState,
    actions: {
        searchStudyDocs({ commit }, query) {
            return FileService.getStudyDocs(query).then(
                (studyDocs) => {
                    commit('searchStudyDocsSuccess', studyDocs)
                    return Promise.resolve(studyDocs)
                },
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
        newSearchStudyDocs({ commit }, query) {
            commit('refreshStudyDocs')
            return FileService.getStudyDocs({
                page: this.state.page,
                ...query,
            }).then(
                (studyDocs) => {
                    commit('searchStudyDocsSuccess', studyDocs)
                    return Promise.resolve(studyDocs)
                },
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
        getStudyDocs({ commit }, query) {
            return FileService.getStudyDocs({
                page: this.state.page,
                ...query,
            }).then(
                (studyDocs) => {
                    commit('getStudyDocsSuccess', studyDocs)
                    return Promise.resolve(studyDocs)
                },
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
        addStudyDoc(_, studyDoc) {
            return FileService.addStudyDoc(studyDoc).then(
                (newStudyDoc) => Promise.resolve(newStudyDoc),
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
        addInfoDoc(_, infoDoc) {
            return FileService.addInfoDoc(infoDoc).then(
                (newInfoDoc) => {
                    Promise.resolve(newInfoDoc)
                },
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
        getStudyDocsTree({ commit }, query) {
            return FileService.getStudyDocsTree(query).then(
                (fileTree) => {
                    commit('getStudyDocsTreeSuccess', fileTree)
                    Promise.resolve(fileTree)
                },
                (error) => {
                    console.log(error)
                    return Promise.reject(error)
                },
            )
        },
    },
    mutations: {
        refreshStudyDocs(state) {
            state.studyDocs = []
            state.page = 1
        },
        searchStudyDocsSuccess(state, studyDocs) {
            state.studyDocs = uniqBy([...state.studyDocs, ...studyDocs], (a, b) => a.id === b.id)
            state.page++
        },
        getStudyDocsSuccess(state, studyDocs) {
            state.studyDocs = studyDocs
        },
        getStudyDocsTreeSuccess(state, fileTree) {
            state.studyDocsFileTree = fileTree
        },
    },
}
