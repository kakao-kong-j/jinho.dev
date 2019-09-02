---
layout: post
title: "[TWIL] DynamoDB Deep Dive"
author: "jinho hong"
categories: development
tags: [development, twil, javascript]
image: regret.jpg
---

## **NoSQL 설계의 두 가지 주요 개념**

NoSQL 디자인에는 RDBMS 디자인과 다른 사고 방식이 요구됩니다. RDBMS의 경우, 액세스 패턴을 생각하지 않고 정규화된 데이터 모델을 생성할 수 있습니다. 그런 후 나중에 새로운 질문과 쿼리에 대한 요구 사항이 생길 때 이를 확장할 수 있습니다. 각 데이터 유형을 고유의 테이블에 구성할 수 있습니다.

**NoSQL 설계는 다릅니다.**

- **대조적으로 DynamoDB의 경우, 대답해야 할 질문을 알기 전까지는 스키마 디자인을 시작할 수 없습니다. 사전에 비즈니스 문제와 애플리케이션 사용 사례를 이해해야 합니다.**

![](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/images/AccessPatternList.png)

- **DynamoDB 애플리케이션에서는 가능한 적은 수의 테이블을 유지해야 합니다. 대부분의 잘 설계된 애플리케이션은 단 하나의 테이블만** 요구합니다.
- 1 application - 1 Table

  - 가격의 개선
    - table 삭제는 무료
    - TTL은 무료
      - 그러므로 모든 데이터에 TTL을 추천
  - 데이터 무결성
    - Transaction이 생겼지만 DynamoDB내에 비동기적 요소때문에 무결성이 깨질 수 도 있습니다.
  - composite key

  ![](https://d2908q01vomqb2.cloudfront.net/887309d048beef83ad3eabf2a79a64a389ab1c9f/2018/10/04/sort-keys-dynamodb-5.gif)

  `[country]#[region]#[state]#[county]#[city]#[neighborhood]`

## REFERENCE

[https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-modeling-nosql-B.html](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-modeling-nosql-B.html)

[https://aws.amazon.com/ko/blogs/database/using-sort-keys-to-organize-data-in-amazon-dynamodb/](https://aws.amazon.com/ko/blogs/database/using-sort-keys-to-organize-data-in-amazon-dynamodb/)

[https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-sort-keys.html](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-sort-keys.html)

[https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-general-nosql-design.html](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/bp-general-nosql-design.html)
