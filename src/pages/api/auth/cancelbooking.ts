
import type { APIRoute } from "astro";
import type { APIContext } from 'astro';
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";


const holidazeGateWay = new HolidazeGateWay();


export const DELETE: APIRoute = async ({ locals, request }: APIContext): Promise<Response> => {
    const { user, token } = locals;

    try {
        const data = await request.formData();
        const response = await holidazeGateWay.cancelBooking(data,
            token,
            import.meta.env.API_KEY)

        if (response.success) {

            const fetchedData = await holidazeGateWay.profile(
                user,
                token,
                import.meta.env.API_KEY
            );
            const updatedData = fetchedData?.data?.bookings;

            return Response.json({
                success: true,
                message: response.message,
                result: 'Booking canceled',
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

        return new Response(
            JSON.stringify({
                message: `${err}`,
                success: false,
            }),
            { status: 400 }
        );
    }
};