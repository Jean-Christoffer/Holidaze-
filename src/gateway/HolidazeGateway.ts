import type { Venue, Venues } from "../types/types";

class HolidazeGateWay {
    private static readonly baseUrl = new URL("https://v2.api.noroff.dev/holidaze")

    //fetchVenues or venue
    public async getVenues({
        id = '',
        query = '',
        retryCount = 3,
    }: { id?: string; query?: string; retryCount?: number }): Promise<Venues | Venue> {

        const endpoint = id ? `/venues/${id}` : '/venues';

        try {
            const response = await HolidazeGateWay.fetchVenues(endpoint, query);
            const data = await response.json();
            return data.data;
        } catch (err: any) {
            if (err.message.startsWith('Request failed with status: 5') && retryCount > 0) {
                const waitTime = 2 ** (4 - retryCount) * 100;
                console.error(`Retry after error: ${err.message}, waiting ${waitTime}ms`);
                await new Promise((resolve) => setTimeout(resolve, waitTime)); 
                return this.getVenues({ id, query, retryCount: retryCount - 1 });
            }
            console.error(`Error fetching venues: ${err}`);
            throw err;
        }
    }
    private static async fetchVenues(endpoint: string, query: string): Promise<Response> {
        const urlString = `${HolidazeGateWay.baseUrl.toString()}${endpoint}${query}`;
        return fetch(urlString);
    }
}

export {HolidazeGateWay}