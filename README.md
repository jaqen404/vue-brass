# vue-brass

brass integration for vue

brass 的 vue 插件

先要安装[brass](https://github.com/jaqen404/brass)

## 安装

```bash
yarn add @jaqen404/vue-brass
```

or

```bash
npm install @jaqen404/vue-brass
```

## 使用

```js
// store.js
import { createVueStore } from "@jaqen404/vue-brass";
const state = {
    count: 1,
    people: {
        name: "tom",
        age: 11,
    },
};
const getters = {
    doubleCount: (state: State) => state.count * 2,
};
const mutations = {
    add: (amount: number) => (state: any) => {
        state.count += amount;
    },
    changeName: (name: string) => (state: any) => {
        state.people.name = name;
    },
};
const actions = {
    doAsync: (a: number, b: number) => async (mutations: any) => {
        await new Promise((resolve: any) => {
            setTimeout(resolve, 3000);
        });
        mutations.sum(a, b);
        return a + b;
    },
};
export const useFirstStore = createVueStore(
    "firstStore",
    state,
    getters,
    mutations,
    actionss
);
```

```vue
<template>
    <div>
        <div @click="handleClick">{{ store.doubleCount }}</div>
        <div @click="handleClickName">{{store.people.name}}</div>
        <div @click="handleClick">{{ store.count }}</div>
    <div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useFirstStore } from "../store/main";
export default defineComponent({
    name: "IndexPage",
    setup() {
        const store = useFirstStore();
        const handleClick = () => {
            store.add(1);
        };
        const handleClickName = () => {
          store.setState(state => {
            state.people.name = state.people.name + state.count;
          })
        }
        return { handleClick, handleClickName, store };
    },
});
</script>
```
