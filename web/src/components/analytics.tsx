import React from 'react'
import Helmet from 'react-helmet'

//
// === Initialize global Analytics ===
//

export const Initialize = ({
  facebookPixelId,
  googleAnalyticsPropertyId,
  googleLinkerDomains,
}: {
  facebookPixelId?: string
  googleAnalyticsPropertyId?: string
  googleLinkerDomains?: any[]
}) => {
  // Initialize Gtag
  const dataLayer = global.dataLayer || [];
  global.gtag && global.gtag('js', new Date());

  return {
    pageview(location) {
      global.gtag && global.gtag('config', googleAnalyticsPropertyId, {
        page_path: location.pathname,
        linker: {
          domains: googleLinkerDomains,
        }
      });
      global.fbq && global.fbq('track', 'PageView');
    },
    viewProduct(item = {}) {
      global.gtag && global.gtag('event', 'view_item', { items: [item] });

      global.fbq && global.fbq('track', 'ViewContent', {
        content_name: item.name,
        content_ids: [item.id],
        content_type: 'product',
        value: item.price,
        currency: 'USD'
      });
    },
    addToCart(item = {}) {
      global.gtag && global.gtag('event', 'add_to_cart', { items: [item] });

      global.fbq && global.fbq('track', 'AddToCart', {
        content_name: item.name,
        content_ids: [item.id],
        content_type: 'product',
        value: item.price,
        currency: 'USD'
      });
    },
    removeFromCart(item = {}) {
      global.gtag && global.gtag('event', 'remove_from_cart', { items: [item] });
    },
    clickCheckout() {
      global.gtag && global.gtag('event', 'Click Checkout',);
      global.fbq && global.fbq('track', 'InitiateCheckout');
    }
  };
};

//
// === Group all script tags here` ===
//

export default ({
  googleAnalyticsPropertyId,
  gtmPropertyId,
  facebookPixelId
}: {
  gtmPropertyId?: string
  googleAnalyticsPropertyId?: string
  facebookPixelId?: string
}) => (
    <Helmet>
      {/* GA */}
      {googleAnalyticsPropertyId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsPropertyId}`}
        />)}
      {googleAnalyticsPropertyId && (<script>{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      `}</script>)}
      {/* GTM */}
      {gtmPropertyId && (
        <script>{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmPropertyId}');`
        }</script>)}
      {gtmPropertyId && (
        <noscript>{`
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=${gtmPropertyId}"
            height="0"
            width="0"
            style="display: none; visibility: hidden;">
          </iframe>
        `}</noscript>)}
      {/* Facebook */}
      {facebookPixelId && (
        <script>{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${facebookPixelId}');
        `}</script>)}
      {facebookPixelId &&(
        <noscript>{`
          <img
            height="1"
            width="1"
            style="display:none" 
            src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1"
          />
        `}</noscript>)}
    </Helmet>
  );