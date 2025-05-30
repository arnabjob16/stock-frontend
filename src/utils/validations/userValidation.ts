import { validateEmail, validatePassword, validateUsername } from "../validation";

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  username: string;
  gst_number?: string;
  phone: string;
  address: string;
  status: string;
  image_path: string;
  image: File | null;
}

export const validateUserForm = (formData: UserFormData): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!formData.name.trim()) errors.name = "Name is required";
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Invalid email format";
  }
  if (!formData.username.trim()) {
    errors.username = "Username is required";
  } else if (!validateUsername(formData.username)) {
    errors.username = "Username must be greater than 2 characters";
  }
  if (formData.password.trim() && !validatePassword(formData.password)) {
    errors.password = "Password must be greater than 6 characters";
  }
  if (!formData.address) errors.address = "Address is required";
  if (!formData.phone) errors.phone = "Phone is required";
  if (!formData.status) errors.status = "Status must be selected";
  if (!formData.image && !formData.name.trim()) errors.image = "Image is required";
  return errors;
};
