// TODO  Delete Later

import { ServerRequest, Response } from "https://deno.land/std/http/server.ts";

enum METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export class ResponseBuilder {
  #headers = new Headers();
  #status = 404;
}

interface URIData {
  route: string | string[];
  params?: { [key: string]: string };
}

// UrlParams does'nt work with first param after ?
const ALLOWED_PARAMS = ["searchBy", "sortBy"];

const parseURI = (url: string): URIData => {
  const routes = url.split("/").filter(Boolean);
  const searchParams = new URLSearchParams(url);

  console.log(searchParams.has("searchBy"));

  const params = ALLOWED_PARAMS.reduce((acc, param) => {
    if (searchParams.has(param)) {
      acc[param] = searchParams.get(param)!;
    }

    return acc;
  }, {} as { [key: string]: string });

  return { route: routes, params };
};

export const getRouter = (req: ServerRequest) => {
  const routeData = parseURI(req.url);
  req.respond({ body: JSON.stringify({ url: req.url, data: routeData }) });
};

export const postRouter = (req: ServerRequest) => {};

export default function requestParser(req: ServerRequest) {
  // room
  // room/1
  switch (req.method) {
    case METHOD.GET:
      return getRouter(req);
    case METHOD.POST:
      return postRouter(req);
  }
}
