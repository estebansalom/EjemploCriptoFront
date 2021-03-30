import CryptoJS from "crypto-js";

export function encryptFun(data, pk, iv) {
  var key = CryptoJS.enc.Latin1.parse(pk);
  var iv = CryptoJS.enc.Latin1.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  //console.log("encrypted: " + encrypted);
  return "" + encrypted;
}

export function decryptFun(data, pk, iv) {
  var key = CryptoJS.enc.Latin1.parse(pk);
  var iv = CryptoJS.enc.Latin1.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    padding: CryptoJS.pad.ZeroPadding,
  });
  //console.log("decrypted: " + decrypted.toString(CryptoJS.enc.Utf8));
  return decrypted.toString(CryptoJS.enc.Utf8);
}
