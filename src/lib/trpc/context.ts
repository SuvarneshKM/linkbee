import { db } from "@/lib/db/index";
import { getAuthSession } from "../auth/utils";

export async function createTRPCContext(opts: { headers: Headers }) {
  const session = await getAuthSession();

  return {
    db,
    session: session,
    ...opts,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
