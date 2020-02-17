---
title: Lambda 단! 한개로 만드는 On-demand Image Resizing
date: '2018-08-06T00:00:00.000Z'
layout: post
draft: false
path: '/posts/lambdaedge/'
category: 'Development'
tags:
  - 'AWS'
  - 'Lambda'
  - 'LambdaEdge'
description: '이미지 사이즈 변환을 람다 한개를 이용해서 구현해 봅시다'
---

## Intro

시스템 구현에서 생각보다 까다로운 문제가 이미지 리소스 관리입니다. 그중 하나는 다양한 사이즈의 리사이징에 대한 요구입니다. 이 때 해결책은 크게 2가지로 나뉩니다. 미리 원하는 사이즈의 이미지를 생성하는 방식과 사용자가 요청 할 때 마다 리사이즈 하는 방식입니다.

첫번째 방식 같은 경우, 100 x 100, 150 x 150, 200 x 200 인 이미지 사이즈를 사용하는 웹사이트라면 1000장의 원본 사진이 있을 때 최대 4000장의 이미지를 저장해야 하는 문제가 있습니다. 또한 요구사항이 바뀌어 300x300의 이미지가 필요하게 되었을때에는 이미 존재하는 이미지를 300x300의 형태로 resizing해야하는 문제가 있습니다.

이와는 달리 on-demand resizing은 사용자의 요청이 있을 때 원본 사진을 resizing 합니다. On-demand resizing에도 단점이 있습니다. 매번 요청 할때마다 이미지를 resizing하는 cost가 적지 않다는 점입니다. 하지만 이는 caching 으로 꽤 많은 부분 해결이 가능합니다. 사용자가 이미지를 요청하면 먼저 CloudFront에서 해당하는 이미지가 있는지 확인한 다음 resizing을 하게 해서 이미지 resizing에 대한 cost를 줄이는 방l법을 사용하도록 하겠습니다.

서론이 너무 길었죠? 이제 본론으로 들어가 보도록 하겠습니다. On-demand image resizing 에는 두가지 AWS 도구가 사용되는데요 첫번째로는 Lambda@edge가 사용됩니다. Lambda 는 익숙해도 Lambda@edge는 익숙하지 않으신 분들이 많으실 것 같습니다 ( 제가 그랬어요 ㅠㅠ). 먼저 Lambda@edge 에 대해서 알아보겠습니다.

## Lambda@edge 란?

한 리전에서 함수를 작성한 후 최종 사용자에게 가까운 전 세계 AWS 리전에서 서버를 프로비저닝하거나 관리하지 않고 그러한 함수를 실행할 수 있습니다. 저희는 이 Lambda@edge 를 활용하여 유저의 가까운 엣지 리전으로 부터 리사이즈한 이미지를 불러오는 작업을 진행하겠습니다. 즉 CloudFront에 접근 할 때 마다 작동 되는 Lambda 를 의미합니다. 하지만 특정한 경우에 사용 되는 Lambda이기 때문에 Lambda@edge만의 제한사항이 있습니다.

### Lambda@edge 제한사항

Lambda@edge는 기본적으로 Lambda의 구조를 가져가지만 몇가지 제약사항이 있습니다.

- 버젼을 선언해야 합니다. 단 별칭은 사용할 수 없습니다.
- us-east-1 으로 리전만 허용합니다.
- 다른 계정의 CloudFront에 사용할 수 없습니다.
- 권한 설정을 해야합니다.
- VPC와 연결할 수 없습니다
- 환경변수를 사용 할 수 없습니다
- Dead Letter Queue를 사용할 수 없습니다.
- Viewer Response/Request Lambda는 메모리 128 mb, timeout 5초, response size 40 kb, Lambda size 1mb의 제한이 있습니다.

## Lambda@edge 권한 설정

Lambda@edge는 기본적인 Lambda의 권한도 필요하지만 Lambda@edge용 Trust Relationship가 필요합니다. 또한 저희가 사용하는 AWS 리소스들에 대한 Permissions(정책)이 필요합니다.

### Permissions

- lambda:GetFunction
- lambda:EnableReplication
- iam:CreateServiceLinkedRole
- cloudfront:UpdateDistribution or cloudfront:CreateDistribution
- s3:GetObject
- s3:PutObject
- s3:PutObjectAcl

- Trust Relationship

```
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Principal": {
            "Service": [
               "lambda.amazonaws.com",
               "edgelambda.amazonaws.com"
            ]
         },
         "Action": "sts:AssumeRole"
      }
   ]
}
```

수고하셨습니다! 이제 고지까지 얼마 남지 않았습니다!

CloudFront 설정을 해보도록 하겠습니다. 설정하기 전에 주의사항으로는 CloudFront는 한번 설정 할때 마다 최대 10 ~ 20 분 정도 시간이 걸릴 수 있습니다. 마음의 여유를 갖고 진행 하시기 바랍니다:)

