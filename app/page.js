import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import { getFeaturedBlogs } from "@/app/lib/firestoreData";

export default async function Home() {
  // جلب المدونات المميزة فقط (6 مدونات)
  const blogs = (await getFeaturedBlogs(6)) || [];

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  )
};