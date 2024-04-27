import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ locals, cookies }, next) => {
    const sessionCookie = cookies.get("session")?.json();


    locals.user = sessionCookie?.name
    locals.token = sessionCookie?.accessToken

    return next();
});


