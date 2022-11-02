const loadBalancer = {}

loadBalancer.ROUND_ROBIN = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index
  service.index = newIndex
  return newIndex
}

loadBalancer.LEAST_USED = (service) => {}

module.exports = loadBalancer