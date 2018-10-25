# AWS-SDK Client for Node.js

Call AWS API more easily.

## Getting started

### Install by npm

```
$ npm i -S aws-sdk-client
```

### run request function
You can call AWS API by following method.

```
request('AWS_SERVICE_NAME', 'AWS_API_NAME', parameters, [REGION])
```

The method will returns Promise object.

#### async / await
```
const { request } = require('aws-sdk-client')

const run = async () => {
  const { request } = AWSClient
  try {
    const item = await request('S3', 'listBuckets', {})
    console.log(item)
  } catch (e) {
    console.log(e)
  }
}
run()

{ Buckets:
   [ { Name: 'my-example-buckets',
       CreationDate: 2017-12-08T20:37:45.000Z },
```

#### Promise

```
const { request } = require('aws-sdk-client')

request('S3', 'listBuckets', {})
  .then(data => console.log(data))

{ Buckets:
   [ { Name: 'my-example-buckets',
       CreationDate: 2017-12-08T20:37:45.000Z },
```
