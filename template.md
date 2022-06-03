## 사용자 정의 Template

[RESTful API에 Query String 사용하기](https://github.com/kyopark2014/apigw-rest-querystring/blob/main/query-string.md)에 사용한 template을 변경하여, querystring으로 등록된 deviceid를 가져오는 event 구조를 용도에 맞게 변경하여 사용 할 수 있습니다. 


야래의 template을 등록합니다.

```java
#set($inputRoot = $input.path('$'))
{
    "queryStringParameters": {
        "deviceid": "$input.params('deviceid')"
    }
}
```

이 경우에 아래와 같은 event가 lamba-for-status로 전달됩니다.

```java
{
    "queryStringParameters": {
        "deviceid": "a1234567890"
    }
}
```

lambda-for-status에서는 아래처럼 deviceid를 parsing하여 사용할 수 있습니다. 

```java
exports.handler = async (event) => {
    console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env));
    console.log('## EVENT: ' + JSON.stringify(event))
    
    if(event['deviceid']) {
        let deviceid = event['deviceid'];
        
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



