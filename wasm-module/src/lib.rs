use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};
use std::env;

fn get_secret() -> String {
    env::var("SECRET").unwrap_or_else(|_| "".to_string())
}

#[wasm_bindgen]
pub fn generate_password(data: &[u8], salt: &str, length: usize) -> String {
    let mut hasher = Sha256::new();
    let secret = get_secret();
    
    hasher.update(length.to_string().as_bytes());
    hasher.update(data);
    hasher.update(salt.as_bytes());
    hasher.update(secret.as_bytes());

    let mut result = hasher.finalize();

    for _ in 0..1000 {
        let mut h = Sha256::new();
        h.update(&result);
        h.update(secret.as_bytes());
        result = h.finalize();
    }

    // Convert to hex and trim to desired length (max 64 hex chars = 32 bytes)
    let hex = hex::encode(&result);
    hex[..length.min(64)].to_string()
}
