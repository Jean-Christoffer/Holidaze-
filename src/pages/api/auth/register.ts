import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const response = await holidazeGateWay.register(data)

    return new Response(
      JSON.stringify({
        message: response.message,
        success: true
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