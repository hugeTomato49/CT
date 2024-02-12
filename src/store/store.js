import { createStore } from "vuex"
import treeModule from "./treeModule"
import sizeModule from "./sizeModule"

const store = createStore({
    modules: {
        tree: treeModule,
        size: sizeModule
    }

})

export default store

