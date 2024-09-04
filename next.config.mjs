/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        const redirectsArray = [];

        for (let i = 1; i <= 9; i++) {
            redirectsArray.push({
                source: `/meet${i}`,
                destination: `https://meet.google.com/ojg-fjjb-hin?authuser=${i}`,
                permanent: true,
            });
        }

        redirectsArray.push({
            source: '/meet',
            destination: 'https://meet.google.com/ojg-fjjb-hin',
            permanent: true,
        });

        redirectsArray.push({
            source: '/meet:authuser(\\d+)', 
            destination: 'https://meet.google.com/ojg-fjjb-hin', 
            permanent: true,
        });

        return redirectsArray;
    },
};

export default nextConfig;
