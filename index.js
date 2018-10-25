const Service = require('./classes/client')

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
