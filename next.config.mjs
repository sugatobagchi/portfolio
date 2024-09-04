/** @type {import('next').NextConfig} */

const base_url = process.env.NEXT_PUBLIC_MEET_URL;

const nextConfig = {
    redirects: async () => {
        const redirectsArray = [];
        
        for (let i = 1; i <= 9; i++) {
            redirectsArray.push({
                source: `/meet${i}`,
                destination: `${base_url}?authuser=${i}`,
                permanent: true,
            });
        }

        redirectsArray.push({
            source: '/meet',
            destination: `${base_url}`,
            permanent: true,
        });

        redirectsArray.push({
            source: '/meet:authuser(\\d+)',
            destination: `${base_url}`, 
            permanent: true,
        });

        return redirectsArray;
    },
};

export default nextConfig;
