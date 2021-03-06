const time = (stringified, logger) => {
  const value = new Date(stringified);
  if (!isNaN(value.valueOf())) return value;
  logger(`Invalid timestamp ${stringified}`);
  return null;
};

const imei = (value, logger) => {
  if (!value || value.length !== 15) logger(`Wrong IMEI format ${value}`);
  return value;
};

module.exports = { time, imei };
