import AuthenticationService from "@/pages/api/authentication/AuthenticationService";
import { NextResponse } from "next/server";

const protectedUserRoutes = ["/tshirts"];
const protectedAdminRoutes = ["/product/addproduct"];

export function middleware(req) {
  const { url } = req.nextUrl;
  //console.log("This is the URl", req.nextUrl.pathname);
  return NextResponse.next();
}
