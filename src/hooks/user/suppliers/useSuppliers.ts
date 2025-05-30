import { useState, useEffect } from "react";
import { userList, userDelete } from "../../../services/userApi";
import { toast } from "react-toastify";
import useAuth from "../../useAuth";
import { User } from "../../../types/users.types";

export const useSuppliers = () => {
  const { token } = useAuth();
  const [suppliers, setSuppliers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const res = await userList(token, page, search, "supplier");
      setSuppliers(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users!");
    }
    setLoading(false);
  };

  const deleteSuppliers = async (ids: string[]) => {
    try {
      const res = await userDelete(token, ids);
      if(res.status == "success") {
        toast.success(res.data.message);
        fetchSuppliers();
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
    fetchSuppliers();
  }, [token]);

  return { suppliers, totalPages, fetchSuppliers, deleteSuppliers, loading };
};
