/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        user: string;
        token: string;
        venueManager: boolean;

    }
}
declare module 'lodash';