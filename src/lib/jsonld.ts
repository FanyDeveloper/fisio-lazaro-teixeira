import { avaliacoes, empresa } from '../data/empresa'

/** JSON-LD do tipo Physiotherapy (subtipo de MedicalBusiness / LocalBusiness). */
export function businessJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    '@id': `${empresa.site}/#consultorio`,
    name: empresa.nome,
    url: empresa.site,
    image: `${empresa.site}/og-image.jpg`,
    telephone: empresa.telefoneE164,
    priceRange: '$$', // [CONFIRMAR]
    address: {
      '@type': 'PostalAddress',
      streetAddress: empresa.endereco.rua,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.uf,
      postalCode: empresa.endereco.cep,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'City', name: 'Balneário Camboriú' },
    openingHoursSpecification: empresa.horariosSchema.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      ...h,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: empresa.google.nota,
      reviewCount: empresa.google.avaliacoes,
      bestRating: 5,
    },
    review: avaliacoes.map((a) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: a.nome },
      reviewRating: { '@type': 'Rating', ratingValue: a.nota, bestRating: 5 },
      reviewBody: a.texto,
    })),
    employee: {
      '@type': 'Person',
      name: empresa.profissional,
      jobTitle: empresa.especialidade,
    },
  }
  // [CONFIRMAR: coordenadas] — só entra no JSON-LD quando preenchidas em empresa.ts
  if (empresa.geo) {
    data.geo = { '@type': 'GeoCoordinates', latitude: empresa.geo.lat, longitude: empresa.geo.lng }
  }
  if (empresa.instagram) data.sameAs = [`https://instagram.com/${empresa.instagram.replace('@', '')}`]
  return data
}
