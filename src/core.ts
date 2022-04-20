
import { reactive } from 'vue'
import { createBrass } from '@jaqen404/brass'
import { Brass } from 'core.d.ts'

export const useStore  = (store: Brass) => {
  const {initialState, brassData$} = store
  const vueStore = reactive({ state: initialState, ...store.actions })
  brassData$.subscribe((newData: any) => {
    vueStore.state = newData.state;
    vueStore.getters = newData.getters;
  })
  return vueStore
}

export const createVueStore = (name: string, initialState: any, getters: any, reducers: any ) => {
  const brass = createBrass(name, initialState, getters, reducers)
  return () => useStore(brass)
}