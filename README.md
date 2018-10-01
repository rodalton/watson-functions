# watson-functions
A set of IBM Cloud Functions that can be used to call Watson services. The instructions below outline the steps to invoke these Cloud Functions from Watson Assistant. 

## IBM Cloud Functions 
1. From IBM Cloud Functions, create a new Action proving a name and optionally a package name. 
2. Insert code 
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
        "input": "$input"
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



