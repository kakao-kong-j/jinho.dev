---
layout: post
title: "2019 AWS Summit Seoul 참관기 day 1 / 2"
author: "jinho hong"
categories: development
tags: [aws, development, meetup]
image: 2019-04-17-aws-Summit-Seoul.jpg
---

---

2019 AWS Summit Seoul 참관기 day 1 / 2
(본 글은 JunMyeong Lee님 과 함께 작성하였습니다.)
Blended Backend 팀이 2019 AWS Summit Seoul 에 다녀왔습니다.

---

Intro
2019.04.17(수) 서울 코엑스 컨벤션 센터에서 진행된 AWS Summit Seoul에 참가하였습니다. 17일 에는 클라우드 기술의 미래를 조망할 수 있는 기조 연설과 함께 엔터프라이즈 고객, 스타트업 고객과 개발자, 그리고 금융, 미디어, 게임, 유통, 제조, 하이테크, 공공기관 업종에서 공통으로 고민하고 필요로 하는 기술 주제와 경험에 관하여 이야기를 나누었습니다.
Sessions
타 게임사의 경험으로 본 AWS 핵심 모범 사례 한방에 배우기
슬라이드 : ( 추후 업데이트 )
Agenda
On-Premise 환경에서 AWS 로 옮길때 고려해야 할 점들
On-Premise 환경에서 AWS 로 옮길때 기존 환경과 달라지는 점들
On-Premise 환경에서 AWS 로 옮길때 꼭 주의해서 확인해야 할 점들
On-Premise 환경에서 AWS 로 옮길때 Tip

AWS 로 옮기기 전에
반드시 AWS Best Practice를 확인해 봐야 합니다.
모든 서비스는 죽지 않지 않는다. -> 연사자 분이 직접 하신 말입니다.
고객은 AWS 상에서 직접 테스트 수행을 해야 합니다.
자신의 서비스의 특성을 이해하고 어떤 구조를 잡아야 하는지 확인해야 합니다.
가능한 상세한 지표 및 로그를 수집해야 합니다. 공유 책임 제도에 따르면 문제의 원인에 따라 AWS 와 고객의 책임 소재가 달라짐으로 원인을 파악하기 위해서 로그가 중요합니다.
모범 사례
Region

서비스의 종류에 따라서 선택폭이 매우 넓습니다. 첫째로 속도가 중요한 서비스라면 Multi Region 을 사용하여 가까운 Region 이나 속도가 빠른 Region을 이용할 수 있습니다. 
둘째로 사용하는 Region에서 지원하는 서비스도 중요한 요인입니다. 해당 내용은 AWS Region Table에서 볼 수 있습니다.
셋째로 Region간의 가격 차이도 중요한 요소입니다. 가장 가격이 낮은 Region과 비싼 Region의 차이가 최대 20%까지 차이가 날 수도 있습니다. 
마지막으로 Region의 규모도 큰 요인입니다. 하지만 Region의 공개되어있지 않지만, 서비스 제공 갯수 , Lambda init concurrency , AZ 의 갯수 등으로 추론해볼 수 있습니다.
EC2
Instance Type에따라 가격이 다르고 용도가 다릅니다.
EX) DB server 는 IOPS, Web Server 는 NetWork 나 CPU 소모량이 중요합니다.
AutoScaling 을 통해 비용 절감을 노려 보는 것도 좋습니다. User의 수에 따라 미리 Testing 을 진행 하면 AutoScaling 을 적용하기 좋습니다.
S3
이전에는 Prefix 와 같은걸로 성능 개선이 필요했지만, 지금은 개선됨에 따라 일반적으로 사용하시면 됩니다.. 
자주 사용하는 S3는 CloudFront 를 사용하면 좋습니다.
aws configure set default.s3.max_concurrenct_requests60 와 같이 s3 concurrenct 제한을 풀 수도 있습니다.
Shield
DDOS 공격은 서비스의 치명적인 취약점이 될 수 있습니다. 
Cloud Front + Route 53 를 사용하면 초 이내에 감지 가능합니다.
하지만 Cloud Front 을 사용하려면 Http 기반의 통신만 가능합니다. 만약 TCP 와 같은 통신 방법에서는 Shield 를 사용하면 됩니다. 
Shield는 DDOS 공격에 대해서 가시적으로 보여주고 DRT 와 1:1 맞춤 지원이 가능합니다.

