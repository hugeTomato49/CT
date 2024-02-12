import { createStore } from "vuex"
import treeModule from "./treeModule"
import sizeModule from "./sizeModule"
import scrollModule from "./scrollModule"

const store = createStore({
    modules: {
        tree: treeModule,
        size: sizeModule,
        scroll: scrollModule
    }
})

export default store

