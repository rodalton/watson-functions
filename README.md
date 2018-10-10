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
While the Cloud Functions included in this repository can be invoked like any other Cloud Function outside the context of Watson Assistant, these instructions are targeted at calling a Cloud Function from a Watson Assistant dialog node. We also assume here that you've created a Watson Assistant instance running in the US South Region and that you've created a Watson Assistant Workspace already. 

To call a Cloud Function from Watson Assistant, we'll need to update a dialog node in the Workspace with details of the Cloud Function to call. We assume at this point, that you've identified the node that'll invoke a Cloud Function having met a defined condition in the node. For example, you might have a dialog node dedicated to making calls to Watson Discovery. The node might have a condition that aligns with an #ask-discovery intent. Follow the steps belows to update your Watson Assitant Workspace. 

1. Open Watson Assistant using the Launch Tool 
2. Open the appropriate Watson Assistant Workspace
3. Open the Intents tab and create a new `#ask-discovery` intent with appropriate examples
4. Open the Dialog tab and add a node that'll be used to invoke a Cloud Function that calls Watson Discovery 
5. In your new node, enter `#ask-discovery` in the If bot recognizes field, then open the JSON Editor for that node. 

We provide details of the Cloud Function to call from Watson Assitant in the JSON Editor for the open node. The sample JSON below can be copied into the JSON Editor with some minor updates. 

Update the name value to point to the Action created earlier
1. Open IBM Cloud Functions in a separate tab/window
2. Open the Action created earlier and from the left hand navigation select Endpoints
3. In the Rest API table you'll see a POST URL value. Copy the value after namespaces but before post and replace the %40 encoding with an @ symbol. 

To provide an example for step 3 above, my POST URL for an action looks like this: `https://openwhisk.ng.bluemix.net/api/v1/namespaces/daltonro%40ie.ibm.com_dev/actions/watson/discovery` so the value I'll paste into my JSON is `/daltonro@ie.ibm.com_dev/actions/watson/discovery`

```javascript
{
  "output": {
    "generic": []
  },
  "actions": [
    {
      "name": "/jdoe@example.com_dev/actions/discovery",
      "type": "server",
      "parameters": {
        "input": "<?input.text?>"
      },
      "credentials": "$my_creds",
      "result_variable": "context.discovery_output"
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



