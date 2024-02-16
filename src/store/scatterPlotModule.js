import axios from "axios"

const state = {
    plotWidth: 0,
    plotHeight: 0,
    plot_X_Scale: [],
    plot_Y_Scale: [],
    coordinateCollection: []

}

const mutations =  {
    UPDATE_PLOT_WIDTH(state, payload){
        state.plotWidth = payload
    },
    UPDATE_PLOT_HEIGHT(state, payload){
        state.plotHeight = payload
    },
    UPDATE_PLOT_X_SCALE(state, payload) {
        state.plot_X_Scale = payload
    },
    UPDATE_PLOT_Y_SCALE(state, payload) {
        state.plot_Y_Scale = payload
    },
    UPDATE_COORDINATE_COLLECTION(state, payload) {
        state.coordinateCollection = payload
    },


}

const actions = {
    getCoordinateCollection({state, commit, dispatch, rootState }){
        const dataset = rootState.tree.dataset
        const level_id_list = [...new Set(rootState.tree.selectionTree.map(node => node.level))]
        const timeRange = rootState.tree.timeRange
        axios.post('/api/coordinateCollection', {"dataset":dataset, "level_id_list": level_id_list, "timeRange": timeRange}).then((response) => {
            commit('UPDATE_COORDINATE_COLLECTION', response.data.coordinateCollection)
        })
        dispatch('updatePlotScale',state.coordinateCollection)

    },
    updatePlotScale({state, commit}, coordinateCollection){


    },
    updatePlotWidth({commit}, plotWidth){
        commit('UPDATE_PLOT_WIDTH', plotWidth)
    },
    updatePlotHeight({commit}, plotHeight){
        commit("UPDATE_PLOT_HEIGHT", plotHeight)
    }
}
const getters = {
    plotWidth: state => state.plotHWidth,
    plotHeight: state => state.plotHeight,
    plot_X_Scale: state => state.plot_X_Scale,
    plot_Y_Scale: state => state.plot_Y_Scale,
    coordinateCollection: state => state.coordinateCollection

    
}

const scatterPlotModule = {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}

export default scatterPlotModule