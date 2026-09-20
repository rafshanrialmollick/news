import Contact from "../model/contact.js";
import ApiError from "../utils/ApiError.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      throw new ApiError(400, "Please provide your name, email, and message");
    }

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. Our editorial team will get back to you shortly.",
    });
  } catch (error) {
    next(error);
  }
};
