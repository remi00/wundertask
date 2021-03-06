const { time, imei } = require('./common.helpers');

const batteryLevel = (strigified, logger) => {
  const value = parseInt(strigified, 10);

  if (0 <= value && value <= 100) return `${value} %`;
  logger(`Invalid battery level status ${strigified}`);
  return null;
};

const odometer = (stringified, logger) => {
  const value = parseInt(stringified, 10);
  if (0 <= value && value <= 999999) return `${value} km`

  logger(`Invalid odometer status ${stringified}`);
  return null;
};


const DeviceInfo = (params, logger) => {
  if (params.length !== 4) {
    logger(`Paramaters mismatch ${params.length} instead of 4 for device info instruction`);
    return null;
  }
  const [imeiValue, batteryString, odoString, timestampString] = params;
  return {
    imei: imei(imeiValue, logger),
    batteryLevel: batteryLevel(batteryString, logger),
    odometer: odometer(odoString, logger),
    time: time(timestampString, logger),
  }
};

module.exports = DeviceInfo;
