## 사용자 정의 Template

querystring으로 등록된 deviceid를 가지고 아래처럼 json파일을 생성할 수 있습니다.

```java
#set($inputRoot = $input.path('$'))
{
    "queryStringParameters": {
        "deviceid": "$input.params('deviceid')"
    }
}
```

이 경우에 event는 아래와 같이 전달 됩니다.
```java
{
    "queryStringParameters": {
        "deviceid": "a1234567890"
    }
}
```

이때는 아래와 같이 lambda-for-status를 변경하여 parsing 합니다.

```java
exports.handler = async (event) => {
    console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env));
    console.log('## EVENT: ' + JSON.stringify(event))
    
    if(event['queryStringParameters']) {
        let deviceid = event['queryStringParameters'].deviceid;
        
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                'deviceid': deviceid
            }),
        };
        return response;
    }
    else {
        const response = {
            statusCode: 200,
            body: "no querystring",
        };
        return response;
    }
};
```

## Reference 

[AWS API Gateway: Mapping Template Cheatsheet](https://ncoughlin.com/posts/aws-api-gateway-cheatsheet/)



