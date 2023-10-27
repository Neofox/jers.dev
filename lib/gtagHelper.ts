export const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        cookie_flags: "max-age=7200;secure;samesite=none",
    });
};
