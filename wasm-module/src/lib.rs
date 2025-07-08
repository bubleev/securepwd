use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};

// Генерируемый файл с SECRET
include!(concat!(env!("OUT_DIR"), "/secret.rs"));

#[wasm_bindgen]
pub fn get_secret() -> String {
    SECRET.to_string()
}

#[wasm_bindgen]
pub fn generate_password(data: &[u8], salt: &str, length: usize) -> String {
    let mut hasher = Sha256::new();
    
    hasher.update(length.to_string().as_bytes());
    hasher.update(data);
    hasher.update(salt.as_bytes());
    hasher.update(SECRET.as_bytes());
    
    // Для отладки - выведем первые 4 символа SECRET
    println!("Using SECRET: {}...", &SECRET[..4.min(SECRET.len())]);

    let mut result = hasher.finalize();

    for _ in 0..1000 {
        let mut h = Sha256::new();
        h.update(&result);
        h.update(SECRET.as_bytes());
        result = h.finalize();
    }

    // Convert to hex and trim to desired length (max 64 hex chars = 32 bytes)
    let hex = hex::encode(&result);
    hex[..length.min(64)].to_string()
}
