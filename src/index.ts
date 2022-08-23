import { createServer, SetupConfig } from "utils";

// If this module is directly called
if (require.main === module) main();

async function main() {
  await SetupConfig(console.log);
  const f = createServer();
  await SetupConfig((msg: string) => f.log.info(msg), true);

  f.route({
    url: "/",
    method: "GET",
    handler: async () => "Hello World",
  });

  f.listen({ port: 3000 });
}
