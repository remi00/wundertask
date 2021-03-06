const { DeviceInfo, ErrorInstruction } = require('./instructions');
const {
  intoLines,
  filterByPrefixSignature,
  filterBySuffixSignature,
  intoCommand,
  emptyOut,
} = require('./lib')


/*
 * The function accepts a STRING `payloadStream` as parameter.
 *
 *
 * The function is expected to RETURN an ARRAY in the following format:
 *
 * [{ imei: STRING, batteryLevel: STRING, odometer: STRING, time: DATE },... ]
 *
 */
function getDeviceInformations(payloadStream = '') {
  return payloadStream
    .split('\n')
    .map(intoLines)
    .filter(filterByPrefixSignature)
    .filter(filterBySuffixSignature)
    .map(intoCommand({ DeviceInfo, Error: ErrorInstruction }))
    .filter(emptyOut);
}

module.exports = getDeviceInformations;
