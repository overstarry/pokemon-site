import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PokeVerse - Pokémon Encyclopedia",
    template: "%s | PokeVerse"
  },
  description: "Explore the amazing world of Pokémon and discover your favorite companions. Complete Pokemon database with detailed information about all Pokémon species, stats, abilities, and evolution chains.",
  keywords: [
    "pokemon",
    "pokédex",
    "pokedex",
    "pokemon encyclopedia",
    "pokemon database",
    "pokemon stats",
    "pokemon abilities",
    "pokemon types",
    "pokemon evolution",
    "nintendo",
    "game freak"
  ],
  authors: [{ name: "PokeVerse Team" }],
  creator: "PokeVerse",
  publisher: "PokeVerse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://pokemon.jasminides.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'PokeVerse',
    title: 'PokeVerse - Pokémon Encyclopedia',
    description: 'Explore the amazing world of Pokémon and discover your favorite companions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PokeVerse - Pokémon Encyclopedia',
    description: 'Explore the amazing world of Pokémon and discover your favorite companions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://assets.pokemon.com" />
        <link rel="dns-prefetch" href="https://pokeapi.co" />
        
        {/* Mobile and PWA optimization */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PokeVerse" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* PWA Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="PokeVerse" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R70PSR49J8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R70PSR49J8');
          `}
        </Script>

        {/* Service Worker Registration */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>

        <ThemeProvider defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
