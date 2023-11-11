import { cookies } from 'next/headers'
const BASE_URL = "http://localhost:4000";

export async function POST(request: Request) {
  let url = new URL(request.url);
  let mainUrl = BASE_URL + url.pathname;
  console.log("calling>>", mainUrl);
  let body = await request.json();
  const res = await fetch(mainUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const cookieStore = cookies();
  cookieStore.set({ name: "sesAuth", value: res.headers.getSetCookie()[0], httpOnly: true });
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function GET(request: Request) {
  let url = new URL(request.url);
  let mainUrl = BASE_URL + url.pathname;
  console.log("calling>>", mainUrl);
  const cookieStore = cookies();
  const token = cookieStore.get("sesAuth");
  let reqOptions: RequestInit;
  if (token) {
    reqOptions = {
      headers: {
        "Content-Type": 'application/json',
        "Cookie": token?.value ? token?.value : "",
      },
      credentials: "include",
      cache: "no-cache",
      redirect: "follow"
    }
  }
  else {
    reqOptions = {
      headers: {

      },
    }
  }
  const res = await fetch(mainUrl, reqOptions);
  let data = await res.json();
  return new Response(JSON.stringify(data), { status: res.status });
}