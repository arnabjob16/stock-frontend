import { useState } from "react";
import { userAdd } from "../../../services/userApi";
import { toast } from "react-toastify";
import useAuth from "../../useAuth";
import { useNavigate  } from "react-router-dom";
import { validateUserForm } from "../../../utils/validations/userValidation";

export const useAddSalesmans = () => {
  const navigate = useNavigate(); 
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    roles: "salesman",
    address: "",
    image_path: "",
    image: null as File | null,
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [initError, setInitError] = useState(true);


  const handleCancel = () => {
    navigate(-1);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if(!initError){
      const newErrors = validateUserForm(formData);
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);
    setInitError(false);
  
    const newErrors = validateUserForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setButtonLoading(false);
      return;
    }
  
    const form = new FormData();
  
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        if (key === "image" && value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, String(value));
        }
      }
    });
  
    try {
      const res = await userAdd(token, form);
      if(res.status == "success") {
        toast.success(res.data.message);
        navigate(-1);
      }
      else if(res.status == "info") {
        setErrors(res.data.data);
      }
      else{
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to add customer");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    if(!initError){
      const newErrors = validateUserForm(formData);
      setErrors(newErrors);
    }
  };
  

  return { formData, handleChange, handleSubmit, handleCancel, handleImageChange, errors, loading, buttonLoading };
};
