const { log } = require('../lib');
const { imei, time } = require('./common.helpers');

const parseErrorsCount = (stringified, logger) => {
  const errorsCount = parseInt(stringified, 10);
  if (0 <= errorsCount && errorsCount <= 10) return errorsCount;
  logger(`Invalid errors count ${errorsCountString}`);
  return 0;
}

const arrayIntoPairs = (acc, item, index) => {
  if (index % 2 === 0) acc.push([item]);
  else acc[acc.length-1].push(item);
  return acc;
};

const pairsIntoErrorObject = (acc, item) =>
  Object.assign(acc, { [item.pop()]: parseInt(item.pop()) });

const ErrorInstruction = (params, logger) => {
  const [imeiValue, errorsCountString] = params;
  const errorsCount = parseErrorsCount(errorsCountString);
  const errorsArray = params.slice(2, 2 + errorsCount * 2);
  const timestampString = time(params.slice(-1));
  if (!errorsArray.length === errorsCount * 2) {
    logger(`Error count mismatch - ${errorsCount}`);
    return null;
  }
  const errors = errorsArray
    .reduce(arrayIntoPairs, [])
    .reduce(pairsIntoErrorObject, {});
  return {
    imei: imei(imeiValue, logger),
    time: time(timestampString, logger),
    ...errors
  };
};

module.exports = ErrorInstruction;
