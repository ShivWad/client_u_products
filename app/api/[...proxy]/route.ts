import { cookies } from 'next/headers'
const BASE_URL = process.env.EX_APP_URL;

export async function POST(request: Request) {
  try {
    let url = new URL(request.url);
    let mainUrl = BASE_URL + url.pathname;
    // console.log("calling>>", mainUrl);
    let reqBody = await request.json();

    const cookieStore = cookies();
    const token = cookieStore.get("sesAuth");
    let reqOptions: RequestInit = {
      method: "POST",
      credentials: "include",
      cache: "no-cache",
      redirect: "follow",
      body: JSON.stringify(reqBody),
    };
    if (token && token?.value) {
      reqOptions.headers = {
        "Cookie": token.value,
        "Content-Type": 'application/json',
      }
    }
    else {
      reqOptions.headers = {
        "Content-Type": 'application/json',
      }
    }

    // console.log("reqOptions", reqOptions)

    const res = await fetch(mainUrl, reqOptions);
    // console.log("Res status>>", res.status);
    const data = await res.json();
    cookieStore.set({ name: "sesAuth", value: res.headers.getSetCookie()[0], httpOnly: true });
    return new Response(JSON.stringify(data), { status: res.status });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}

export async function GET(request: Request) {
  let url = new URL(request.url);
  try {
    let mainUrl = BASE_URL + url.pathname;
    // console.log("calling>>", mainUrl);
    const cookieStore = cookies();
    const token = cookieStore.get("sesAuth");


    let reqOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
      redirect: "follow",
    };
    if (token && token?.value) {
      reqOptions.headers = {
        "Cookie": token.value,
        "Content-Type": 'application/json',
      }
    }
    else {
      reqOptions.headers = {
        "Content-Type": 'application/json',
      }
    }

    const res = await fetch(mainUrl, reqOptions);
    let data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  } catch (error) {
    console.log(error);
    console.log("url>>>", url.pathname);

    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}