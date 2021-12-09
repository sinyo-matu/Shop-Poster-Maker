#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::ops::Deref;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let mut path_base = tauri::api::path::app_dir(app.config().deref()).unwrap();
      if tauri::api::dir::is_dir(&path_base).is_err() {
        std::fs::create_dir(&path_base).unwrap();
        path_base.push("images");
        std::fs::create_dir(path_base).unwrap();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
