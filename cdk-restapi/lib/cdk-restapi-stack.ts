import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as cdk from 'aws-cdk-lib';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkRestapiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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

    // log group api
    const logGroup = new logs.LogGroup(this, 'AccessLogs-restapi', {
      retention: 90, // Keep logs for 90 days
    });
    logGroup.grantWrite(new iam.ServicePrincipal('apigateway.amazonaws.com')); 

    // api-role
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

    // define template
    const templateString: string = `#set($inputRoot = $input.path('$'))
    {
        "deviceid": "$input.params('deviceid')"
    }`;

    const requestTemplates = { // path through
      'application/json': templateString,
    };

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

    // query url of "status" api
    let deviceid = 'a1234567890'; // example 
    new cdk.CfnOutput(this, 'QueryUrl', {
      value: apigw.url+'/'+apiName+'?deviceid='+deviceid,
      description: 'example query url of API',
    });
  }
}
