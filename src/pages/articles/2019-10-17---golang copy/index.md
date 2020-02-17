---
title: golang 입문
date: '2019-10-17T00:00:00.000Z'
layout: post
draft: false
path: '/posts/go-lanh/'
category: 'Development'
tags:
  - 'AWS'
description: 'golang 입문'
---

# 유니코드 직접 처리

- 글자 시작 byte의 index를 가져온다.
  - 타 언어의 경우 문자열의 대한 글자의 index를 가져온다.
  - 그래서 index를 그냥 가져오면 안되고 Byte 를 계산하여 가져와야 합니다.
  - 1Byte 씩 보게되면 ASCII 코드를 읽게 된다.

# if

- 괄호 사용 X
- 본문은 중괄호 필요

# map

- hashtable hashmap dictionary
  - 순서를 보장하면 hashtable 보장하지 않으면 hashmap
  - key로는 ==로 비교 가능한 모든 타입 사용가능
  - Go lang 은 존재하지 않은 index에 접근하면 기본적인 값이 들어 있음
    - ex. `make(map[string]int)`

# os.Open

- file 과 error 을 반환
  - Go의 일반적인 문법

# http.Get , fetch

- http.Get은 구조체 resp로 반환
- fetch
  - 동시에 여러 URL을 가져오기 때문에 전체 처리시간은 각 시간의 함이 아니라 가장 오래 걸릴 때의 시간이 됨
    - JS 의 `Promise.all` 과 유사
    - go routine 사용

# go thread

- OS thread 위에 경량화된 goroutine을 생성할 수 있습니다.

# Tip

- `fmt.Println` 라이브러리의 메소드는 항상 대문자로 시작
  - Why? that method is public
- 패키지명은 항상 소문자
- package 선언 다음에 import 이 나올 수 있다.
- 매개변수의 타입은 변수명 뒤에 명시
-
