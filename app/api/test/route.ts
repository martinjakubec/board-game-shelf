import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// write a next js api GET route function for app router which returns a string containing "Hello World".
export function GET(req: any, res: any, ...other: any) {
  console.log('req', req);
  console.log('res', res);
  console.log('other', other);
  
  return NextResponse.json({ body: "Hello World" });
}