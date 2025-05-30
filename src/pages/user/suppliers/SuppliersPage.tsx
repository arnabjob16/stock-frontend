import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuppliersHeader from "../../../features/user/suppliers/SuppliersHeader";
import SuppliersTable from "../../../features/user/suppliers/SuppliersTable";
import SuppliersModals from "../../../features/user/suppliers/SuppliersModals";
import { useSuppliers } from "../../../hooks/user/suppliers/useSuppliers";
import { ModalDataType, ModalConfirmDataType } from "../../../types/users.types";
import ViewModal from "../../../features/common/ViewModal";
import Loading from "../../../features/common/Loading";

const Suppliers = () => {
  const navigate = useNavigate();
  const { suppliers, totalPages, fetchSuppliers, deleteSuppliers, loading } = useSuppliers();
  const [searchField, setSearchField] = useState("");
  const [onPageReset, setOnPageReset] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>({ title: "", content: "" });
  const [modalConfirmData, setModalConfirmData] = useState<ModalConfirmDataType>({ title: "", content: "", ids: [] });

  const viewRow = (data: any) => {
    setModalData({
      title: "View Supplier",
      content: <ViewModal data={data} showableField={['image', 'name', 'username', 'email', 'phone', 'address', 'status']} />
    });
    setModalVisible(true);
  };

  const editRow = (data: any) => {
    navigate(`/suppliers/${data._id}`);
  };

  const deleteRow = (selectedRows: any[]) => {
    const ids = selectedRows.map((item) => item._id);
    setModalConfirmData({
      title: "Delete Supplier",
      content: "Are you sure you want to delete the selected users?",
      ids,
    });
    setModalConfirmVisible(true);
  };

  const actions = [
    { label: "View", id: "view", type: "single", icon: "fa fa-eye", onClick: (rows: any) => viewRow(rows[0]) },
    { label: "Edit", id: "edit", type: "single", icon: "fa fa-edit", onClick: (rows: any) => editRow(rows[0]) },
    { label: "Delete", id: "delete", type: "multiple", icon: "fa fa-trash", onClick: (rows: any) => deleteRow(rows) },
  ];

  return (
    <div className="content-wrapper">
      <SuppliersHeader
        searchField={searchField}
        title={`Supplier`}
        icon={`user`}
        onSearchChange={setSearchField}
        onSearchSubmit={() => fetchSuppliers(1, searchField)}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {loading?< Loading />:
              <SuppliersTable
                data={suppliers}
                totalPages={totalPages}
                actions={actions}
                onPageChange={(page) => fetchSuppliers(page)}
                onPageReset={onPageReset}
              />}
            </div>
          </div>
        </div>
      </div>
      <SuppliersModals
        modalData={modalData}
        modalConfirmData={modalConfirmData}
        modalVisible={modalVisible}
        modalConfirmVisible={modalConfirmVisible}
        onCloseModal={() => setModalVisible(false)}
        onConfirmDelete={() => {
          deleteSuppliers(modalConfirmData.ids);
          setModalConfirmVisible(false);
        }}
        onCloseConfirm={() => setModalConfirmVisible(false)}
      />
    </div>
  );
};

export default Suppliers;
