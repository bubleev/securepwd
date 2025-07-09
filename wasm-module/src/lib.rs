use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};

include!(concat!(env!("OUT_DIR"), "/secret.rs"));

const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";

#[wasm_bindgen]
pub fn generate_password(data: &[u8], salt: &str, length: usize) -> String {
    let mut hasher = Sha256::new();

    hasher.update(length.to_string().as_bytes());
    hasher.update(data);
    hasher.update(salt.as_bytes());
    hasher.update(SECRET.as_bytes());

    let mut result = hasher.finalize();

    for _ in 0..1000 {
        let mut h = Sha256::new();
        h.update(&result);
        h.update(SECRET.as_bytes());
        result = h.finalize();
    }

    let charset_len = CHARSET.len();
    let password: String = result
        .iter()
        .cycle()
        .take(length)
        .map(|b| CHARSET[(*b as usize) % charset_len] as char)
        .collect();

    password
}
