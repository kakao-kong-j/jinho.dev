---
title: AWS Well Architected Framework
date: '2020-01-01T00:00:00.000Z'
layout: post
draft: true
path: '/posts/AWS_Well-Architected_Framework/'
category: 'Development'
tags:
  - 'AWS'
description: ''
---

본 글은 [AWS Well Architected Framework](https://d1.awsstatic.com/whitepapers/architecture/AWS_Well-Architected_Framework.pdf) 글을 공부의 목적으로 정리해놓은 글입니다.


# 일반적인 설계 원칙

Well-Architected Infrastructure 는 다음과 같은 설계 원칙으로 이루어집니다.

### 시스템 수용 능력 추측 중단

인프라에 대한 추측을 제거해야합니다. 수용력이 필요한 시스템에 수용 능력에 대한 결정을 내릴때 값비싼 리소스를 사용해야 합니다. 하지만 클라우드 컴퓨팅과 함께라면 그 문제점은 사라집니다. 시스템이 필요한 만큼 리소스를 사용하면서 리소스 확장과 수축을 자동으로 관리할 수 있습니다.

### 프로덕션 규모의 테스트 시스템

클라우드에서는 프로덕션 규모의 테스트 환경을 구축할 수 있습니다. 필요에 따라 테스트 환경을 테스트하고 테스트를 완료한 다음 테스트 환경이 실행 중일 때만 비용을 지불하므로 저렴한 가격으로 구축할 수 있습니다.

### 아키텍처 개발을 쉽게하기 위해 자동화

저렴한 비용으로 시스템으로 시스템을 생성 및 복제를 하여 수동 작업에 대한 비용을 줄일 수 있습니다. 자동화로 변경 사항을 추적하고, 배포로 인한 영향을 파악하고, 필요시 롤백을 할 수 있습니다.

### 진화하는 아키텍처

전통적인 환경에서는 아키텍쳐 설계는 불변하고 일시적인걸로 생각하곤합니다. 하지만 비지니스와 설계에 영향을 주는 요소들이 변화함에 따라 초기 결정한 시스템의 변화는 필수적입니다. 클라우드에서는 


### 데이터를 이용해 아키텍처를 작동

### Game Day의 활용
