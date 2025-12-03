'use client'
import AppsCta from './components/AppsCta'
import ContactCta from './components/ContactCta'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Works from './components/Works'

export default function HomePageClient() {
  return (
    <>
      <Hero />
      <Projects />
      <Works />
      <AppsCta />
      <ContactCta />
    </>
  )
}
