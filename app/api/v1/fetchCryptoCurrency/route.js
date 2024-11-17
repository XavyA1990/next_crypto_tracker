// import { NextResponse } from "next/server";

// const apiKey = process.env.CMC_API_KEY;

// export async function GET(request) {
//     const date 
//     = new Date().toISOString().split('T')[0];
//   const url =
//     `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/historical?name=bitcoin&date=${date}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         "X-CMC_PRO_API_KEY": apiKey,
//         Accept: "application/json",
//       },
//     });
//     console.log("🚀 ~ GET ~ response:", response)

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     const cryptocurrencies = data.data;
//     console.log("🚀 ~ GET ~ cryptocurrencies:", cryptocurrencies)

//     return NextResponse.json({ data: cryptocurrencies }, { status: 200 });
//   } catch (error) {
//     console.error("🚀 ~ GET ~ error", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
