const fs = require('fs');
const { assert } = require('chai');
const { v1: getDeviceInformations } = require('../src');

describe('v1', function () {
  describe('given wrong packets', function () {
    it('should return empty array on no input', function () {
      assert.deepEqual(getDeviceInformations(), []);
    });
    it('should return empty array on empty input', function () {
      assert.deepEqual(getDeviceInformations(''), []);
    });
    it('should return empty array on wrong input', function () {
      assert.deepEqual(getDeviceInformations('AABBAA'), []);
    });
    it('should return empty array on malformed packet input', function () {
      assert.deepEqual(getDeviceInformations('+IN,SomeComm'), []);
    });
    it('should ignore unsupported but proper packets', function () {
      assert.deepEqual(getDeviceInformations('+IN,SomeCommand,123$'), []);
    });
  });

  describe('DeviceInfo', function () {
    it('should parse device info packet', function () {
      const expected = {
        imei: '860861040012977',
        batteryLevel: '86 %',
        odometer: '5600 km',
        time: new Date('2021-01-14T14:05:10.000Z'),
      };
      assert.deepEqual(getDeviceInformations('+IN,DeviceInfo,860861040012977,86,5600,2021-01-14T15:05:10,0035$'), [expected]);
    });

    it('should handle invalid payload params data gracefully', function() {
      const expected = {
        imei: 'cafebabe',
        batteryLevel: null,
        odometer: null,
        time: null,
      };
      assert.deepEqual(getDeviceInformations('+IN,DeviceInfo,cafebabe,casd,-50,2021-01-wronkdate:05:10,0035$'), [expected]);
    });

    it('should parse entire stream', function () {
      const stream = fs.readFileSync('./test/fixtures/v1', 'utf8');
      const result = getDeviceInformations(stream);
      const expected = [
        {
          imei: '860861040012977',
          batteryLevel: '86 %',
          odometer: '5600 km',
          time: new Date('2021-01-14T14:05:10.000Z'),
        },
        {
          imei: '860861040012977',
          batteryLevel: '34 %',
          odometer: '5612 km',
          time: new Date('2021-01-14T17:30:10.000Z'),
        },
        {
          imei: '860861040012977',
          batteryLevel: '3 %',
          odometer: '5623 km',
          time: new Date('2021-01-14T22:59:10.000Z')
        }
      ];
      assert.deepEqual(result, expected);
    })
  });
});
