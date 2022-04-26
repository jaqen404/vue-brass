
import { reactive } from 'vue'
import { createStore } from '@jaqen404/brass'
import { Store } from './model'

export const useStore  = (store: Store) => {
  const {initialState, brassData$} = store
  let vueStore: any = reactive({ state: initialState, ...store.actions, ...store.mutations })
  brassData$.subscribe((newData: any) => {
    vueStore.state = newData.state;
    vueStore.getters = newData.getters;
    vueStore = Object.assign(vueStore, newData.state, newData.getters)
  })
  return vueStore
}

export const createVueStore = (name: string, initialState: any, getters: any, reducers: any, mutations: any ) => {
  const brass = createStore(name, initialState, getters, reducers, mutations)
  return () => useStore(brass)
}