const assert = require('power-assert')
// target
const AwsClient = require('../dist/index')

describe('AwsClient', () => {
  describe('Method', () => {
    it('should has Client props', () => {
      assert.notEqual(AwsClient.Client, undefined)
    })
    it('should has Service props', () => {
      assert.notEqual(AwsClient.Service, undefined)
    })
    it('should has request props', () => {
      assert.notEqual(AwsClient.request, undefined)
    })
  })
})
