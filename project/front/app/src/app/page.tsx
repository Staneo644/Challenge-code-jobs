"use client";
import "./globals.css";
import Login from "./login";

export default function Home() {
  return <main className="absolute h-full w-full bg-white">{Login()}</main>;
}
