# Lambda for status

아래와 같이 "lambda-for-status"에서는 querystring이 json형태로 전달되므로 event를 로깅하고 있습니다. 

```java
exports.handler = async (event) => {
    console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env));
    console.log('## EVENT: ' + JSON.stringify(event))

```java
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
```    
