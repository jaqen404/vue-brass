export interface Brass {
  name: string,
  state$: Observable<any>, 
  actions: {[key: string]: any}, 
  getters$: Observable<any>, 
  setState: any, 
  brassData$: Observable<any>
}