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
            // console.log("check MDS result")
            // console.log(response.data.coordinateCollection)
            commit('UPDATE_COORDINATE_COLLECTION', response.data.coordinateCollection) 
        })
        dispatch('updatePlotScale')  // step 1: use updated result of MDS coordinates to update computed scales(for each level)

    },
    updatePlotScale({state, commit}){
        // still step 1: update scale
        const coordinateCollection = state.coordinateCollection
        //the format of coordinateCollection: 
        //{
        //  level_id1: 
        //      [{node_id:?, x:?, y:?}, ...]},
        //  level_id2: 
        //      [{node_id:?, x:?, y:?}, ...]},
        //  ...
        // }
        // write a function in scale/scale.js using coordinates of each level, and plotHeight, plotWidth
        // import function to return multiple scales(每一个level一个xy scale), commit UPDATE_PLOT_X_SCALE and Y ...
        



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