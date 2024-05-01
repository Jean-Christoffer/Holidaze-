
import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ cookies, redirect, request }): Promise<Response> => {

  const sessionCookie = cookies.get("session")?.json();

  try {
    const data = await request.json();

    const response = await holidazeGateWay.updateVenue(
      data,
      sessionCookie?.accessToken,
      import.meta.env.API_KEY
    );

    if (response.success) {
      return Response.json({
        success: true,
        message: response.message,
        result: 'Data from Astro Endpoint!'
      })
    }
    return new Response(
      JSON.stringify({
        message: response.message,
        success: false,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err)
    return new Response(
      JSON.stringify({
        message: `${err}`,
        success: false,
      }),
      { status: 400 }
    );
  }
};