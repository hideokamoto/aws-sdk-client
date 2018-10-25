class AwsClientService {
  constructor (config = {}) {
    this.aws = config.awsClient || require('aws-sdk')
    this.region = config.region || 'us-east-1'
    this.debug = config.debug || false
  }
  getAwsServiceClient (service, region = this.region) {
    if (service === 'DynamoDB') { return new this.aws.DynamoDB.DocumentClient(region) }
    return new this.aws[service](region)
  }
  async request (service, method, params, region = this.region) {
    this.trackInfo({ service, method, params, region })
    try {
      const awsService = this.getAwsServiceClient(service, region)
      const request = await awsService[method](params).promise()
      this.trackInfo(request)
      return request
    } catch (e) {
      this.trackError(e)
      throw e
    }
  }
  trackInfo (data) {
    if (this.debug) console.log('Tracker:Info: %j', data)
  }
  trackError (data) {
    console.log('Tracker:Error: %j', data)
  }
}
module.exports = AwsClientService
