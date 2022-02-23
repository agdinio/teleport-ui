import { Serialize } from "eosjs";
import { Int64LE } from "int64-buffer";

export const getRand = () => {
  const arr = new Uint8Array(8);
  for (let i = 0; i < 8; i += 1) {
    arr[i] = Math.floor(Math.random() * 255);
  }
  return arr;
};

export const pushRand = (sb) => {
  const arr = getRand();
  sb.pushArray(arr);
  return arr;
};

export const toHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/* uint8array to / from hex strings */
export const fromHexString = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

export const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

export const nameToInt = (name) => {
  const sb = new Serialize.SerialBuffer({
    textEncoder: new TextEncoder(),
    textDecoder: new TextDecoder(),
  });

  sb.pushName(name);

  const name64 = new Int64LE(sb.array);

  return `${name64}`;
};

export const nameToArray = (name) => {
  const sb = new Serialize.SerialBuffer({
    textEncoder: new TextEncoder(),
    textDecoder: new TextDecoder(),
  });

  sb.pushName(name);

  return sb.array;
};

export const intToName = (int) => {
  int = new Int64LE(int);

  const sb = new Serialize.SerialBuffer({
    textEncoder: new TextEncoder(),
    textDecoder: new TextDecoder(),
  });

  sb.pushArray(int.toArray());

  return sb.getName();
};
