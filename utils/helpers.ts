import { printTomlPackageAdded } from "../main.ts";
import { get_room_deps_toml } from "./add_package.ts";
import {
  LIBS_VERISONS_TOML_PATH,
  PACKAGES_NAMES,
  TOML_SPLITTERS,
} from "./constants.ts";

export async function add_package(dependency: string) {
  const updated_toml_contents = await add_toml_package(dependency);
  update_toml_file_contents(updated_toml_contents);
  printTomlPackageAdded(dependency);
}

async function add_toml_package(dependency: string) {
  let updated_content = "";
  const file_contents = await get_toml_file_contents();
  switch (dependency) {
    case PACKAGES_NAMES.ROOMDB:
      updated_content = get_room_deps_toml(file_contents);
  }
  return updated_content;
}

async function get_toml_file_contents() {
  const bytes_contents = await Deno.readFile(LIBS_VERISONS_TOML_PATH);
  const decoded_content = new TextDecoder().decode(bytes_contents);
  const versions = decoded_content.split(TOML_SPLITTERS.DEPS);
  return versions;
}

async function update_toml_file_contents(updated_content: string) {
  await Deno.writeTextFile(LIBS_VERISONS_TOML_PATH, updated_content);
}
