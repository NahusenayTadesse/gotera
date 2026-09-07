import { o as object, s as string, y as email, n as number, a1 as number$1, b as string$1, x as array, D as literal, a3 as _instanceof, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/lib/ZodSchema.ts
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var ACCEPTED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/heic",
	"image/heif",
	"application/pdf"
];
var addUser = object({
	name: string("Name is Required").min(2).max(100),
	phone: string("Phone is Required").min(10).max(15),
	email: email("Email is Required"),
	password: string("Password is required!"),
	address: string("General Address is required!"),
	specificAddress: string("Specific Address is required!")
});
var loginSchema = object({
	email: email({ error: "Invalid email address" }),
	password: string().min(8, { error: "Password must be at least 8 characters" })
});
object({
	name: string().min(1, "Full Name is required").max(100, "Full Name must be less than 100 characters"),
	email: email("Invalid email address").min(1, "Email is required"),
	password: string().min(6, "Password must be at least 6 characters").max(128, "Password must be less than 128 characters"),
	role: number("Role is required")
});
object({
	productName: string().min(1, { message: "Product Name is required." }),
	category: number("Category cannot be empty. Please select a Category"),
	description: string().max(500, { message: "Product description can't be more than 500 characters." }).optional(),
	quantity: number$1().int({ message: "Quantity can only be full numbers, no decimals." }).positive({ message: "Quantity must be a positive number." }),
	price: number({ message: "Price is required" }).positive({ message: "Price must be a positive number." }),
	commission: number({ message: "Commission is required, enter 0 if it is not decided yet" }).positive({ message: "Price must be a positive number." }),
	supplier: number("Supplier is required"),
	reorderLevel: number$1().int({ message: "Reorder Level can only be full numbers, no decimals." }).positive({ message: "Reorder Level must be a positive number." }),
	costPerUnit: number({ message: "Cost is required" }).positive({ message: "Cost must be a positive number." })
});
object({
	productId: number(),
	productName: string().min(1, { message: "Product Name is required." }),
	category: number("Category cannot be empty. Please select a Category"),
	description: string().max(500, { message: "Product description can't be more than 500 characters." }).optional(),
	quantity: number$1().int({ message: "Quantity can only be full numbers, no decimals." }).positive({ message: "Quantity must be a positive number." }),
	price: number$1({ message: "Price is required" }).positive({ message: "Price must be a positive number." }),
	commission: number$1({ message: "Commission is required, enter 0 if it is not decided yet" }).nonnegative({ message: "Price must be a positive number." }),
	supplier: number("Supplier is required."),
	reorderLevel: number$1().int({ message: "Reorder Level can only be full numbers, no decimals." }).positive({ message: "Reorder Level must be a positive number." }),
	costPerUnit: number$1({ message: "Cost Per Unit is required" }).positive({ message: "Cost Per Unit must be a positive number." })
});
object({
	supplyName: string().min(1, { message: "Product Name is required." }),
	description: string().max(500, { message: "Product description can't be more than 500 characters." }).optional(),
	quantity: number$1().int({ message: "Quantity can only be full numbers, no decimals." }).positive({ message: "Quantity must be a positive number." }),
	unitOfMeasure: string$1(),
	reorderLevel: number$1().int({ message: "Reorder Level can only be full numbers, no decimals." }).positive({ message: "Reorder Level must be a positive number." }),
	costPerUnit: number$1({ message: "Cost is required" }).positive({ message: "Cost must be a positive number." }),
	supplier: string().min(1, { message: "Supplier is required." })
});
object({
	supplyId: number(),
	supplyName: string().min(1, { message: "Product Name is required." }),
	description: string().max(500, { message: "Product description can't be more than 500 characters." }).optional(),
	quantity: number$1().int({ message: "Quantity can only be full numbers, no decimals." }).positive({ message: "Quantity must be a positive number." }),
	unitOfMeasure: string$1(),
	reorderLevel: number$1().int({ message: "Reorder Level can only be full numbers, no decimals." }).positive({ message: "Reorder Level must be a positive number." }),
	costPerUnit: number$1({ message: "Cost is required" }).positive({ message: "Cost must be a positive number." }),
	supplier: string().min(1, { message: "Supplier is required." })
});
object({
	serviceName: string().min(1, { message: "Service Name is required." }),
	description: string().optional(),
	commission: number$1({ message: "Commission is required, enter 0 if it is not decided yet" }).nonnegative({ message: "Price must be a positive number." }),
	category: number("Category cannot be empty. Please select a Category"),
	durationMinutes: number$1().int().positive({ message: "Duration Minutes must be a positive integer." }),
	price: number$1().positive({ message: "Price must be a positive number." })
});
object({
	serviceId: number(),
	serviceName: string().min(1, { message: "Service Name is required." }),
	commission: number$1({ message: "Commission is required, enter 0 if it is not decided yet" }).nonnegative({ message: "Price must be a positive number." }),
	description: string().optional(),
	category: number("Category cannot be empty. Please select a Category"),
	durationMinutes: number$1().int().positive({ message: "Duration Minutes must be a positive integer." }),
	price: number$1().positive({ message: "Price must be a positive number." })
});
object({
	name: string().min(1, "Role name is required").max(100, "Role name must be under 100 characters"),
	description: string().min(1, "Role description is required").max(500, "Role description must be under 500 characters"),
	permissions: array(string().min(1)).nonempty("At least one permission must be selected")
});
object({
	name: string().min(1, "Role name is required").max(100, "Role name must be under 100 characters"),
	description: string().min(1, "Role description is required").max(500, "Role description must be under 500 characters")
});
object({
	name: string().min(1, "Role name is required").max(100, "Role name must be under 100 characters"),
	description: string().min(1, "Role description is required").max(500, "Role description must be under 500 characters")
});
var today = /* @__PURE__ */ new Date();
today.setHours(0, 0, 0, 0);
object({
	firstName: string().min(1, "First name is required").max(50, "First name is too long"),
	lastName: string().max(50, "Last name is too long").optional().or(literal("")),
	phone: string().min(7, "Phone number is too short").max(15, "Phone number is too long").regex(/^[0-9+\-()\s]+$/, "Invalid phone number"),
	gender: string().refine((val) => ["male", "female"].includes(val), { message: "Please select a gender" }),
	appointmentDate: string().refine((val) => {
		const d = new Date(val);
		return !isNaN(d.getTime()) && d >= today;
	}, { message: "Date must be today or in the future" }),
	appointmentTime: string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
	notes: string().max(500, "Notes must be less than 500 characters").optional().or(literal(""))
});
object({
	customerId: number("Customer is required"),
	appointmentDate: string().refine((val) => {
		const d = new Date(val);
		return !isNaN(d.getTime()) && d >= today;
	}, { message: "Date must be today or in the future" }),
	appointmentTime: string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
	notes: string().max(500, "Notes must be less than 500 characters").optional().or(literal(""))
});
object({
	customerId: number("Customer is required"),
	appointmentDate: string().refine((val) => {
		const d = new Date(val);
		return !isNaN(d.getTime()) && d >= today;
	}, { message: "Date must be today or in the future" }),
	appointmentTime: string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),
	notes: string().max(500, "Notes must be less than 500 characters").optional().or(literal("")),
	appointmentId: number()
});
object({
	firstName: string().min(1, "First name is required").max(50, "First name is too long"),
	lastName: string().max(50, "Last name is too long").optional().or(literal("")),
	phone: string().min(7, "Phone number is too short").max(15, "Phone number is too long").regex(/^[0-9+\-()\s]+$/, "Invalid phone number"),
	gender: string().refine((val) => ["male", "female"].includes(val), { message: "Please select a gender" }),
	customerId: number()
});
object({
	firstName: string().min(1, "First name is required").max(50, "First name is too long"),
	lastName: string().max(50, "Last name is too long").optional().or(literal("")),
	phone: string().min(7, "Phone number is too short").max(15, "Phone number is too long").regex(/^[0-9+\-()\s]+$/, "Invalid phone number"),
	gender: string().refine((val) => ["male", "female"].includes(val), { message: "Please select a gender" })
});
object({
	intent: _enum(["add", "remove"], { message: "Please select an adjustment type" }),
	quantity: string$1("Quantity must be greater than 0"),
	reason: string().max(255).optional(),
	reciept: _instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 10MB.`).refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Invalid file type.").optional()
});
object({
	damagedBy: string$1("Employee is required"),
	quantity: string$1("Quantity must be greater than 0"),
	reason: string().max(255).optional()
});

export { addUser as a, loginSchema as l };
//# sourceMappingURL=ZodSchema.js-B2IFjPeP.js.map
