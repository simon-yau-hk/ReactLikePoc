
'use client'
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    console.log('Info 1 - Client Side Only'); // ← Only appears in browser
  }, [])
  
  console.log('Info 1');
  return (
  
    <div>Info 1</div>
  );
}