Perfecting the Media Workflow Experience on AWS
슬라이드 : ( 추후 업데이트 )
다양한 회사의 AWS를 활용한 Media Process를 소개하는 세션이었습니다! Media Process라는 다소 무거운 작업들이 이제는 cloud의 영역까지 넘어왔음을 강조하며, 추가적인 contents 또한 AWS를 통해서 충분히 제작이 될 수 있다는 것을 알 수 있었습니다. 개인적으로는 영어라고 해도 어려운 내용은 없었고 즐겁게 들을 수 있었습니다.
인상 깊었던 예시는 Cloud에서의 Render Farm이었습니다. asset 저장용 S3와, graphic에 특화된 g3 등의 instance 만으로 구성된 인프라 구조는 간단하면서도 유연성을 보여줬습니다. AWS Image Recognition 등을 활용해서 영상에서 확장된 콘텐츠 제작하는 예시들도 흥미로웠습니다. 축구에서 영상의 내용을 자동으로 추정하는 사례부터 결혼식에 참석한 유명인 자동인식 기술까지 영상 관심이 있는 개발자라면 볼만한 내용이었습니다.
기조연설

슬라이드 : ( 추후 업데이트 )
Netflix 에서 아키텍쳐 디자인을 맡았던 Adrian Cockcroft 의 Amazon의 현재와 미래에 대해서 자세히 이야기 해주었습니다.
맛있는 도시락 :)
AWS상에서 블록체인 서비스 구축 및 활용가이드 대방출!
슬라이드 : ( 추후 업데이트 )
본 세션에서는 AWS 신 기술인 AWS Managed Blockchain에 대한 소개와 AWS를 통한 Blockchain 구축 사례인 Luniverse를 소개하였습니다.
세션에서는 블록체인에 대한 간략한 소개가 있었고, 나아가 블록체인이 앞으로 발전될 방향 중 하나로 BaaS(Blockchain as a Service)를 제시하였습니다. 그리고 그 서비스에서 힘을 발휘할 수 있는 기술로 AWS Managed Blockchain을 다루었습니다.
AWS Managed Blockchain은 지난번에 있었던 2018 re:Invent에서 소개된 신기술로, 누구나 블록체인 생태계를 쉽게 구축할 수 있도록 하는 기술입니다. 세션에서 기술의 장점을 기술의 스택과 연계 지어서 설명했기에 블록체인 구축 시 어려움을 겪은 사람들은 와닿을 만한 내용이었습니다.
또한 Lambda256에서 AWS를 활용한 blockchain 서비스 사례인 Luniverse에 대한 소개가 있었습니다. 메인 체인과 사이드 체인의 구조가 현재 저희가 서비스하고 있는 COSM과 CosmoPower의 구조와 유사해서 그런지는 몰라도 이해하기 쉬웠으며, 구조가 합리적으로 받아들여졌습니다. 서비스적인 관점에서 사용자에게 친숙하게 다가가는 구조라는 점에서 BaaS의 특징 또한 드러나서 앞선 기술 소개 사례와 연결되는 좋은 발표였습니다.
AWS를 통한 빅데이터 활용 고객 분석 및 캠페인 시스템 구축 사례
슬라이드 : ( 추후 업데이트 )
Redshift를 통해서 데이터 분석 시스템을 구축하는 사례를 설명하는 세션이었습니다! Redshift를 통해서 기존의 전통적 분석에서의 단점을 어떻게 쇄신할 수 있었는지, Data warehouse의 구축에 해당 기술이 어떠한 이점을 가지는지 설명하는 자리였습니다.
다음엔 더 빨리 와서 앉아있어야겠다는 것을 느낀 사진현대 h.point를 해당 redshift를 통해서 구축한 실 사례를 소개하는 자리 또한 있었습니다. Redshift를 도입하는 데 있어서의 과정, 적용 그리고 평가를 상세히 소개해줘서 배울 것이 많았던 발표였습니다. 개발 계획부터 시작해서 Redshift에 대한 평가, 실제 작업과 작업 이후의 feedback까지 다루었기에 이후에 기술을 사용한다고 했을 때에도 참고할 수 있을 것 같습니다
AWS System Manager: Parameter Store를 사용한 AWS 구성 데이터 관리 기법
슬라이드 : ( 추후 업데이트 )
Agenda
System Management System (이후 SSM) 을 사용하는 이유
Parameter Store 의 개념
AWS 배포시 Secret Key 들의 관리 방법
Parameter Store 활용
System Management System (이후 SSM) 을 사용하는 이유
Resouce Group : Infra 가 복잡해 질 경우 Tagging 및 Group 을 활용하여 다수의 Resource 를 손쉽게 관리
SSM-Agent : instance 에 ssh 로 직접 접근하지 않고 SSM-Agent 를 이용하여 미리 지정한 Command 를 작동할 수 있습니다 .
EX) 보안 업데이트, 패키지 설치
Parameter Store
비밀 번호 및 구성 데이터 관리를 중앙 집중식으로 관리 합니다.
데이터의 Value 는 암호화, 일반텍스트 로 저장가능 합니다.
계정에 종속된 Single Managed Key-Value Store입니다.
별도의 과금은 없습니다. 하지만 배포용으로만 사용하는 것을 권장합니다. 초당 요청 제한이 있습니다.
path 로 regex할 수 있음으로 / 로 구분 하면 좋습니다.
AWS 배포시 Secret Key 들의 관리 방법과 위험성
과거의 배포시 Git 에서 Code 를 Clone 하여 배포하는 방식을 사용했으나 Git 저장소에 민감한 정보들이 기록 되어 있어서 보안상 취약하였습니다. 그래서 12 factor 에서 code Build + config 를 합하여 배포 하는 것을 권장하였습니다.
Parameter Store 활용
Versioning
KMS 암호화를 사용해 언제 누가 복호화를 했는지 알 수있습니다. 또한 Chamber 를 사용하면 매우 손쉽게 Parameter Store 를 활용할 수 있습니다.
최근 Update로 ECS 에서 환경변수를 Parameter Store 에서 직접 가져오는 기능이 추가되었습니다.
기존에 Key 관리를 AWS SecretManager 를 사용하였는데 beijing Region을 사용하면서 다른 서비스를 찾던 중에 Parameter Store에 대해서 설명을 들을 수 있어서 좋았습니다.

