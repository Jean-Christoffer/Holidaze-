import { countryNames } from "./countries";
//long strings
export function ellipsizeString(str: string | undefined, startChars: number, endChars: number, maxLength: number) {
    if (!str) return ""
    if (str.length <= maxLength) {
        return str;
    }

    const dots = '...';
    const start = str.substring(0, startChars);
    const end = str.substring(str.length - endChars, str.length);

    return start + end + dots;
}
//countryCheck
export function checkCountry(country: string) {
    if (!country || country === null || country === undefined) return "NO"
    let foundCountry = countryNames.find(countryName => countryName.toLowerCase() === country.toLowerCase())
    return foundCountry || "NO";
}
