
import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ locals, request }): Promise<Response> => {

  const { token } = locals;

  try {
    const data = await request.formData();

    const response = await holidazeGateWay.book(
      data,
      token,
      import.meta.env.API_KEY
    );

    if (response.success) {
      const venueId = data.get("venueId");
      const fetchedData = await holidazeGateWay.getVenues(
        { id: venueId, query: "" }
      );
      const updatedData = fetchedData?.data?.bookings;


      return Response.json({
        success: true,
        message: response.message,
        result: 'Booking successfull',
        data: updatedData
      });

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