import { useState, useEffect } from "react";
import { customerList, customersDelete } from "../services/userApi";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import { Customer } from "../types/customers.types";

export const useCustomers = () => {
  const { token } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const res = await customerList(token, page, search);
      setCustomers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users!");
    }
    setLoading(false);
  };

  const deleteCustomers = async (ids: string[]) => {
    try {
      const res = await customersDelete(token, ids);
      if(res.status == "success") {
        toast.success(res.data.message);
        fetchCustomers();
      }
      else{
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete users!");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [token]);

  return { customers, totalPages, fetchCustomers, deleteCustomers, loading };
};
