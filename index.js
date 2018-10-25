const Service = require('./classes/client')

/**
 * Request to AWS SDK API
 *
 * @param {string} service AWS service name (Like S3, EC2, etc...) When you set `DynamoDB`, it will be `DynamoDB.DocumentClient`.
 * @param {string} method AWS API action name
 * @param {object} params AWS API parameters
 * @param {string} [region] AWS Service region
 * @param {boolean} [isDebug=false] Log request and response parameters
 * @return {Promise<{}>} AWS API(aws-sdk) result
 * @example <caption>Call S3.ListBucket API as Promise</caption>
 * // return { Buckets: [ { Name: 'my-example-buckets', CreationDate: 2017-12-08T20:37:45.000Z },...]
 * const { request } = require('aws-sdk-client')
 * request('S3', 'listBuckets', {})
 *  .then(data => console.log(data))
 *
 * @example <caption>Call S3.ListBucket API as async/await</caption>
 * // return { Buckets: [ { Name: 'my-example-buckets', CreationDate: 2017-12-08T20:37:45.000Z },...]
 * const { request } = require('aws-sdk-client')
 * const item = await request('S3', 'listBuckets', {})
 * console.log(item)
 *
 */
const request = (service, method, params, region = '', isDebug = false) => {
  const config = {}
  if (region) config.region = region
  if (isDebug) config.debug = isDebug
  const client = new Service(config)
  return client.request(service, method, params)
}

module.exports = {
  Service,
  request
}
