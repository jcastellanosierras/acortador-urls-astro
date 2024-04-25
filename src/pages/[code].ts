import type { APIRoute } from "astro";
import { getLinkUrl } from "../utils/db";

export const GET: APIRoute = async ({ params }) => {
  const { code } = params

  if (!code) {
    return new Response(null, {
      status: 400
    })
  }

  const url = await getLinkUrl(code)

  if (!url.success) {
    return new Response(null, {
      status: 500
    })
  }

  if (!url.data) {
    return new Response(null, {
      status: 404
    })
  }

  return new Response(null, {
    status: 307,
    headers: {
      'Location': url.data
    }
  })
}