let wasm;
let generate_password;

export async function initWasm() {
  if (wasm) return;

  const wasmModule = await import('../pkg/web/securepwd.js');
  generate_password = wasmModule.generate_password;
  wasm = wasmModule;
}

/**
 * Password generation using SHA-256 hash of the full file
 *
 * @param {Blob|File|Uint8Array} blob - Input file
 * @param {string} pin - PIN/salt
 * @param {string|number} length - Desired password length
 * @returns {Promise<string>}
 */
export async function generatePassFromBlob(blob, pin = '1024', length = '16') {
  if (!generate_password) {
    await initWasm();
  }

  let fileBytes;
  if (blob instanceof Uint8Array) {
    fileBytes = blob;
  } else if (blob.arrayBuffer) {
    const arrayBuffer = await blob.arrayBuffer();
    fileBytes = new Uint8Array(arrayBuffer);
  } else {
    throw new TypeError('Unsupported input type: expected Blob, File, or Uint8Array');
  }

  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', fileBytes);
  const hashBytes = new Uint8Array(hashBuffer);

  return generate_password(hashBytes, pin, parseInt(length));
}
