# API Gateway로 Qeury string을 포함한 RESTful API로 구현하기 


## API Gateway

API Gateway는 Client와 Service 사이에 있으면서 reverse proxy로 동작하면서 client에서 service로의 routing을 합니다. 또한 인증, SSL 처리, 보안과 관련 작업을 할 수 있습니다. 

## AWS Console로 구현하기 

### API Gateway 생성

[API Gateway 생성](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/create-apigw.md)에서는 API Gateway를 생성, 배포하고 Logging을 제공하며, 접속해서 동작확인 하는 방법에 대해 설명하고 있습니다.

### Query String 설정 

[RESTful API에 Query String 사용하기](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/query-string.md)에서는 Console에서 query string을 설정하고 배포하며, 실제 테스트한 결과를 확인합니다.

### Query Template 

[사용자 정의 Template](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/template.md)와 같이 별도의 tamplate를 지정하여 동작을 단순화 할 수 있습니다. 


## AWS CDK로 구현하기

[AWS CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용하여 구현하는 예제를 보여줍니다. 

### CDK로 인프라 설치 

typescript로 CDK를 구성합니다.

1) 소스 다운로드 

```c
$ git https://github.com/kyopark2014/apigw-rest-querystring
```

2) infra structure 설치하기

```c
$ cd cdk-restapi
$ cdk synth
$ cdk deploy
```
