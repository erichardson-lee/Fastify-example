import { CreateConfig } from "@erichardson-lee/config-ts";
import { writeFile } from "fs/promises";
import { join } from "path";
import { ConfigSchema } from "../ConfigSchema";

type Resolve<T> = T extends Promise<infer R> ? R : T;

//#region Config singleton
async function LoadConfig(logger: (msg: string) => void) {
  return await CreateConfig({
    schema: ConfigSchema,
    env: { load: true },
    yaml: { load: true },
    errorLogger: logger,
  });
}

let config: Resolve<ReturnType<typeof LoadConfig>>;
export async function SetupConfig(logger: (msg: string) => void) {
  if (config)
    logger(
      "Setting up config again, ignore this message if this is intentional"
    );
  return (config = await LoadConfig(logger));
}

export function GetConfig() {
  if (!config) throw new Error("Tried getting config before loading it");
  return config;
}
//#endregion

//#region Config Export

// If this module is called directly, export the config
if (require.main === module)
  exportConfigSchema(
    join(process.cwd(), process.argv[2] ?? "./config.schema.json")
  );

async function exportConfigSchema(path: string) {
  try {
    await writeFile(path, JSON.stringify(ConfigSchema, undefined, 2));
    console.log(`Successfully wrote config schema to ${path}`);
  } catch (e) {
    console.error(`Error writing config schema to ${path}`);
    console.error(e);
  }
}
//#endregion
