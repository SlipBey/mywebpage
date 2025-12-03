import Navbar from './Navbar/index'
import { PropsWithChildren } from 'react'
import ClientProviders from './ClientProviders'
import Footer from './Footer'
import Mounted from './Mounted'
import { LightboxProvider } from '../LightboxProvider'

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <ClientProviders>
      <Mounted>
        <LightboxProvider>
          <div className="theme-ice relative px-3 xl:px-24 py-3 xl:py-8">
            <div aria-hidden className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-ice" />
              <div className="absolute inset-0 bg-ice-dots" />
              <div className="absolute inset-0 bg-ice-noise" />
            </div>

            <Navbar />
            <main className="py-12 xl:py-24 space-y-12 xl:space-y-24">
              {children}
            </main>

            <Footer />
          </div>
        </LightboxProvider>
      </Mounted>
    </ClientProviders>
  )
}
