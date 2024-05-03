import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ cookies, request }) => {

  try {
    const data = await request.formData();
    const response = await holidazeGateWay.login(data)

    if (response.success) {
      const accessToken = response?.data?.accessToken;
      const name = response?.data?.name;

      const fetchedData = await holidazeGateWay.profile(
        name,
        accessToken,
        import.meta.env.API_KEY
      );
      const isVenueManager = fetchedData?.data?.venueManager
      cookies.set('session', JSON.stringify({ accessToken, name, isVenueManager }), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
      });

    }


    return new Response(
      JSON.stringify({
        message: "Success!",
        success: true,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        message: `${err}`,
        success: false,
      }),
      { status: 400 }
    );
  }
};

