# watson-functions
A set of IBM Cloud Functions that can be used to call Watson AI services on IBM Cloud.

[IBM Cloud Functions](https://console.bluemix.net/docs/openwhisk/index.html#index) (based on Apache OpenWhisk) is a Function-as-a-Service (FaaS) platform which executes functions in response to incoming events.  

The Watson AI services referenced above are made available on IBM Cloud and can be found on the [IBM Cloud Catalog](https://console.bluemix.net/catalog/?category=ai). 

Watson Assistant documentation outlines how to [make programmatic calls from a dialog node] (https://console.bluemix.net/docs/services/conversation/dialog-actions.html#dialog-actions). The instructions that follow however, outline the step by step approach to invoke the Cloud Functions made available in this repository from Watson Assistant. 


## IBM Cloud Functions 
As mentioned above, IBM Cloud Functions provides a serverless/Function-as-a-Service platform. 
1. From IBM Cloud Functions, create a new Action providing a name and optionally a package name. 
2. Insert code for the appropriate service from the source above 
3. Create the parameters identified in the code 

## Watson Assistant 
From the Watson Assistant workspace, update the appropiate Dialog node using the JSON editor 

Sample JSON to include below 
```javascript
{
  "output": {
    "generic": []
  },
  "actions": [
    {
      "name": "/daltonro@ie.ibm.com_dev/actions/discovery",
      "type": "server",
      "parameters": {
        "input": "<?input.text?>"
      },
      "credentials": "$my_creds",
      "result_variable": "context.watson_output"
    }
  ]
}
```

`name` points to the IBM Cloud Functions action created earlier. 

`$my_creds` is a variable that includes the IBM Cloud Functions username & password. The `$my_creds` variable should have the following format. 
```
{
  "user":"97b54365-5b01-4161-843c-95a67ae70819",
  "password":"XOl6xqSr7Z5lNADuBiIFxEK0y93VFL6yVDXKG56a8r5cfpzyUT4r1pzuTXRIBowk"
}
```



