#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::ops::Deref;

use tauri::{Menu, MenuItem, Submenu};

fn main() {
  let edit_menu = Submenu::new(
    "編集",
    Menu::new()
      .add_native_item(MenuItem::Copy)
      .add_native_item(MenuItem::Cut)
      .add_native_item(MenuItem::Paste)
      .add_native_item(MenuItem::Undo)
      .add_native_item(MenuItem::Redo),
  );
  let app_menu = Submenu::new(
    "SMT".to_string(),
    Menu::new()
      .add_native_item(MenuItem::About("PM".to_string()))
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::Quit),
  );
  let menu = Menu::new().add_submenu(app_menu).add_submenu(edit_menu);
  tauri::Builder::default()
    .menu(menu)
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
