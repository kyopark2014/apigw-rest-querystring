## Lambda Invoke Error

AWS CDK로 API Gateway를 만들고 Lambda 연결시 아래와 같은 에러와 함께 500 에러가 발생하고 있습니다. 이것은 Lambda Invoke 에러로 추청되나 CDK Code상에서 아직 해결하는 방법을 못찾고 있습니다.

### 에러 내용

아래와 같이 Postman으로 API 호출시 500에러가 발생합니다.

![noname](https://user-images.githubusercontent.com/52392004/171848973-c29b8b15-c5f4-4cbb-955c-a6fe6aac657f.png)


로그상 아래와 같은 이슈가 있는것으로 보여집니다.

```c
2022-04-23T18:37:47.070+09:00	(1cb53717-ad5c-40fb-9f43-de32825e62e5) Execution failed due to configuration error: Unable to transform request
```

### 해결방안

1) API Gateway Console로 접속합니다.

https://ap-northeast-2.console.aws.amazon.com/apigateway/main/apis?region=ap-northeast-2

2) 생성한 API로 접속합니다. 여기서는 "api-status"가 생성되어 있습니다. 

![image](https://user-images.githubusercontent.com/52392004/171849275-c483f953-8ec1-414f-8054-a4254ef36e05.png)

3) [Resources]에서 "GET" method를 선택하고, [Integration Request]를 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171849550-2dab6b49-c353-4995-96c4-83038fe8adc9.png)

4) [Lambda Function]에서 아래처럼 오른쪽 수정버튼을 선택합니다.

![noname](https://user-images.githubusercontent.com/52392004/171849703-91fa5f59-fef3-4378-8aa2-8d962d1aec3a.png)

5) 다시 오른쪽의 선택 버튼을 아래처럼 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171849861-495dc7c7-aa35-4e98-9184-2e1efe1585f8.png)

6) 아래와 같이 "Add Permission to Lambda Function" 팝업이 나오면 [OK]를 선택합니다. 

![noname](https://user-images.githubusercontent.com/52392004/171850074-daace913-238a-430d-958d-ee18c769675d.png)


## 수정된 
ㅂㅏㅇ





