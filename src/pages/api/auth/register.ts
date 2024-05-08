import type { APIRoute } from "astro";
import { HolidazeGateWay } from "../../../gateway/HolidazeGateway";

const holidazeGateWay = new HolidazeGateWay();

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const formData = await request.formData();
    await holidazeGateWay.register(formData);
    const loginFormData = new FormData();
    const email = formData.get("email") as string | null; // Use correct field name
    const password = formData.get("password") as string | null;

    if (email && password) {
      loginFormData.append("email", email);
      loginFormData.append("password", password);
    } else {
      return new Response(JSON.stringify({
        message: "Email or password missing",
        success: false,
      }), { status: 400 });
    }

    const loginResponse = await holidazeGateWay.login(loginFormData);

    const { accessToken, name } = loginResponse.data;
    const profileData = await holidazeGateWay.profile(name, accessToken, import.meta.env.API_KEY);
    const { venueManager } = profileData.data;

    cookies.set('session', JSON.stringify({ accessToken, name, venueManager }), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    return new Response(JSON.stringify({
      message: 'User registration and login successful.',
      success: true,
    }), { status: 200 });

  } catch (err) {
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



