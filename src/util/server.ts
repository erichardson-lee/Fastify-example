import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

export type FastifyServer = ReturnType<typeof createServer>;
export function createServer() {
  const server = fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  return server;
}
