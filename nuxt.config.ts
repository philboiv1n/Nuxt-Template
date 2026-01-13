const isProd = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Nuxt Template',
    },
  },
  modules: ['nuxt-security'],
  security: {
    headers: {
      contentSecurityPolicy: isProd
        ? {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'"],
            'style-src': ["'self'", "'unsafe-inline'"],
            'img-src': ["'self'", 'data:'],
            'font-src': ["'self'", 'data:'],
            'connect-src': ["'self'"],
            'object-src': ["'none'"],
            'base-uri': ["'self'"],
            'frame-ancestors': ["'none'"],
          }
        : false,
    },
  },
});
