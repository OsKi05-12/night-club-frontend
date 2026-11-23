"use server";

export async function subscribeToNewsletter(previousState, formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmail.test(email) || email.length > 254) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const apiUrl = process.env.API_URL || "http://localhost:4000";

  try {
    const response = await fetch(`${apiUrl}/newsletters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 409) {
      return {
        success: false,
        message: "This email address is already subscribed.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: "We could not subscribe you. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thank you! You are now subscribed to our newsletter.",
    };
  } catch (error) {
    console.error("Newsletter:", error);

    return {
      success: false,
      message: "Could not connect to the server. Please try again later.",
    };
  }
}
