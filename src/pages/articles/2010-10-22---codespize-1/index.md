---
title: 거침없는 자바스크립트 1회
date: '2019-10-22T00:00:00.000Z'
layout: post
draft: false
path: '/posts/Async-Codespitz-1/'
category: 'Development'
tags:
  - 'CodeSpitz'
  - 'Javascript'
description: ''
---

# JavaScript Pipeline

Code => Transpiler => Packaging => CI => Deploy

- 하지만 현재 스터디에서는 Code level 만 공부함
  - `ES11` 로 진행함
    - Why? => JS 생태계는 빠르게 변화하고 있고 최신 문법은 개선됨 점이 많음으로 ES11 로 진행

# What is JS

- ECMAScript Standard
  - version 과 연도가 1차이 => ES6 === ES2015
  - ES11 최종 조정중
- 새롭게 반영될 내용은 Stage0~3까지 단계별 승격, 정식 반영시 Stage4 가 됨

# ES6?

- What's new?
  - Class, Object Literal 을 추가
    - getter, setter
  - Arrow Function
  - Iterator, Generator, For of
  - Const let
  - destructuring
  - Template String
  - Symbol, Promsie, Map, Set

# How about ES 7~10, Stage 3

- What's new?
  - `[a,...[b,...c]]` 중첩된 rest 문
  - async/await shared memory, atomics
    - worker thread patten
      - Thread 간의 통신에서는 객체의 생성으로 통신하기 때문에 동시성 문제가 없어짐
      - 하지만 느림
      - 그래서 shared memory 생김 -> 그래서 atomics 가 필요함
  - object 해체, asynchronous iterators
    - asynchronous iterators 강의의 주요 주제
  - optional catch
  - (stage 3) BigInt , globalThis, top level await, class field, private field/method, optional chaing, nullish coalescing(??),WeakReference

# What is Programming?

- Think Basic
  - Language code => Machine Language => File => Load => Run => Terminate
  - 좋은 설계는
    - 변경사항 및 수정사항이 생겼을때 변경되는 파일 갯수가 적을 수록 좋은 설계
- Runtime Execution
  - Loading
    - memory에 명령과 값을 적제
  - instruction fetch & decoding
    - instruction : CPU 가 해석할 수 있는 명령
    - decoding : 적제시에는 저장에 용이한 형태로 저장 -> Fetch -> 연산에 유리한 형태
  - execution
    - 제어 유닛 -> 연산 유닛 <- 데이터 유닛
  - 폰 노이만 머신
    - 위 구조로 움직이는 컴퓨터를 폰 노이만 머신이라 부름
- 이걸 좀 더 현실적으로 생각한다면 Run을 생각한다면
  - essential definition loading
    - 중요한 언어 Level 코드가 올라감
  - vtable mapping
    - 실제 컴파일러가 컴파일 할 때 가상의 메모리를 사용
  - run
  - runtime definition loading (반복)
    - 실제 작성한 코드
  - run (반복)

# Flow Control

- Jump 라는 명력어가 있기 때문에
- Sync Flow: 메모리에 적재된 명령이 순차적으로 실행
- Sync Flow Control: Goto를 통해 명령의 위치를 이동함
  - 명령의 분기의 조건은 메모리의 값
    - condition check
- Sub Flow: 함수등을 통해 별도의 명령셋을 실행

# Blocking

- 노이만 머신은 한번 실행되면 건들일 수 없음
  - Sync Flow 가 실행되는 동안 다른 일은 할 수 없는 현상
- 실제로 non Blocking은 존재하지않음
- 그래서 Blocking을 줄이기
  - sync flow 를 짧게 하기
  - 현실적으로 불가능
- 다른 Thread 에 syncFlow를 넘기기
  - main thread 는 항상 짧게 만들어야함
  - 제어권을 확보하기 위해서
- 이벤트 루프
  - 다른 Thead 의 결과 를 받을 때까지 main Thead를 종료하지 않고 기다리면서 loop를 돔
- non blocking
  - sync Flow가 납득할 만한 시간내에 종료되는 것

# Sync & Async

- Sync : 서브루틴이 즉시 값을 반환함
- Async : 서브루틴이 다른 수단으로 값을 반환함
  - Timing 중요하지 않음, 수단이 중요
  - ex. Promise, callback function, async iterations
- Async 의 단점
  - 호출결과가 즉시 반환되지 않으므로 현재의 sync flow가 종료됨
  - 그 결과 현재의 어휘공간 내의 상태를 결과 시점에 사용할 수 없음
- Sync + Async
  - sync 로직으로 async 를 사용할 수 있게 함
  - 하지만 sync flow 가 어긋나므로 이전 sync flow 의 상태를 기억하여 이어줄 장치 필요
  - 상태를 기억하고 이어주는 장치 = continuation
  - 이를 활용한 프로그래밍 스타일 - Continuation Passing Style
