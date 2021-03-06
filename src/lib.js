const { VERBOSE: verbose } = process.env;

const prefixPattern = /^\+(IN|OUT)$/;
const countPattern = /([\d]+)\$/

const log = (...info) => verbose && console.warn(...info);

const filterByPrefixSignature = ([begin]) =>
  prefixPattern.test(begin);

const filterBySuffixSignature = packet =>
  countPattern.test(packet.slice(-1).pop())

const intoLines = line => line.split(',');

const emptyOut = item => item;

const intoCommand = commandsMapping =>
  ([, instruction, ...params]) => {
    const handler = commandsMapping[instruction];
    if (!handler) {
      log(`[${instruction}] Unsupported instruction: `);
      return null;
    }

    const packetId = extractCount(params.pop());
    const logger = (...contents) => verbose && console.warn(`[${instruction}-${packetId}]`, ...contents);
    return handler(params, logger);
  };

const extractCount = countSegment =>
  (countSegment.match(countPattern) || []).pop();

module.exports = {
  log,
  filterByPrefixSignature,
  filterBySuffixSignature,
  intoLines,
  emptyOut,
  intoCommand
}
