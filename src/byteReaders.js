import * as R from "ramda";

export const readString = R.curry((key, {chunk = {}, buffer}) => ({
  chunk: {...chunk, [key]: buffer.slice(0, 4).toString("ascii")},
  buffer: buffer.slice(4)
}));

export const readInt = R.curry((key, {chunk = {}, buffer}) => ({
  chunk: {...chunk, [key]: buffer.slice(0, 4).readInt32LE()},
  buffer: buffer.slice(4)
}));

export const readByte = R.curry((key, {chunk = {}, buffer}) => ({
  chunk: {...chunk, [key]: buffer.slice(0, 1).readInt8()},
  buffer: buffer.slice(1)
}));

export const readUByte = R.curry((key, {chunk = {}, buffer}) => ({
  chunk: {...chunk, [key]: buffer.slice(0, 1).readUInt8()},
  buffer: buffer.slice(1)
}));

export const readDict = R.curry((key, {chunk = {}, buffer}) => {
  const out = R.pipe(readInt("numPairs"))({buffer});
  return {chunk: {[key]: out.chunk, ...chunk}, buffer: out.buffer};
});