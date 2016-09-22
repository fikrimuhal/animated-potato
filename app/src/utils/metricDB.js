/**
 * Created by MYigit on 22.9.2016.
 */
var influx = require('influx')
const client = influx('http://admin:admin@http://influxdb.ofis.fikrimuhal.com:8086/mulakat_dev')

export default  client;