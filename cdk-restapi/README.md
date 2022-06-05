# CDK로 Querystring을 지원하는 RESTful API 만들기

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

API Gateway가 lambda를 invoke하기 위한 IAM Role을 선언합니다.

```java
    const role = new iam.Role(this, "rest-api-role", {
      roleName: "RestApiRole",
      assumedBy: new iam.ServicePrincipal("apigateway.amazonaws.com")
    });
    role.addToPolicy(new iam.PolicyStatement({
      resources: ['*'],
      actions: ['lambda:InvokeFunction']
    }));
    role.addManagedPolicy({
      managedPolicyArn: 'arn:aws:iam::aws:policy/AWSLambdaExecute',
    }); 
```

아래와 같이 "dev" stage에서 동작하는 API Gateway를 정의합니다. 


```java
    // define api gateway
    const stage = "dev";
    const apigw = new apiGateway.RestApi(this, 'ApiStatus', {
      description: 'API Gateway for RESTful Query URL',
      endpointTypes: [apiGateway.EndpointType.REGIONAL],
      defaultMethodOptions: {
        authorizationType: apiGateway.AuthorizationType.NONE
      },
      deployOptions: {
        stageName: stage,
        accessLogDestination: new apiGateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields({
          caller: false,
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          user: true
        }),
      },
    }); 
```    

RESTful API는 querystring을 json으로 받아서 template로 변환을 해주어야 합니다. 여기서는 "deviceid"라는 querystring을 정의합니다. 

```
    // define template
    const templateString: string = `#set($inputRoot = $input.path('$'))
    {
        "deviceid": "$input.params('deviceid')"
    }`;

    const requestTemplates = { // path through
      'application/json': templateString,
    };
```


'/status'라는 API를 아래와 같의 정의 합니다. template을 사용하도록 설정했고, "deviceid"라는 querystring을 [Method Request]에 "method.request.querystring.deviceid"을 이용해 정의 하였습니다. 

```java
    let apiName = 'status';
    const status = apigw.root.addResource(apiName);

    status.addMethod('GET', new apiGateway.LambdaIntegration(lambdaStatus, {
      passthroughBehavior: apiGateway.PassthroughBehavior.WHEN_NO_TEMPLATES,  // options: NEVER
      requestTemplates: requestTemplates,
      credentialsRole: role,
      integrationResponses: [{
        statusCode: '200',
      }], 
      proxy:false, 
    }), {
      requestParameters: {
        'method.request.querystring.deviceid': true,
      },
      methodResponses: [   // API Gateway sends to the client that called a method.
        {
          statusCode: '200',
          responseModels: {
            'application/json': apiGateway.Model.EMPTY_MODEL,
          }, 
        }
      ]
    });
```    
