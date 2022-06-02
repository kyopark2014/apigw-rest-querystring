# API Gateway로 Qeury string을 RESTful API로 구현하기 

## API Gateway 생성

API Gateway로 Querystring을 포함한 Restful API를 구현하는것을 설명합니다. 

1) API Console로 접속합니다. 

https://ap-northeast-2.console.aws.amazon.com/apigateway/main/apis?region=ap-northeast-2

2) [Create API]를 선택하고, 아래처럼 "Rest API"에서 [Build]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171749361-c0b4c2bf-8e18-43c0-aa02-4d9a472151c4.png)

3) [Settings] - [API name]에 이름을 넣고 [Create API]를 선택합니다. 여기서는 "restapi"로 이름을 입력합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171749667-7b1e0479-3179-4b71-82d6-d7c7abce64a8.png)

4) Resource를 생성하기 위하여 아래처럼 [Actions] - [Create Resource]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171749954-f509ed2d-d264-4be3-ad3a-4552e9f5ad45.png)

5) [New Child Resource] - [Resource Name]에 API 이름을 넣고 [Create Resources]를 선택합니다. 여기서는 "/status"라는 api 생성을 위하여 "status"라고 입력합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171750228-742273c6-32b2-45a8-abe8-3c480f9b745b.png)

6) Method를 지정하기 위하여, [Actions] - [Create Method]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171750466-34284b72-4f3f-4d3b-8c9b-a78de7f12a3a.png)

7) 여기서는 "GET" method를 생성하고자 합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171750616-37128435-0973-43f9-b404-97776c4a4c02.png)

![noname](https://user-images.githubusercontent.com/52392004/171750709-4807ed0c-bbbf-444b-9ae9-dd31861c3ace.png)


8) 기생성한 "lambda-for-status"를 "/status" API와 연결하기 위하여 아래처럼 "Lambda Function"에 "lambda"로 입력하면 아래와 같이 lambda로 시작하는 모든 lambda가 보여집니다. 여기서, "lambda-for-status"를 선택한 후에 [Save]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171751233-4ff72935-1101-4a6d-bf63-91602ee273ac.png)

이후, [OK]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171751303-35fd1218-6404-4e5c-ab59-e46d6c84029e.png)

아래와 같이 "/status"라는 이름과 "GET" method를 가지는 RESTful API가 생성됩니다. 

![noname](https://user-images.githubusercontent.com/52392004/171751512-ddd0c49c-068a-4a1c-9081-1fc779705f88.png)


## API Gateway 배포

1) [Actions] - [Deploy API]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171751817-0b67f354-42b0-4a7e-9f6b-75bd85464625.png)

2) 기존에 생성한 Stage가 없는 경우에 아래처럼 [Devloyment state]로 "[New Stage]"를 선택하고, [Stage name]에 Stage의 이름을 입력합니다. 여기에서는 "dev"로 입력합니다. 이후 [Deploy]를 선택하여 배포합니다. 

3) 아래와 같이 API Gateway의 URL인 "Invoke URL"을 알 수 있습니다. 

![noname](https://user-images.githubusercontent.com/52392004/171752805-5b54cf3a-8a12-4fc1-af1c-b47768b798a5.png)

"Invoke URL"은 [Stages] - [dev]를 선택할때도 알 수 있습니다. 

![noname](https://user-images.githubusercontent.com/52392004/171752985-b6b8a18a-cda3-4d14-a7dd-1fe45ea7306b.png)




## Log enable 하기

1) 로그를 설정해서 debuging을 하고자 한다면 아래와 같이 [Logs/Tracing]을 선택한 후, "Enable cloudWatch Logs", "Log level", "Log full request/responses data", "Enable Detailed CloudWatch Metrics"을 모두 enable 합니다. 이후, [Save changes]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171752622-d51ace84-abcd-48f9-b15e-ad3717215a76.png)



## 접속해서 동작 확인하기 

Postman에서 아래와 같이 "Invoke URL"에 생성한 "/status" API를 넣고, "GET" method로 [Send]하면 아래와 같이 "labmda-for-status"의 응답을 확인 할 수 있습니다. 

![noname](https://user-images.githubusercontent.com/52392004/171753343-db201cb6-579f-48a7-8e93-d085786d7941.png)







