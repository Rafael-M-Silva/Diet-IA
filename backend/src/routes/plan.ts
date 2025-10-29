import type { FastifyInstance } from "fastify";
import { DietaPlanRequestSchema } from "../types";
import { generateDietPlan } from "../agent";
import { da } from "zod/v4/locales";

export async function planRoutes(app: FastifyInstance) {
  app.post("/plan", async (request, reply) => {
    reply.raw.setHeader("Access-Control-Allow-Origin", "*")
    reply.raw.setHeader("Content-Type", "text/plan; charset=utf-8")

    reply.raw.setHeader("Content-Type", "text/event-stream")
    reply.raw.setHeader("Cache-Control", "no-cache")
    reply.raw.setHeader("Connection", "keep-alive")

    const parse = DietaPlanRequestSchema.safeParse(request.body);
    if(!parse.success) {
      return reply.status(400).send( {
        error: "ValidationError",
        details: parse.error.flatten(issue => issue.message)
      })
    }

    try {

      for await(const delta of generateDietPlan(parse.data)) {
        reply.raw.write(delta)
      }

      reply.raw.end();
    
    } catch (err: any) {
      request.log.error(err);
      reply.raw.write(`event: Error ${JSON.stringify(err.message)}`)
      reply.raw.end();
    }

    return reply;
  })
}