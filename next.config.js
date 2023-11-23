/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['idm.eu1.inforcloudsuite.com'],
    },
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: `frame-ancestors 'self' https://idm.eu1.inforcloudsuite.com https://mingle-portal.eu1.inforcloudsuite.com https://mingle-sso.eu1.inforcloudsuite.com https://mingle-extensions.eu1.inforcloudsuite.com;`
                  },
              
            ],
          },
        ]
      },
}

module.exports = nextConfig

