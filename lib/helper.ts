import { NextRequest } from "next/server";

// helper function to pull params from HTTP request into neat object
export const getParamsObject = (request: NextRequest) => {

  let params: any = {};
  for (const [key, val] of request.nextUrl.searchParams.entries()) {
    params[key] = val;
  }
  
  return params;
}

// fetcher function for useSWR
export const fetcher = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const res = await fetch(input, init);
  return res.json();
}