Terraform을 기반한 AWS 기반 대규모 마이크로서비스 인프라 운영 노하우
슬라이드 : ( 추후 업데이트 )
Agenda
블록 처럼 모듈을 조립하면 복잡한 서비스를 만들 수 있다.
Iac 를 통한 대규모 마이크로 서비스 인프라 운영
운영을 고려한 Terraform 코드 구조화
Terraform 모듈 코드 테스트
MicroService 와 Infrastructure/Operation
MicroService architecture 의 구조를따르면서 다수의 팀이 다수의 Service(약 100개)를 관리하면서 다양한 문제가 발생하였습니다. 예를 들어 초보자 부터 전문가 까지 다양한 기술 수준과 개발환경이 존재 하여 폭발 반경 제한 및 권한 관리에 어려움이 있었습니다. 
또한 개발 및 운영 일관성 유지 하기 어려운 환경에서 Terraform module 을 적극적으로 활용하여 일관성을 유지하기 위해서 노력하였습니다.
Terraform 과 Test
Terraform Module을 사용하면서 Terraform Version, AWS Region 과 같이 같은 Module 이라고 하더라도 같은 결과가 나오지 않기 때문에 Test의 필요성을 느끼게 되었습니다.
Kitchen-terraform 을 이용하여 CI 상에서 Test를 할 수 있습니다.
이때 Test에 활용한 library 는 아래 표에서 보실 수 있습니다.

현재 CosmoChain 에서도 Terraform을 사용하고 있는데 앞으로 저희가 Infra가 복잡해지면 마주할 문제를 먼저 고민한 정보를 들어서 굉장히 관심이 많이 갔습니다. 특히 Iac 도 Unit Test 가 필요하다는 점은 매우 공감이 가서 집중해서 들었던 발표였습니다.
Summary
AWS Summit Seoul이 5주년을 맞이했다는 것을 실감할 수 있었던 알찬 첫 번째 날이었습니다. Cloud에 있어서 흐름을 주도하고 있는 AWS이니만큼 소개할 새로운 기술들이 많았으며, 해당 기술을 활용한 사례 또한 끝이 없이 많았습니다.
오늘 Summit에서 주로 느꼈던 점은 다양한 기업에서의 사용 사례를 통해 Cloud가 가진 저력을 볼 수 있었다는 것입니다. Keynote에서 소개해줬던 롯데나 삼성 등 대기업의 활용 사례가 있었으며, 스타트업의 활용 사례 또한 곳곳의 세션에 포함되어 있었습니다. 기술들이 "누구나" "쉽고" "유연하게" 구성될 수 있다는 것이 피부로 느껴지는 하루였습니다.
내일 하루도 AWS Summit Seoul에 참가합니다! 내일은 특히 기술 세션들이 한층 더 많기에 부푼 기대를 안고 내일 또 블로그에서 찾아뵙겠습니다!
