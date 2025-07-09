use std::env;
use std::fs;
use std::path::Path;

fn main() {
    println!("cargo:rerun-if-changed=.env");
    dotenv::dotenv().ok();
    let secret = env::var("SECRET").unwrap_or_else(|_| "default-secret-key".to_string());
    let out_dir = env::var("OUT_DIR").expect("OUT_DIR is not set");
    let dest_path = Path::new(&out_dir).join("secret.rs");
    
    fs::write(
        dest_path,
        format!("pub const SECRET: &str = \"{}\";", secret)
    ).expect("Could not write secret.rs");
}
