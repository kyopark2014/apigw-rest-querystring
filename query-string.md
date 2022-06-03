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



7) 
