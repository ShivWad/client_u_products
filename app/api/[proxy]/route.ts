import { cookies } from 'next/headers'

export async function POST(request: Request) {
  let path = request.url;
  let mainUrl = "";
  if (path.includes("/api/login")) {
    mainUrl = 'http://localhost:4000/api/user/login';
  }
  let body = await request.json();
  const res = await fetch(mainUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  console.log(res.status);
  const data = await res.json();
  console.log(data);
  const cookieStore = cookies();
  cookieStore.set({ name: "sesAuth", value: res.headers.getSetCookie()[0], httpOnly: true });
  return new Response(JSON.stringify(data), { status: res.status });
}

export async function GET(request: Request) {
  let path = request.url;
  let mainUrl = "";
  if (path.includes("/api/user")) {
    mainUrl = "http://localhost:4000/api/user/all";
  }
  else if (path.includes("/api/categories")) {
    mainUrl = "http://localhost:4000/api/categories";
  }

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