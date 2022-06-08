import { reactive } from "vue";
import { createStore } from "@jaqen404/brass";
import { Store } from "./model";

export const useStore = (store: Store, strict: boolean) => {
  const { initialState, brassData$, setState } = store;
  let vueStore: any = reactive(
    strict
      ? {
          state: initialState,
        }
      : {
          state: initialState,
          setState,
          ...store.mutations,
          ...store.actions,
        }
  );
  brassData$.subscribe((newData: any) => {
    vueStore.state = newData.state;
    vueStore.getters = newData.getters;
    vueStore = Object.assign(vueStore, newData.state, newData.getters);
  });
  return vueStore;
};

export const createVueStore = (
  name: string,
  initialState: any,
  getters: any,
  reducers: any,
  mutations: any,
  strict = false
) => {
  const brass = createStore(name, initialState, getters, reducers, mutations);
  return () => useStore(brass, strict);
};
