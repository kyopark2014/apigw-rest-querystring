# API Gateway로 Qeury string을 포함한 RESTful API로 구현하기 

## AWS Console로 구현하기 

### API Gateway 생성

[API Gateway 생성](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/create-apigw.md)에서는 API Gateway를 생성, 배포하고 Logging을 제공하며, 접속해서 동작확인 하는 방법에 대해 설명하고 있습니다.

### Query String 설정 

[RESTful API에 Query String 사용하기](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/query-string.md)에서는 Console에서 query string을 설정하고 배포하며, 실제 테스트한 결과를 확인합니다.

## AWS CDK로 구현하기

[AWS CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용하여 구현하는 예제를 보여줍니다. 

### CDK 초기화 

typescript를 사용하기 위해 아래와 같이 CDK를 초기화 합니다. 

```c
$ cdk init app --language typescript
```
