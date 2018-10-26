/** Class AWS Client Service */
class AwsClientService {
  /**
   * Initilize the client
   * @param {object} config aws-sdk config
   * @param {object} [config.awsClient=AWS] AWS API Client, for default load `aws-sdk` package.
   * @param {string} [config.region=''] AWS Resource region. If empty, use env config.
   * @param {bool} [config.debug=false] If true, logging request parameters and response
   */
  constructor (config = {}) {
    this.aws = config.awsClient || require('aws-sdk')
    this.region = config.region || ''
    this.debug = config.debug || false
  }
  /**
   * Get AWS SDK Client
   *
   * @param {string} service AWS service name (Like S3, EC2, etc...) When you set `DynamoDB`, it will be `DynamoDB.DocumentClient`.
   * @param {string} [region=this.region] AWS Service region
   * @return {object} AWS-SDK Client class
   */
  getAwsServiceClient (service, region = this.region) {
    if (service === 'DynamoDB') {
      return new this.aws.DynamoDB.DocumentClient({ region })
    }
    return new this.aws[service](region)
  }
  /**
   * Initilize the client
   * @param {string} service AWS service name (Like S3, EC2, etc...) When you set `DynamoDB`, it will be `DynamoDB.DocumentClient`.
   * @param {string} method AWS API action name
   * @param {object} params AWS API parameters
   * @param {string} [region=''] AWS Service region
   * @return {Promise<{}>} AWS API(aws-sdk) result
   */
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
