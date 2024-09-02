const zod = require("zod");
const bookingSchema = zod.object({
  name: zod
    .string()
    .min(3, "Name should have at least 3 characters")
    .nonempty("Name is required"),
  email: zod
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  age: zod.number().int("Age must be an integer").min(1, "Age is required"),
  mobile_number: zod
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  // serviceName : zod
  //   .string().min(2 , "Booking Details length should be atleast 2"),
  guest: zod
    .number()
    .int("Guest count must be an integer")
    .min(1, "At least one guest is required")
    .default(1),
  bookingDate: zod.string(),
  bookingTime: zod.string().nonempty("Booking time is required"),
  status: zod
    .enum(["Confirmed", "Cancelled", "Completed", "Pending"])
    .optional(),
  customerNotes: zod.string().optional(),
});

function validateBooking(req, res, next) {
  try {
    const {
      name,
      email,
      age,
      mobile_number,
      // serviceName,
      guest,
      bookingDate,
      bookingTime,
      status,
      customerNotes,
    } = req.body;
    const result = bookingSchema.safeParse({
      name,
      email,
      age,
      mobile_number,
      // serviceName,
      guest,
      bookingDate,
      bookingTime,
      status,
      customerNotes,
    });

    if (!result.success) {
      console.log("Validation not successful", result.error);
      return res.status(400).json({
        msg: "Please fill correct information",
        errors: result.error.errors,
      });
    }

    console.log("Validation successful");
  } catch (err) {
    console.log("Unexpected error during validation", err);
    return res.status(500).json({
      msg: "Unexpected error occurred",
    });
  }

  next();
}

module.exports = validateBooking;
