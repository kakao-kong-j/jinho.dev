---
layout: post
title: "Graphql Directives"
author: "jinho hong"
categories: developemt
tags: [development, twil, graphql]
image: graphql-directives.jpg
---

## Graphql Directives 란 무엇이고 왜 필요 할까요?

[GraphQL](https://graphql.github.io/graphql-spec/June2018/#sec-Language.Directives)

위 글에서 보면 Directives 를 이렇게 설명 하고 있습니다.

> Directives provide a way to describe alternate runtime execution and type validation behavior in a GraphQL document.

즉

1. 관심사의 분리
2. 반복되는 코드
3. Graphql layer 에서만 활용 가능 or 활용시 유용한 기능
4. SDL 를 통한 FrontEnd 과의 소통시 장점

## 언제 사용할 수 있을까요?

- Cache
- Authorization
- Masking
- String conversion
- Limit
- ...

## We already Use

`directive @cacheControl(maxAge: Int) on OBJECT | FIELD_DEFINITION`

저희가 graphql 을 사용하고 있을때 자주 사용되는 [Apollo server](https://www.apollographql.com/docs/apollo-server/)에 함께 쓰이는 [apollo-cache-control](https://www.apollographql.com/docs/apollo-server/performance/caching/) 를 활용하는 방법중 하나인 `@cacheControl` 입니다.

저희가

# Default Directives

### skip / inculde

    query book($yes:Boolean!,$no:Boolean!){
      books{
        title @skip(if:$no)
        author @include(if:$yes)
      }
    }

    # varialbe
    {"yes":true,"no":false}

### deprecated

    type Book {
        title: String @auth()
        author: String @cache
        user: String @deprecated(reason: "Field is replace author")
      }

      type Query {
        books: [Book]
      }

### Custom directive

[Schema directives | GraphQL Tools](https://www.apollographql.com/docs/graphql-tools/schema-directives.html)

[lirown/graphql-custom-directives](https://github.com/lirown/graphql-custom-directives)

[teamplanes/graphql-rate-limit](https://github.com/teamplanes/graphql-rate-limit)
