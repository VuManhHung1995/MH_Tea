import { Buffer } from "buffer";

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export function convertBufferToBase64(data) {
  if (!data) {
    return "";
  }
  const imageBase64 = new Buffer(data, "base64").toString("binary");
  return imageBase64;
}
