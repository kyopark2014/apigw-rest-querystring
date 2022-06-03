exports.handler = async (event) => {
    console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env));
    console.log('## EVENT: ' + JSON.stringify(event))
    
    if(event['params']) {
        let querystring = event.params.querystring;
        console.log('querystring: %j', querystring);
        
        let deviceid = querystring.deviceid;
        
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
