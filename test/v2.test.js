const fs = require('fs');
const { assert } = require('chai');
const { v2: getDeviceInformations } = require('../src');

describe('v2', function () {
  describe('Error', function () {
    it('should parse entire stream', function () {
      const stream = fs.readFileSync('./test/fixtures/v2', 'utf8');
      const result = getDeviceInformations(stream);
      const expected = [
        { imei: '860861040012977', batteryLevel: '86 %', odometer: '5600 km', time: new Date('2021-01-14T14:05:10.000Z') },
        { imei: '860861040012977', NoBattery: 5, ECUFailure: 7, time: new Date('2021-01-14T14:06:18.000Z') },
        { imei: '860861040012977', ECUFailure: 7, time: new Date('2021-01-14T14:09:18.000Z') },
        { imei: '860861040012977', batteryLevel: '34 %', odometer: '5612 km', time: new Date('2021-01-14T17:30:10.000Z') },
        { imei: '860861040012977', NoBattery: 5, ECUFailure: 7, Reboot: 8, IotError: 10, time: new Date('2021-01-14T18:05:10.000Z') },
        { imei: '860861040012977', batteryLevel: '3 %', odometer: '5623 km', time: new Date('2021-01-14T22:59:10.000Z') },
       ]
      assert.deepEqual(result, expected);
    })
  });
});
