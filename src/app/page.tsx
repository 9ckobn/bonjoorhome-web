"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Properties from "@/components/Properties";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useRentData } from "@/utils/useRentData";

export default function Home() {
  const rentData = useRentData();

  return (
    <main>
      <Header />
      <Hero />
      <Properties rentData={rentData} />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
