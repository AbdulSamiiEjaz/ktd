import { parseArgs } from "@std/cli";
import { PACKAGES } from "./utils/constants.ts";
import { add_package } from "./utils/helpers.ts";

function printUsage() {
  console.log("Usage: ktd i <dependency>");
  console.log("Options:");
  console.log("  --version, -v    Specify the version of the dependency");
  console.log("  --help, -h       Show this help message");
}

export function printTomlPackageAdded(dependency: string) {
  console.log(` added ${dependency} in libs.version.toml:`);
}

function main() {
  try {
    const args = parseArgs(Deno.args);
    const dep_args = args._;

    if (
      dep_args[0].toString().toLowerCase() == "i" ||
      dep_args[0].toString().toLowerCase() === "install"
    ) {
      const dependency = dep_args[1].toString();
      if (PACKAGES.includes(dependency)) {
        add_package(dependency);
      } else {
        console.log("Package Not Found! 😔");
      }
    } else {
      console.log(`Command ${dep_args[0]} not found! 🚫`);
      printUsage();
    }
  } catch (error) {
    console.log(error.message);
  }
}

if (import.meta.main) {
  main();
}
