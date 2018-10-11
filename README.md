# watson-functions
This repository provides set of IBM Cloud Functions that can be used to call Watson AI services on IBM Cloud.

[IBM Cloud Functions](https://console.bluemix.net/docs/openwhisk/index.html#index) (based on Apache OpenWhisk) is a Function-as-a-Service (FaaS) platform which executes functions in response to incoming events.  

The Watson AI services referenced above are made available on IBM Cloud and can be found on the [IBM Cloud Catalog](https://console.bluemix.net/catalog/?category=ai). 

Watson Assistant documentation outlines how to [make programmatic calls from a dialog node](https://console.bluemix.net/docs/services/conversation/dialog-actions.html#dialog-actions). The instructions that follow however, outline the step by step approach to invoke the Cloud Functions made available in this repository from Watson Assistant. 


## 1. IBM Cloud Functions 
As mentioned above, IBM Cloud Functions provides a serverless/Function-as-a-Service platform. You can call the functions provided in this repository from a dialog node in Watson Assistant - to do so, we'll first need to create Actions using IBM Cloud Functions. 

1. Login to IBM Cloud and select Functions from the IBM Cloud Catalog
2. Next select Actions from the left navigation menu
3. Ensure your IBM Cloud Region is set to US South
4. Use the Create button, then click on Create Action
5. Enter an Action Name and optionally create a package. Select Node.js 8 as the Runtime then click on Create
6. Insert code for the appropriate service using the source from this repository 
7. Save your newly created Action

Next we'll need to add Parameters that'll be passed to our Action when invoked. 
1. Select Paramaters from the left navigation bar 
2. Create a new Parameter for each of the parameters outlined in the Action's source code. 

We'll enter values for the Parameters created above later. 

## 2. Create Watson AI services and update Parameter values 
For any of the Watson AI services you plan to call from a Cloud Function, you'll first need to create an instance of the service on IBM Cloud. You'll create a service instance as usual from the IBM Cloud Catalog or via the IBM Cloud CLI. After creating an instance of the service, you'll need to capture relevant details about the service instance that'll allow you make a call to the service via API. For example, if you plan to use the Tone Analyzer service, after you create a service instance, you'll gather relevant details from the Service Credentials page for the service on IBM Cloud e.g. `iam_apikey` and `url`. Once you've captured these details, you can provide as Parameter values to the Action created above. 

With Watson Discovery, if you plan to work with a private Collection, you'll first need to create the Collection then ingest and enrich your documents. You'll also need to provide details about the Collection as well as the Service Credentials in order to invoke the `discovery` function made available in this repository. 


## 3. Watson Assistant 
While the Cloud Functions included in this repository can be invoked like any other Cloud Function outside the context of Watson Assistant, these instructions are targeted at calling a Cloud Function from a Watson Assistant dialog node. We assume here that you've created a Watson Assistant instance running in the US South Region and that you've created a Watson Assistant Workspace already. 

### 3.1 Create a dialog node to call a Cloud Function 
To call a Cloud Function from Watson Assistant, we'll need to update a dialog node in the Workspace with details of the Cloud Function to call. We assume at this point, that you've identified the node that'll invoke a Cloud Function having met a defined condition in the node. For example, you might have a dialog node dedicated to making calls to Watson Discovery. The node might have a condition that aligns with an #ask-discovery intent. 

Follow the steps belows to update your Watson Assistant Workspace
1. Open Watson Assistant using the Launch Tool 
2. Open the appropriate Watson Assistant Workspace
3. Open the Intents tab and create a new `#ask-discovery` intent with appropriate examples
4. Open the Dialog tab and add a node that'll be used to invoke a Cloud Function that calls Watson Discovery 
5. In your new node, enter `#ask-discovery` in the _If bot recognizes_ field, then open the JSON Editor for that node. 

### 3.2 Update the JSON in the JSON Editor 
We provide details of the Cloud Function to call from Watson Assitant in the JSON Editor for the open node. The sample JSON below can be copied into the JSON Editor with some minor updates. 

Update the _name_ value to point to the Action created earlier
1. Open IBM Cloud Functions in a separate tab/window
2. Open the Action created earlier and from the left hand navigation select Endpoints
3. In the Rest API table you'll see a _POST URL_ value. Copy the value after namespaces but before post in the URL and replace the `%40` encoding with an `@` symbol. 

To provide an example for step 3 above, my _POST URL_ for an Action looks like this
`https://openwhisk.ng.bluemix.net/api/v1/namespaces/daltonro%40ie.ibm.com_dev/actions/watson/discovery` 

The value I'll enter into my JSON is as follows 
`/daltonro@ie.ibm.com_dev/actions/watson/discovery`

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

### 3.3 IBM Cloud Functions Credentials 
The credentials value of `$my_creds` above refers to a Watson Assistant context variable that used to provide credentials to access IBM Cloud Functions. The `$my_creds` variable should have the following format: 

```
{
  "user":"<username>",
  "password":"<password>"
}
```

The IBM Cloud Functions username and password to include in the `$my_creds` variable can again be accessed from the Endpoints page of the IBM Cloud Functions Action. 

To access the CLoud Functions username and password
1. Open IBM Cloud Functions and open the Action created earlier 
2. In the REST API table click on the _API-KEY_ link
3. Copy the key value and paste into a text editor
4. Notice the : in the key value. The username is made up of the characters before the : and the password is everything after 

The `$my_creds` context variable can be passed to Watson Assistant from a calling application or if testing the dialog from the Watson Assistant Workspace, can be created via the _Manage Context_ interface in the _Try it out_ pane. 

### 3.4 Return Results of the Cloud Function call 
To results returned from the Cloud Functions call are stored in the `result_variable` property as seen in the JSON above. These results can be accessed in a child node of the dialog node created earlier. 

To access the results
1. From the Dialog tab of the Watson Assistant Workspace, create a child node of the dialog node created earlier
2. Enter the value `true` in the _If bot recognizes_ field
3. Update the _Then respond with_ field to include `$discovery_output` i.e. the variable name assigned in the JSON above

At this point, your application built with Watson Assistant has access to the return values from the Cloud Functions call. 

## Conclusion
Following the steps above you can easily create Cloud Functions that call Watson AI services. With some update to a Watson Assistant Workspace, you can allow a chatbot query Watson Discovery or pass an utterance to Tone Analyzer. 


