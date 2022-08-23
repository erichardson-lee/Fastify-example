import { createServer } from "./server";
import { SetupConfig } from "./util/config";
if (require.main === module) main();

async function main() {
  await SetupConfig(console.log);
  const f = createServer();
  await SetupConfig((msg: string) => f.log.info(msg));

  f.route({
    url: "/",
    method: "GET",
    handler: async () => "Hello World",
  });

  f.listen({ port: 3000 });
}
