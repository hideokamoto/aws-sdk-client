const assert = require('power-assert')
const AWS = require('aws-sdk')
// target
const AwsClientService = require('../classes/client')

describe('Services/AwsClientService', () => {
  describe('Initilzing', () => {
    it('should be initialized without Error', () => {
      assert.doesNotThrow(() => new AwsClientService(), Error)
    })
    it('should be initialized without Error when given only region', () => {
      assert.doesNotThrow(
        () =>
          new AwsClientService({
            region: 'ue-west-2'
          }),
        Error
      )
    })
    it('should be initialized without Error when given only awsClient', () => {
      assert.doesNotThrow(
        () =>
          new AwsClientService({
            awsClient: AWS
          }),
        Error
      )
    })
    it('should be initialized without Error when given full props', () => {
      assert.doesNotThrow(
        () =>
          new AwsClientService({
            awsClient: AWS,
            region: 'ue-west-2'
          }),
        Error
      )
    })
    it('should includes AWS SDK for default', () => {
      const client = new AwsClientService()
      assert.deepEqual(Object.keys(client.aws), Object.keys(AWS))
    })
  })
  describe('#getAwsServiceClient', () => {
    const client = new AwsClientService()
    it('should return DynamoDB DocumentClient class', () => {
      assert.deepEqual(
        Object.keys(client.getAwsServiceClient('DynamoDB')),
        Object.keys(new AWS.DynamoDB.DocumentClient())
      )
    })
    it('should return ACM class', () => {
      assert.deepEqual(
        Object.keys(client.getAwsServiceClient('ACM', 'us-east-1')),
        Object.keys(new AWS.ACM())
      )
    })
  })
})
