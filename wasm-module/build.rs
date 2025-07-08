use std::env;
use std::fs;
use std::path::Path;

fn main() {
    // Перекомпилировать при изменении .env файла
    println!("cargo:rerun-if-changed=.env");
    
    // Загружаем .env файл
    dotenv::dotenv().ok();
    
    // Получаем SECRET из переменных окружения или используем значение по умолчанию
    let secret = env::var("SECRET").unwrap_or_else(|_| "default-secret-key".to_string());
    
    // Создаем директорию для выходных файлов, если её нет
    let out_dir = env::var("OUT_DIR").expect("OUT_DIR is not set");
    let dest_path = Path::new(&out_dir).join("secret.rs");
    
    // Генерируем код с SECRET
    fs::write(
        dest_path,
        format!("pub const SECRET: &str = \"{}\";", secret)
    ).expect("Could not write secret.rs");
}
