
import type { Venue, VenueData } from "../types/types";

class HolidazeGateWay {
  private static baseUrl = 'https://v2.api.noroff.dev';
  private static authUrl = `${HolidazeGateWay.baseUrl}/auth`;
  private static profileUrl = `${HolidazeGateWay.baseUrl}/holidaze/profiles`;

  private static headers(token: string = '', apiKey: string = '') {
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(apiKey && { 'X-Noroff-API-Key': apiKey }),
    };
  }

  private static async httpRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    body: any = null,
    token: string = '',
    apiKey: string = ''
  ): Promise<any> {
    const response = await fetch(`${endpoint}`, {
      method,
      headers: HolidazeGateWay.headers(token, apiKey),
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.errors[0]?.message ?? 'Unknown error');
    }

    const data = await response.json();

    return {
      data: data.data,
      message: "success!",
      success: true
    }
  }

  public async getVenues(options: { id?: string, query?: string, retryCount?: number } = {}): Promise<VenueData> {
    const { id = "", query = "", retryCount = 3 } = options;
    const endpoint = `${HolidazeGateWay.baseUrl}/holidaze/venues${id ? `/${id}` : ''}${query ? `?query=${query}` : ''}?_bookings=true&_venues=true&_owner=true`;

    try {
      return await HolidazeGateWay.httpRequest('GET', endpoint);
    } catch (err: any) {
      if (err.message.startsWith("Request failed with status: 5") && retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, 4 - retryCount) * 100));
        return this.getVenues({ id, query, retryCount: retryCount - 1 });
      }
      throw err;
    }
  }

  public async register(formData: FormData): Promise<any> {
    const formJson = Object.fromEntries(formData.entries());
    const formattedJson = {
      ...formJson,
      avatar: formJson.avatar || 'https://i.stack.imgur.com/EzZiD.png',
      venueManager: formJson.venueManager === 'on',
    };
    return await HolidazeGateWay.httpRequest('POST', `${HolidazeGateWay.authUrl}/register`, formattedJson);
  }

  public async login(formData: FormData): Promise<any> {
    const formJson = Object.fromEntries(formData.entries());
    console.log(`${HolidazeGateWay.authUrl}/login`)
    return await HolidazeGateWay.httpRequest('POST', `${HolidazeGateWay.authUrl}/login`, formJson);
  }

  public async profile(name: string, token: string, apiKey: string): Promise<any> {
    return await HolidazeGateWay.httpRequest('GET', `${HolidazeGateWay.profileUrl}/${name}?_bookings=true&_venues=true`, null, token, apiKey);
  }

  public async updateProfile(formData: FormData, name: string, token: string, apiKey: string): Promise<any> {
    const formJson = Object.fromEntries(formData.entries());
    const formattedJson = {
      ...formJson,
      bio: formJson.bio || "Awesome customer",
      avatar: formJson.avatar || 'https://i.stack.imgur.com/EzZiD.png',
      banner: formJson.banner || 'https://i.stack.imgur.com/EzZiD.png',
      venueManager: formJson.venueManager === 'on',
    };
    return await HolidazeGateWay.httpRequest('PUT', `${HolidazeGateWay.profileUrl}/${name}?_bookings=true&_venues=true`, formattedJson, token, apiKey);
  }

  public async book(formData: FormData, token: string, apiKey: string): Promise<any> {
    const formJson = Object.fromEntries(formData.entries());

    const formattedJson = {
      ...formJson,
      guests: Number(formJson.guests)
    };
    return await HolidazeGateWay.httpRequest('POST', `${HolidazeGateWay.baseUrl}/holidaze/bookings`, formattedJson, token, apiKey);
  }

  public async cancelBooking(bookingId: any, token: string, apiKey: string): Promise<any> {
    const id = Object.fromEntries(bookingId.entries());
    return await HolidazeGateWay.httpRequest('DELETE', `${HolidazeGateWay.baseUrl}/holidaze/bookings/${id?.bookingId}`, null, token, apiKey);
  }

  public async createVenue(formData: FormData, token: string, apiKey: string): Promise<any> {
    return await HolidazeGateWay.httpRequest('POST', `${HolidazeGateWay.baseUrl}/holidaze/venues`, formData, token, apiKey);
  }
}

export { HolidazeGateWay };
