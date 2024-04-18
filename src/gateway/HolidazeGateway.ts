import type { Venue, Venues } from "../types/types";


class HolidazeGateWay {
  private static readonly baseUrl = new URL(
    "https://v2.api.noroff.dev/holidaze"
  );
  private static readonly authUrl = new URL("https://v2.api.noroff.dev/auth");
  private static readonly profileUrl = new URL("https://v2.api.noroff.dev/holidaze/profiles/")

  public async getVenues({
    id = "",
    query = "",
    retryCount = 3,
  }: {
    id?: string;
    query?: string;
    retryCount?: number;
  }): Promise<Venues | Venue> {
    const endpoint = id ? `/venues/${id}` : "/venues";

    try {
      const response = await HolidazeGateWay.fetchVenues(endpoint, query);
      const data = await response.json();
      return data.data;

    } catch (err: any) {
      if (
        err.message.startsWith("Request failed with status: 5") &&
        retryCount > 0
      ) {
        const waitTime = 2 ** (4 - retryCount) * 100;
        console.error(
          `Retry after error: ${err.message}, waiting ${waitTime}ms`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        return this.getVenues({ id, query, retryCount: retryCount - 1 });
      }
      console.error(`Error fetching venues: ${err}`);
      throw err;
    }
  }

  public async register(formData: FormData): Promise<any> {
    const endpoint = "/register";
    const json = Object.fromEntries(formData.entries());

    const newJson = {
      ...json,
      avatar: {
        url: json.avatar === "" ? "https://i.stack.imgur.com/EzZiD.png" : json.avatar,
        alt: "My avatar alt text",
      },
      venueManager: json.venueManager === "on" ? true : false,
    };
    try {
      const response = await HolidazeGateWay.registerAccount(endpoint, newJson);

      if (!response.ok) {
        const data = await response.json();
        const error: any = new Error(data?.errors[0]?.message ?? "Unknown error");
        error.success = false;
        error.data = data;
        throw error;
      }
      return {
        success: true,
        message: "Account created, you can now log in"
      };
    } catch (err: any) {
      console.error(`Error registering: ${err}`);
      throw err;
    }
  }

  public async login(formData: FormData): Promise<any> {
    const endpoint = "/login";
    const json = Object.fromEntries(formData.entries());
    try {
      const response = await HolidazeGateWay.loginToPage(endpoint, json);
      if (!response.ok) {
        const data = await response.json();
        const error: any = new Error(data?.errors[0]?.message ?? "Unknown error");
        error.success = false;
        error.data = data;
        throw error;
      }
      const data = await response.json();

      return data.data

    } catch (err: any) {
      console.error(`Error: ${err}`);
      throw err;
    }
  }

  public async profile(name: string, token: string, apiKey: string): Promise<any> {

    try {
      const response = await HolidazeGateWay.getProfile(name, token, apiKey);
      if (!response.ok) {
        const data = await response.json();
        const error: any = new Error(data?.errors[0]?.message ?? "Unknown error");
        error.success = false;
        error.data = data;
        throw error;
      }
      const data = await response.json();

      return data.data

    } catch (err: any) {
      console.error(`Error: ${err}`);
      throw err;
    }
  }

  public async updateProfile(formData: FormData, name: string, token: string, apiKey: string): Promise<any> {
    const json = Object.fromEntries(formData.entries())
    const newJson = {
      ...json,
      bio: json.bio === "" ? "Awesome customer" : json.bio,
      avatar: {
        url: json.avatar === "" ? "https://i.stack.imgur.com/EzZiD.png" : json.avatar,
        alt: "My avatar alt text",
      },
      banner: {
        url: json.banner === "" ? "https://i.stack.imgur.com/EzZiD.png" : json.banner,
        alt: "My banner alt text",
      },
      venueManager: json.venueManager === "on" ? true : false,
    };
    try {
      const response = await HolidazeGateWay.editeProfile(newJson, name, token, apiKey);
      if (!response.ok) {
        const data = await response.json();
        const error: any = new Error(data?.errors[0]?.message ?? "Unknown error");
        error.success = false;
        error.data = data;
        throw error;
      }
      const data = await response.json();
      return {
        data:data,
        success: true,
        message: "updated profile"
      }

    } catch (err: any) {
      console.error(`Error: ${err}`);
      throw err;
    }
  }
  private static async editeProfile(
    json: any,
    name: string,
    token: string,
    apiKey: string,
  ): Promise<Response> {
    const url = `${HolidazeGateWay.profileUrl.toString()}${name}?_bookings=true&_venues=true`;
    return fetch(url, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      },
      body: JSON.stringify(json)
    })

  }
  private static async getProfile(
    name: string,
    token: string,
    apiKey: string,
  ): Promise<Response> {
    const url = `${HolidazeGateWay.profileUrl.toString()}${name}?_bookings=true&_venues=true`;
    return fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      }
    })

  }

  private static async loginToPage(
    endpoint: string,
    json: any
  ): Promise<Response> {
    const url = `${HolidazeGateWay.authUrl.toString()}${endpoint}`;
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
  }
  private static async registerAccount(
    endpoint: string,
    json: any
  ): Promise<Response> {
    const url = `${HolidazeGateWay.authUrl.toString()}${endpoint}`;
    return fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
  }
  private static async fetchVenues(
    endpoint: string,
    query: string
  ): Promise<Response> {
    const urlString = `${HolidazeGateWay.baseUrl.toString()}${endpoint}${query
      ? `/search?q=${query}&_owner=true&_bookings=true`
      : "?_owner=true&_bookings=true"
      }`;
    return fetch(urlString);
  }
}

export { HolidazeGateWay };
