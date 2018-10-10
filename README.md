# watson-functions
This repository provides set of IBM Cloud Functions that can be used to call Watson AI services on IBM Cloud.

[IBM Cloud Functions](https://console.bluemix.net/docs/openwhisk/index.html#index) (based on Apache OpenWhisk) is a Function-as-a-Service (FaaS) platform which executes functions in response to incoming events.  

The Watson AI services referenced above are made available on IBM Cloud and can be found on the [IBM Cloud Catalog](https://console.bluemix.net/catalog/?category=ai). 

Watson Assistant documentation outlines how to [make programmatic calls from a dialog node](https://console.bluemix.net/docs/services/conversation/dialog-actions.html#dialog-actions). The instructions that follow however, outline the step by step approach to invoke the Cloud Functions made available in this repository from Watson Assistant. 


## IBM Cloud Functions 
As mentioned above, IBM Cloud Functions provides a serverless/Function-as-a-Service platform. You can call the functions provided in this repository from a dialog node in Watson Assistant - to do so, we'll first need to create Actions using IBM Cloud Functions. 

1. Login to IBM Cloud and select Functions from the IBM Cloud Catalog
2. Ensure your IBM Cloud Region is set to US South
3. From IBM Cloud Functions select Action, then use the Create button to create a new action providing a name and optionally a package name
4. Insert code for the appropriate service using the source above from this repository 
5. Save your newly created Action

Next we'll need to add Parameters that'll be passed to our Action when invoked. 
1. Select Paramaters from the left navigation bar 
2. Create a new Parameter for each of the parameters outlined in the Action's source code

## Create Watson AI services and update Parameter values 
For any of the Watson AI services you plan to call from a Cloud Function, you'll first need to create an instance of the service on IBM Cloud. You'll create a service instance as usual from the IBM Cloud Catalog or via the IBM Cloud CLI. After creating an instance of the service, you'll need to capture relevant details about the service instance that'll allow you make a call to the service via API. For example, if you plan to use the Tone Analyzer service, after you create a service instance, you'll gather relevant details from the Service Credentials page for the service on IBM Cloud e.g. `iam_apikey` and `url`. Once you've captured these details, you can provide as Parameter values to the Action created above. 

With Watson Discovery, if you plan to work with a private Collection, you'll first need to create the Collection then ingest and enrich your documents. You'll also need to provide details about the Collection as well as the Service Credentials in order to invoke the `discovery` function made available in this repository. 


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



