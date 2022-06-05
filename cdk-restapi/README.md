# API Gateway를 이용해 Querystring을 지원하는 RESTful API 만들기

여기서는 Querystring을 지원하는 RESTful API를 API Gateway를 만드는것을 CDK로 구현하는 방법에 대해 설명합니다.

## Lambda for basic

API Gateway에서 RESTful API를 Invoke할때 구동되는 Lambda 함수입니다. [Lambda for basic](https://github.com/kyopark2014/apigw-rest-querystring/tree/main/lambda-for-status)에서 event를 로깅하고 리턴값으로 전달하는 예제가 있습니다. 

```java
    // Lambda for status 
    const lambdaStatus = new lambda.Function(this, "LambdaStatus", {
      description: 'lambda for status',
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset("../lambda-for-status"), 
      handler: "index.handler", 
      timeout: cdk.Duration.seconds(3),
      environment: {
      }
    }); 
    new cdk.CfnOutput(this, 'LambdaStatusARN', { // lambda arn
      value: lambdaStatus.functionArn,
      description: 'The arn of lambda for status',
    });
```    

API Gateway의 로그를 저장하기 위한 log group을 선언합니다. 

```java
    // log group api
    const logGroup = new logs.LogGroup(this, 'AccessLogs-restapi', {
      retention: 90, // Keep logs for 90 days
    });
    logGroup.grantWrite(new iam.ServicePrincipal('apigateway.amazonaws.com')); 
```

API Gateway가 lambda를 

