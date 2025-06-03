CREATE TABLE IF NOT EXISTS espolon_data(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    birth_date TEXT,
    zip_code TEXT,
    updationtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
