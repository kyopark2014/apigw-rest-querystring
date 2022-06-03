## RESTful API에 Query String 사용하기

1) API Gateway Console로 진입합니다.

https://ap-northeast-2.console.aws.amazon.com/apigateway/main/apis?region=ap-northeast-2

2) 기생성한 "restapi"를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171762892-0fee8b96-e790-4373-b0c2-d807d4bd7171.png)

3) [Resouces] - [/status] - [GET]을 선택하고, [Method Request]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171763118-d9c967f6-81a3-493f-98f3-be67502bd030.png)


4) [Settings]에서 [URL Query String Parameters]를 선택하고, [Add query string]을 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171763288-b2204c4e-ac4b-4e87-89fb-fe481033a451.png)

5) [Name]으로 query string에서 사용할 이름을 입력합니다. 여기서는 "deviceid"라고 입력하고, 아래처럼 오른쪽에서 선택 버튼을 누릅니다. 

![noname](https://user-images.githubusercontent.com/52392004/171763659-d3a60760-b49a-4634-99b6-160e1158fc2e.png)

6) 이후 아래와 같이 [Required]를 선택하여 주어야 합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171764855-3cc180e5-f888-4197-b85d-baa75cd7b608.png)



[Required]의 오른쪽에 나온 Warning message는 아래와 같습니다.

![image](https://user-images.githubusercontent.com/52392004/171764819-fad755c5-1299-4287-8a3e-62580d7f8597.png)

아래처럼, [Settings] - [Request Validator]에서 [Validate query string parameters and headers]를 선택하면, Warning이 사라집니다.

![noname](https://user-images.githubusercontent.com/52392004/171765675-a0cdecae-a34d-401b-bafa-b2fddc5eabdc.png)



7) 상단의 [Method Execution]으로 이동합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171765971-71184944-794b-4c05-8e8b-87db6716fee7.png)



8) [Integration Request]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171766449-949fdbe8-3e19-41db-81bb-8a4330d5763b.png)

9) 아래와 같이 [Mapping Template]에서 [When there are no template defined (/recommended)]를 선택하고, [Add mapping templates]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171767054-f4cf24b8-d639-4b0f-b581-f92a53ef007d.png)

10) [Content-type]으로 "application/json"을 입력하고 오른쪽의 선택 버튼을 누릅니다.

![noname](https://user-images.githubusercontent.com/52392004/171767396-55d4f612-cce2-46b6-ad65-d2e3cdae88d7.png)

11) 아래와 같이 [Generate template]를 선택한후 [Method Request passthrough]를 선택합니다. 이후에 기본 template이 자동으로 입력되면 [Save]를 선택됩니다.


![noname](https://user-images.githubusercontent.com/52392004/171767662-fae7a997-f046-4b4e-a388-0cf31e8fccfe.png)


기본 제공되는 template을 아래와 같이 변경 할 수도 있습니다.



## 수정된 API Gateway 배포

1) 아래처럼 [Actions] - [Deploy API]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171768185-72f33e99-ef0f-4d34-a1d2-a69d540dc4f6.png)

2) [Deploy API]에서 [Deployment state]를 선택합니다. 여기서는 기 생성했던 "dev"를 선택합니다. 이후 [Deploy]를 선택하여 배포합니다. 


## QueryString 동작 시험 

1) Postman에서 "Invoke URL"에 API 이름인 "/status"를 추가하고 Query string을 "?deviceid=a1234567890"과 같이 입력합니다. 또는 아래처럼 Params에서 Key/Value 형태로 입력할 수도 있습니다. 이후 [Send]버튼을 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171768665-4293fc60-94e9-4b5f-ae04-6e04c7c0b466.png)

2) Cloudwatch에서 "lambda-for-status"에 대한 로그를 확인 합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171768773-5bb3908a-61c4-415f-b696-d2274feaf42e.png)

로그로 확인한 event의 내용은 아래와 같습니다. 

```java
{
    "body-json": {},
    "params": {
        "path": {},
        "querystring": {
            "deviceid": "a1234567890"
        },
        "header": {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Host": "sample7t6z5.execute-api.ap-northeast-2.amazonaws.com",
            "Postman-Token": "fa633e40-180f-421a-940c-14229c351c00",
            "User-Agent": "PostmanRuntime/7.29.0",
            "X-Amzn-Trace-Id": "Root=1-629960f6-609cf7c67a6f7ade6bdc6253",
            "X-Forwarded-For": "154.139.219.117",
            "X-Forwarded-Port": "443",
            "X-Forwarded-Proto": "https"
        }
    },
    "stage-variables": {},
    "context": {
        "account-id": "",
        "api-id": "8m1vc7t6z5",
        "api-key": "",
        "authorizer-principal-id": "",
        "caller": "",
        "cognito-authentication-provider": "",
        "cognito-authentication-type": "",
        "cognito-identity-id": "",
        "cognito-identity-pool-id": "",
        "http-method": "GET",
        "stage": "dev",
        "source-ip": "54.239.119.17",
        "user": "",
        "user-agent": "PostmanRuntime/7.29.0",
        "user-arn": "",
        "request-id": "ad30c506-de6f-4f5a-ad64-f402f687492c",
        "resource-id": "j0ypwc",
        "resource-path": "/status"
    }
}
```

"params" - "querystring"에서 아래와 같은 입력된 "deviceid"를 확인 할 수 있습니다.

```java
"querystring": {
  "deviceid": "a1234567890"
}
```


## Reference 

[How do I get an API Gateway REST API to pass query string parameters to Lambda or an HTTP endpoint?](https://www.youtube.com/watch?v=aQHK8XrQmSs)

[Configure path & query string parameters and pass to lambda function - Amazon API Gateway p7](https://www.youtube.com/watch?v=trJgibvLGQc&t=789s)

[API Gateway GET Method Request URL Query String Parameters using AWS CDK](https://stackoverflow.com/questions/68845918/api-gateway-get-method-request-url-query-string-parameters-using-aws-cdk)

