import { Static, Type } from "@sinclair/typebox";

export type ConfigSchema = Static<typeof ConfigSchema>;
export const ConfigSchema = Type.Object({
  server: Type.Object({
    port: Type.Integer({
      minimum: 0,
      maximum: 65353,
      title: "Port",
      description: "The port to listen for requests on",
    }),
  }),
});
