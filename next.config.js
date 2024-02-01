/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
          },
          {
              protocol: 'https',
              hostname: 'devforum-uploads.s3.dualstack.us-east-2.amazonaws.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com'
          },
          {
            protocol: 'https',
            hostname: 'github.com'
          },
          {
            protocol: 'https',
            hostname: 'imagesprojects.s3.ap-south-1.amazonaws.com'
          }


      ]
  },
}

module.exports = nextConfig;
