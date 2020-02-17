---
title: 거침없는 자바스크립트 3회
date: '2019-11-12T00:00:00.000Z'
layout: post
draft: false
path: '/posts/Async-Codespitz/'
category: 'Development'
tags:
  - 'CodeSpitz'
  - 'Javascript'
description: ''
---

1. dataloader를 generator 로 처리

```js
const dataloader = function*(f, ...urls) {
  for (const url of urls) {
    const json = yield fetch(url, { method: "GET" }).then(res => res.json());
    f(json);
  }
};
```

but `f` 와 데이터를 fetch 하는 부분이 같이 가지고 있음
단일 책임 원칙 위반

2. 실행부와 데이터 fetch 를 분리

```js
const dataloader = function*(f, ...urls) {
  for (const url of urls) {
    const json = yield fetch(url, { method: "GET" }).then(res => res.json());
    yield json
  }
};

const render =function(...urls){
    const iter =dataLoader(...urls);
    const next =({value,done})=>{
        if(!done){
            if(value instanceof Promise) value.then(v=>next(iter.next(x)))
            else{
                console.log(value)
                next iter.next()
            }
        }
    };
    next(iter.next())
}
```

3. async iterator

async example

```js
const render = async (...urls) => {
  for (const url of urls) {
    console.log(await await fetch(url, { method: "GET" }).json());
  }
};
```

```js
const dataLoader = async function*(...urls) {
  for (const url of urls) {
    yield await (await fetch(url, { method: "GET" })).json();
  }
};

const render = async function(...urls) {
  for await (const json of dataLoader(...urls)) {
    console.log(json);
  }
};
```

# Async yield\*

- generator 가 generator 를 부른다.
  - suspend가 중첩됨
  - lazy 함수의 연쇄
    - 성능 향상
    - new Array().map().forEach() 를 사용하면 . 을 사용할 때마다 새로운 Array를 생성
      - 이걸 lazy 함수의 연쇄를 사용하면 최적화 가능

```js
const urlLoader = async function*(url) {
  yield await (await fetch(url, { method: "GET" })).json();
};

const dataLoader = async function*(...urls) {
  for (const url of urls) yield* urlLoader(url);
};
```

# Generator 에게 변화하는 값을 주기 (passing param)

```js
const Url = class {
  #url;
  #opt;
  constructor(url, opt) {
    this.#url = url;
    this.#opt = opt;
  }
  async *load() {
    yield await (await fetch(this.#url, this.#opt)).json();
  }
};

let url = (url, opt = { methd: "GET" }) => new Url(url, Option);
```
