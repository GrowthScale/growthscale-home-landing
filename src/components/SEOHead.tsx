import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
  }>;
}

export const SEOHead = ({ 
  title = "GrowthScale - Gestão Inteligente de Escalas para Food Service",
  description = "Transforme a gestão da sua equipe com IA. Otimize escalas, reduza custos operacionais em até 30% e garanta compliance trabalhista automaticamente. Comece grátis por 14 dias.",
  keywords = "gestão de escalas, food service, restaurante, bar, CLT, compliance trabalhista, IA, inteligência artificial, otimização de custos, gestão de funcionários, escala de trabalho, software restaurante",
  ogImage = "https://growthscale.com.br/og-image.jpg",
  ogUrl = "https://growthscale.com.br",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  canonical,
  noindex = false,
  nofollow = false,
  lang = "pt-BR",
  meta = []
}: SEOHeadProps) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GrowthScale",
    "description": "Plataforma com IA para gestão de escalas, otimização de custos e compliance CLT para restaurantes e bares",
    "url": "https://growthscale.com.br",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL",
      "description": "14 dias grátis"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "GrowthScale",
      "url": "https://growthscale.com.br"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowthScale",
      "logo": {
        "@type": "ImageObject",
        "url": "https://growthscale.com.br/logo.png"
      }
    },
    "featureList": [
      "Gestão de escalas com IA",
      "Compliance CLT automático",
      "Otimização de custos",
      "Integração WhatsApp",
      "Relatórios inteligentes"
    ],
    "screenshot": "https://growthscale.com.br/screenshot.jpg",
    "softwareVersion": "2.0.0",
    "releaseNotes": "Nova versão com IA aprimorada e compliance CLT automático",
    "downloadUrl": "https://growthscale.com.br",
    "installUrl": "https://growthscale.com.br",
    "requirements": "Navegador web moderno",
    "fileSize": "0KB",
    "memoryRequirements": "N/A",
    "storageRequirements": "N/A",
    "processorRequirements": "N/A"
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GrowthScale" />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="language" content={lang} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="theme-color" content="#FF6B00" />
      <meta name="msapplication-TileColor" content="#FF6B00" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="GrowthScale" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="GrowthScale" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="GrowthScale - Gestão Inteligente de Escalas" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@growthscale" />
      <meta name="twitter:creator" content="@growthscale" />

      {/* Additional Meta Tags */}
      {meta.map((tag, index) => (
        <meta key={index} name={tag.name} content={tag.content} />
      ))}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>

      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "GrowthScale",
          "url": "https://growthscale.com.br",
          "logo": "https://growthscale.com.br/logo.png",
          "description": "Plataforma com IA para gestão de escalas e compliance CLT",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "contato@growthscale.com.br",
            "availableLanguage": "Portuguese"
          },
          "sameAs": [
            "https://www.linkedin.com/company/growthscale",
            "https://www.facebook.com/growthscale",
            "https://www.instagram.com/growthscale"
          ]
        })}
      </script>

      {/* WebSite Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GrowthScale",
          "url": "https://growthscale.com.br",
          "description": "Gestão inteligente de escalas para food service",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://growthscale.com.br/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* BreadcrumbList Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://growthscale.com.br"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Produto",
              "item": "https://growthscale.com.br/produto"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Preços",
              "item": "https://growthscale.com.br/precos"
            }
          ]
        })}
      </script>

      {/* FAQ Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Como o GrowthScale funciona?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "O GrowthScale usa IA para otimizar escalas automaticamente, garantindo compliance CLT e reduzindo custos operacionais."
              }
            },
            {
              "@type": "Question",
              "name": "Quanto custa o GrowthScale?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Comece gratuitamente por 14 dias. Planos a partir de R$49/mês para até 15 funcionários."
              }
            },
            {
              "@type": "Question",
              "name": "O GrowthScale é compatível com a CLT?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim, o GrowthScale garante 100% de compliance com a CLT, validando automaticamente todas as regras trabalhistas."
              }
            }
          ]
        })}
      </script>

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
    </Helmet>
  );
};