![](https://cdn-images-1.medium.com/max/1600/1*VEOaocDBhuM5RWwgB7fHpw.png)

## CloudFront 설정

- `Origin Domain Name`: S3 Bucket을 지정합니다.
- `Restrict Bucket Access`: Yes를 선택합니다.

> S3 버킷에 CloudFront 만 접근할 수 있도록 설정하는 옵션입니다

- `Origin Access Identity`: Create a New Identity를 선택합니다.
- `Grant Read Permissions on Bucket`: Yes, Update Bucket Policy을 선택합니다.

> 자동으로 Bucket의 Policy를 설정해줍니다.

- `Query String Forwarding and Caching`: Forward all, cache based on whitelist을 선택합니다.

캐싱 기준으로 쿼리 문자열 파라미터 지정해 줍니다. [참고](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/QueryStringParameters.html)

- `Query String Whitelist`: d를 입력합니다.
- `Compress Objects Automatically`: Yes를 선택합니다.

> 콘텐츠를 압축합니다.
> 콘텐츠가 압축되면 파일 크기가 더 작아지므로- 다운로드 속도가 빨라집니다. 원래 크기의 1/4 이하로 줄어드는 경우도 있습니다.

위와 같이 cloudFront 를 설정해 주시면 준비가 완료 되게 됩니다.

## Lambda 생성

위 작업을 모두 마치셨다면 이제 Lambda를 생성할 순서입니다.저희는 4개 의 Lambda( Viewer Request&Response, Origin Request&Response)중에 Origin Response 만 사용해서 기능을 구현하도록 하겠습니다. 다른 예제를 보면 ViewerRequest를 사용하는 경우가 많습니다. ViewerRequest를 사용하는 경우에는 OriginResponse 때에 resize한 이미지를 저장하여 다른 S3에 저장하게 됩니다. 그리고 ViewerRequest에서 S3에서 resize한 이미지를 검색하는 방식을 사용합니다. 하지만 이번 글에서는 더욱 simple하게 CloudFront에서 사용하는 cache만 사용하여 기능을 구성하도록 하겠습니다.

먼저 Nodejs 프로젝트 부터 생성하도록 하겠습니다.

프로젝트를 생성 하고자 하는 경로로 이동한 후 아래의 순서를 맞추어 진행하시면 됩니다.

`npm init -yes`

또한 저희가 이미지 resize를 하기위한 라이브러리인 sharp 를 설치하도록 하겠습니다.

`npm install sharp`

다만 sharp 빌드 환경을 Lambda 환경으로 진행해야 합니다.

아래의 명령어를 이용해 sharp를 Lambda환경에 맞게 설치할 수 있습니다.

```bash
rm -rf node_modules/sharp
docker run -v "$PWD":/var/task lambci/lambda:build-nodejs10.x npm install sharp
```

마지막으로 아래의 js 파일을 생성해 주시면 됩니다.

```js
const querystring = require("querystring");
const AWS = require("aws-sdk");
const Sharp = require("sharp");

const S3 = new AWS.S3({
  region: "<your region name>"
});
​
const BUCKET = "<your bucket name>";
​
exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;
​
  const request = event.Records[0].cf.request;
  const params = querystring.parse(request.querystring);
  if (!params.d) { // example.com?d=100x100 의 형태가 아닐경우에는 원본 이미지를 반환합니다.
    callback(null, response);
    return;
  }
  const uri = request.uri;
​
  const imageSize = params.d.split("x");
  const width = parseInt(imageSize[0]);
  const height = parseInt(imageSize[1]);
​
  const [, imageName, extension] = uri.match(/\/(.*)\.(.*)/);
​
  const requiredFormat = extension == "jpg" ? "jpeg" : extension;// sharp에서는 jpg 대신 jpeg사용합니다
  const originalKey = imageName + "." + extension;
  try {
    const s3Object = await S3.getObject({ // S3에서 이미지를 받아 옵니다.
      Bucket: BUCKET,
      Key: originalKey
    }).promise();
​
    const resizedImage = await Sharp(s3Object.Body)
      .resize(width, height)
      .toFormat(requiredFormat)
      .toBuffer();
​
    response.status = 200;
      //cache 에서 이미지를 찾지 못한 경우 이기 때문에 404가 발생하게 됩니다. 하지만 저희가 예상했던 동작이기 때문에 200 으로 반환하도록 하겠습니다.
    response.body = resizedImage.toString("base64");
    response.bodyEncoding = "base64";
    response.headers["content-type"] = [
      { key: "Content-Type", value: "image/" + requiredFormat }
    ];
    return callback(null, response);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
```

고생하였습니다! 거의 준비가 완료되었습니다.

생성된 index.js 와 node_modules를 index.zip으로 압축해 주시면 됩니다.

es-east-1 리전의 Lambda를 생성 해주시면 됩니다.
Role은 상단에서 정의한 Role을 사용하면 됩니다.
생성후 code entry type ( 코드 입력 유형)에서 .zip 을 선택 후 위에서 생성한 index.zip을 업로드 하시면 됩니다.
그 후 저희가 생성한 CloudFront 에서 Behaviors 로 에서 Lambda Function Associations 의 Event Type 은 Origin Response , 그리고 저희 가 생성한 Lambda와 버전을 기입하면 모든 준비가 완료 되었습니다.
그럼 CloudFront 에서 제공한 url 로 접근하시면 됩니다.
d34zhongjinho12.cloudfront.net/image.jpg?d=100x100 과 같이 접근하시면됩니다.

재접속을 하시면 아래와 같이 Cache가 적용되는 것을 확인하실 수 있습니다.

![](https://media.giphy.com/media/26DOoDwdNGKAg6UKI/giphy.gif)

축하합니다!
드디어 On-demand image resizing이 완성 되었습니다!

Client에서 원하는 사이즈의 이미지를 제공할 수 있습니다.

# conclusion

이번 Post에서는 간단하게 Lambda@edge를 활용하여 On-demand image resizing를 구현해 보았습니다.

어려우셨나요? Lambda@edge와 CloudFront를 활용한다면 cache를 자유자재로 활용할 수 있으며 Global 서비스에도 강점이 있습니다.

Lambda@edge와 CloudFront를 이용해서 새로운 서비스를 구현해 보세요~
