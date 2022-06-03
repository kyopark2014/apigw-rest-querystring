# API Gateway로 Qeury string을 포함한 RESTful API 구현하기 

API Gateway는 Client와 Service 사이에 있으면서 reverse proxy로 동작하면서 client에서 service로의 routing을 합니다. 또한 인증, SSL 처리, 보안과 관련 작업을 할 수 있습니다. 

## 1. AWS Console로 구현하기 

### API Gateway 생성

[API Gateway 생성](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/create-apigw.md)에서는 API Gateway를 생성, 배포하고 Logging을 제공하며, 접속해서 동작확인 하는 방법에 대해 설명하고 있습니다.

### Query String 설정 

[RESTful API에 Query String 사용하기](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/query-string.md)에서는 Console에서 query string을 설정하고 배포하며, 실제 테스트한 결과를 확인합니다.

### Query Template 

Template은 [VTL(Apache Velocity Template Language)](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html)을 이용하여 생성합니다. 

[사용자 정의 Template](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/template.md)와 같이 별도의 tamplate를 지정하여 원하는 동작을 수행 할 수 있습니다. 


## 2. AWS CDK로 구현하기

[AWS CDK](https://github.com/kyopark2014/technical-summary/blob/main/cdk-introduction.md)를 이용하여 Infrs Structure를 구성합니다. 

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

3) Lambda Invoke 이슈

[Lambda Invoke Error 처리 방안](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/lambdaInvokeError.md)을 따라 처리하면, Lambda Invoke 이슈를 해결하고 정상적으로 API Gateway를 통해 Lambda를 Invoke 할 수 있습니다.

## 3. 실행 결과 확인 

Postman을 통해 "Invoke URL" + "/status" + query string을 입력시 아래와 같이 정상적으로 200OK와 함께 query string으로 입력했던 deviceid를 Lambda가 정상적으로 읽어 간것을 확인 할 수 있습니다.

![noname](https://user-images.githubusercontent.com/52392004/171851177-7c0d527f-8856-4e7f-91be-2e4c46bfa7f6.png)



## Reference 

[Resolver Mapping Template Programming Guide](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-programming-guide.html)

[How do I get an API Gateway REST API to pass query string parameters to Lambda or an HTTP endpoint?](https://www.youtube.com/watch?v=aQHK8XrQmSs)

[Configure path & query string parameters and pass to lambda function - Amazon API Gateway p7](https://www.youtube.com/watch?v=trJgibvLGQc&t=789s)


