import { PrismaClient } from "@prisma/client";
import { UserSession } from "./pages/api/auth/[...nextauth]";
import { getSession as nextAuthGetSession } from "next-auth/react";
import Boom from "@hapi/boom";
import { NextApiRequest, NextApiResponse } from "next";
import nc from 'next-connect'

export const singleton = async <T>(id: string, fn: () => Promise<T>) => {
  if (process.env.NODE_ENV === "production") {
    return await fn()
  } else {
    if (!global[id]) {
      global[id] = await fn()
    }
    return global[id] as T;
  }
};

export const singletonSync = <T>(id: string, fn: () => T) => {
  if (process.env.NODE_ENV === "production") {
    return fn();
  } else {
    if (!global[id]) {
      global[id] = fn();
    }
    return global[id] as T;
  }
};

export const prisma = singletonSync("prisma", () => {
  return new PrismaClient();
});

export function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const getSession = async (req) => {
  return (await nextAuthGetSession({ req }));
};

export const HTTPException = Boom;
export const apiHandler = () => nc<NextApiRequest, NextApiResponse>({
  onError(e, req: NextApiRequest, res: NextApiResponse) {
    if (Boom.isBoom(e)) {
      res.status(e.output.payload.statusCode);
      res.json({
        error: e.output.payload.error,
        message: e.output.payload.message,
      });
    } else {
      res.status(500);
      res.json({
        message: "Unexpected error",
      });
      console.error(e);
      // unexcepted error
    }
  },
});