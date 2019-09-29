---
layout: post
title: "한 단계씩 배워보는 GraphQL"
author: "jinho hong"
categories: development
tags: [development, graphql, nodejs]
image: graphql.png
---

# 소개

- GraphQL은 처음 발표될 때 단순한 사양으로 발표되었습니다. 그래서 GraphQL은 다양한 방법으로 실행할 수 있습니다. 이러한 특징은 숙련자들에게는 유연한 방식이지만 처음 GraphQL을 접하는 사람들에게는 혼란을 줄 수 있는 지점인 것 같습니다. 그래서 이번 글에서는 기본적인 Graphql 라이브러리와 Express로 간단한 서버를 구현해보고 라이브러리를 추가 하면서 코드를 수정하는 방향으로 진행해 보도록 하겠습니다.

- Prerequisites
  먼저 NodeJS 가 필요합니다. 만약 설치가 안 돼 있으시다면 [여기](https://nodejs.org/ko/)에서 LTS로 다운 받으시면 됩니다.

##Basic Graphql with Express

먼저 저희가 사용할 패키지를 설치하도록 하겠습니다.

`npm i graphql express express-graphql`

- express-graphql은 손쉽게 express랑 graphql를 연결해 주는 패키지입니다.
  또한 graphql을 보기 편하게 하도록 사용하는 graphiql를 쉽게 사용할 수 있도록 해줍니다.

```js
//app.js
const express = require("express");
const graphqlHTTP = require("express-graphql");
const Graphql = require("graphql");
const fakeDatabase = require("./fakedata.js");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL server");
```

- 위와 같이 express-graphql 실행 하면 express-graphql를 사용해서 손쉽게 구현했습니다.

물론, 아직 schema를 정의하지 않아서 작동하지 않습니다. :)
이제 Schema와 Type을 정리해 보도록 하겠습니다.
작성할 코드에서 제일 중요한 부분은 GraphQLSchema입니다. 이곳에서 스키마의 정의와 resolve 함수의 구현 등이 일어납니다.
첫째로, 스키마의 정의는 GraphQL에서 Object의 하위 정보의 형식을 정의합니다.
스키마를 정의할 때는 name과 fields 가 필요합니다.
fields는 GraphQLObject내부의 데이터의 형태를 정의합니다.

```js
const geoType = new Graphql.GraphQLObjectType({
  name: "geo",
  fields: {
    lat: { type: Graphql.GraphQLFloat },
    lng: { type: Graphql.GraphQLFloat }
  }
});
```

둘째로, resolve는 실제 쿼리될때 작동하는 함수입니다.
만약 GraphQLSchema가 스키마만 정의되어 있다면 값을 반환받을 수 없습니다. 그래서 resolve가 필요합니다.
resolve는 추상적으로 구현된 스키마와 서버의 기능을 실제 쿼리될때 작동하게 하는 함수입니다.

```js
allUser: {
type: new Graphql.GraphQLList(userType),
resolve: function(_,_,_,_) {
return fakeDatabase;
}
}
```

이번 포스트에서 사용될 데이터는 여기에서 참조했습니다.
실제 fakedata 구현 파일은 여기에서 확인하시기 바랍니다.

서버를 실행하고 http://localhost:4000/graphql 로 들어 가 보시기 바랍니다
이제 Grahpiql로 정상적으로 실행됩니다. 이제 Graphiql에 아래 코드를 실행해 보시기 바랍니다.

이제 작동됩니다.
하지만 Graphql.GraphQLString와 같은 타입과 resolve가 맘에 들지 않는군요.
이제 새로운 패키지를 더해 봅시다.

## Add Graphql package

저희가 추가할 패키지는
graphql-custom-types,graphql-tools 입니다.
graphql-custom-types는 많이 사용하는 형태를 미리 정의해 두었습니다.

```js
email: {
  type: GraphQLEmail;
}
website: {
  type: GraphQLURL;
}
```

위 사진과 같이 타입을 손쉽게 정할 수 있습니다.
graphql-tools에서는 스키마와 resolve를 분리해 주는 구조를 만들어 주는 패키지입니다.
npm install graphql-custom-types graphql-tools
그럼 수정해 보도록 하겠습니다.

위 코드는 이전 코드와 동일하게 동작합니다.
하지만 라인수는 83Line에서 70Line 으로 감소하고 GraphqlString과 같은 생소한 타입이 아니라 String과 같이 직관성이 높은 방식으로 전환 되었습니다. 또한 Typedef 와 Resolver를 분리해서 관리함으로 큰 단위의 프로젝트시 효율적으로 관리할 수 있습니다.

# Apollo Server

Apollo를 사용하게 되면 일반적으로는 관리하기 어려운 조건들을 쉽게 관리할 수 있게 됩니다. 예를 들어 Subscriptions 를 사용하거나 아니면 Cache를 이용하는 등의 다양한 도구나 모듈을 손쉽게 사용할 수 있습니다.
또한 Apollo는 Client에도 사용할 수 있는 프레임워크이지만 우리는 서버기준에서 Apollo를 사용하도록 하겠습니다.

이제 수정해 봅시다!

위 코드로 수정을 하고나면 Graphiql로 쿼리시 각 쿼리별로 추적및 모니터링을 할 수있습니다.
모니터링을 하고 있는 모습또한 Apollo Engine을 사용하게되면 프론트엔드와의 연결, 배포, 추적, 인증, 캐쉬와 같은 작업을 손쉽게 처리할 수 있습니다. (위 작업을 할려면 Apollo에서 api키를 받으시면 됩니다.)
Express뿐만아니라 koa,Hapi,Lambda와 같은 다른 프레임워크에도 적용하여 사용할 수 있습니다.
결론
Graphql은 처음에 단순한 방법 혹은 사양으로만 발표되었기 때문에 다양한 접근방법이 있어 접근하기 어렵다는 특징이 있습니다. 하지만 하나하나 해내다 보면 자신과 자신의 프로젝트에 맞는 방법을 찾게 되고 이전에 다른 방식보다 나은 경험을 줄 수 있다고 생각합니다.
위 글을 통해서 많은 사람이 Graphql에 접근하는데 조금이라도 도움이 되셨으면 합니다.
긴글 읽어 주셔서 감사합니다.
