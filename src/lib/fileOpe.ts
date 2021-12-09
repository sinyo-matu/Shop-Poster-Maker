import {
  readBinaryFile,
  removeFile,
  writeBinaryFile,
} from "@tauri-apps/api/fs";
import { appDir, downloadDir } from "@tauri-apps/api/path";

export async function createAppData(fileName: string, contents: ArrayBuffer) {
  const appPath = await appDir();
  await writeBinaryFile({ path: `${appPath}/${fileName}`, contents });
}

export async function loadAppData(fileName: string) {
  const appPath = await appDir();
  const file = await readBinaryFile(`${appPath}/${fileName}`);
  const array = new Uint8Array(file);
  const blob = new Blob([array]);
  return blob;
}

export async function removeAppData(filePath: string) {
  const appPath = await appDir();
  await removeFile(`${appPath}/${filePath}`);
}

export async function createToDownloadDir(
  fileName: string,
  contents: ArrayBuffer
) {
  const downloadPath = await downloadDir();
  await writeBinaryFile({ path: `${downloadPath}/${fileName}`, contents });
}

export async function readFile(filePath: string) {
  const byte = await readBinaryFile(filePath);
  const name = filePath.match(/.*\/(.*\.*)/);
  const array = new Uint8Array(byte);
  return new File([array], name![1]);
}
