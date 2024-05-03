
import type { APIRoute } from "astro";
import type { APIContext } from 'astro';
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";


const holidazeGateWay = new HolidazeGateWay();

export const PUT: APIRoute = async ({ locals, request }: APIContext): Promise<Response> => {

  const { token, user } = locals

  try {
    const data = await request.formData();
    const response = await holidazeGateWay.updateProfile(
      data,
      user,
      token,
      import.meta.env.API_KEY
    );

    if (response.success) {

      return Response.json({
        success: true,
        message: response.message,
        result: response.data
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
    return new Response(
      JSON.stringify({
        message: `${err}`,
        success: false,
      }),
      { status: 400 }
    );
  }
};