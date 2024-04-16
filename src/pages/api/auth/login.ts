import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ cookies, redirect, request }) => {

  try {
    const data = await request.formData();
    const response = await holidazeGateWay.login(data)
    const accessToken = response.accessToken;
    const name = response.name;

    cookies.set('session', JSON.stringify({ accessToken, name }), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 1
    });

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

