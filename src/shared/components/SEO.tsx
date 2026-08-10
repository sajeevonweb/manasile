import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  /** Set true for pages that should never be indexed (e.g. dynamic result pages). */
  noindex?: boolean;
}

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    tag.setAttribute('content', content);
    document.head.appendChild(tag);
  }
}

function setCanonicalLink(href: string) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (tag) {
    tag.setAttribute('href', href);
  } else {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    tag.setAttribute('href', href);
    document.head.appendChild(tag);
  }
}

/**
 * Builds this page's canonical URL from the current location.
 * Always trailing-slashed except for the root path, matching how
 * GitHub Pages actually serves directory-style routes (it redirects
 * /about -> /about/, so /about/ is the "real" URL).
 */
function getCanonicalUrl(): string {
  const { origin, pathname } = window.location;
  const normalizedPath =
    pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${origin}${normalizedPath}`;
}

export default function SEO({ title, description, noindex }: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMetaByProperty('og:title', title);
    setMetaByProperty('twitter:title', title);

    if (description) {
      setMetaByName('description', description);
      setMetaByProperty('og:description', description);
      setMetaByProperty('twitter:description', description);
    }

    const canonicalUrl = getCanonicalUrl();
    setCanonicalLink(canonicalUrl);
    setMetaByProperty('og:url', canonicalUrl);
    setMetaByProperty('twitter:url', canonicalUrl);

    setMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, noindex]);

  return null;
}
