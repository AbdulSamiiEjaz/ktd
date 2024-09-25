import { TOML_SPLITTERS } from "./constants.ts";

function useTomlDeps(file_content: string[]) {
  const versions = file_content[0];
  const libs = file_content[1];
  const plugins = file_content[2];

  return { versions, libs, plugins };
}

export function get_room_deps_toml(file_content: string[]): string {
  const { versions } = useTomlDeps(file_content);

  const ROOMCOMPLIER_VERSION = "2.6.1";
  const ROOMKTX_VERSION = "2.6.1";
  const ROOMRUNTIME_VERSION = "2.6.1";
  const ROOMTESING_VERSION = "2.6.1";

  let updated_versions = versions;
  if (!versions.includes("# ROOM")) {
    updated_versions += "# ROOM";
  }
  if (!versions.includes(`roomCompiler = "${ROOMCOMPLIER_VERSION}"`)) {
    updated_versions += `\nroomCompiler = "${ROOMCOMPLIER_VERSION}"`;
  }
  if (!versions.includes(`roomKtx = "${ROOMKTX_VERSION}"`)) {
    updated_versions += `\nroomKtx = "${ROOMKTX_VERSION}"`;
  }
  if (!versions.includes(`roomRuntime = "${ROOMRUNTIME_VERSION}"`)) {
    updated_versions += `\nroomRuntime = "${ROOMRUNTIME_VERSION}"`;
  }
  if (!versions.includes(`roomTesting = "${ROOMTESING_VERSION}"`)) {
    updated_versions += `\nroomTesting = "${ROOMTESING_VERSION}"`;
  }
  if (!versions.includes(`${TOML_SPLITTERS.DEPS}`)) {
    updated_versions += `\n${TOML_SPLITTERS.DEPS}`;
  }
  return updated_versions;
}
