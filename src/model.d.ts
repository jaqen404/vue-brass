export interface Store {
  name: string,
  state$: Observable<any>, 
  actions: {[key: string]: any}, 
  mutations: {[key: string]: any}, 
  getters$: Observable<any>, 
  setState: any, 
  brassData$: Observable<any>,
  initialState: any,
}