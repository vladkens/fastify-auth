import { FastifyPlugin, FastifyRequest, FastifyReply, preHandlerHookHandler, FastifyInstance } from 'fastify';

type FastifyAuthFunctionCallback = (
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  done: (error?: Error) => void
) => void;

type FastifyAuthFunctionAsync = (
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<void>;

export type FastifyAuthFunction = FastifyAuthFunctionCallback | FastifyAuthFunctionAsync;

declare module 'fastify' {
  interface FastifyInstance {
    auth(
      functions: FastifyAuthFunction[],
      options?: {
        relation?: 'and' | 'or',
        run?: 'all'
      }
    ): preHandlerHookHandler;
  }
}

declare const fastifyAuth: FastifyPlugin;
export default fastifyAuth;
