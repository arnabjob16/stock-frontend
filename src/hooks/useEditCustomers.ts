import { useState, useEffect } from "react";
import { customersDetails, customersEdit } from "../services/userApi";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { useParams, useNavigate  } from "react-router-dom";
import { validateUserForm } from "../utils/validations/userValidation";

export const useEditCustomers = () => {
  const navigate = useNavigate(); 
  const { token } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    username: "",
    gst_number: "",
    phone: "",
    address: "",
    image_path: "",
    image: null as File | null,
    status: "active",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [initError, setInitError] = useState(true);


  const fetchCustomer = async (id: string) => {
    setLoading(true);
    try {
      const res = await customersDetails(token, id);
      console.log(res.data.data);
      if(res.status == "success") {
        setFormData({
          id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          password: "",
          username: res.data.data.username,
          gst_number: res.data.data.gst_number,
          phone: res.data.data.phone,
          address: res.data.data.address,
          image_path: res.data.data.image,
          image: null as File | null,
          status: res.data.data.status,
        });
      }
      else{
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch users!");
    }
    setLoading(false);
  };

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
      const res = await customersEdit(token, form);
      if(res.status == "success") {
        toast.success(res.data.message);
        setButtonLoading(false);
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

  useEffect(() => {
    if (token && id) {
      fetchCustomer(id);
    }
  }, [token, id]);

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
