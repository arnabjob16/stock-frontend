import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomersHeader from "../../features/user/CustomersHeader";
import CustomersTable from "../../features/user/CustomersTable";
import CustomersModals from "../../features/user/CustomersModals";
import { useCustomers } from "../../hooks/useCustomers";
import { ModalDataType, ModalConfirmDataType } from "../../types/customers.types";
import ViewModal from "../../features/common/ViewModal";
import Loading from "../../features/common/Loading";

const Customers = () => {
  const navigate = useNavigate();
  const { customers, totalPages, fetchCustomers, deleteCustomers, loading } = useCustomers();
  const [searchField, setSearchField] = useState("");
  const [onPageReset, setOnPageReset] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>({ title: "", content: "" });
  const [modalConfirmData, setModalConfirmData] = useState<ModalConfirmDataType>({ title: "", content: "", ids: [] });

  const viewRow = (data: any) => {
    setModalData({
      title: "View Customer",
      content: <ViewModal data={data} showableField={['image', 'name', 'username', 'email', 'gst_number', 'phone', 'address', 'status']} />
    });
    setModalVisible(true);
  };

  const editRow = (data: any) => {
    navigate(`/customers/${data._id}`);
  };

  const deleteRow = (selectedRows: any[]) => {
    const ids = selectedRows.map((item) => item._id);
    setModalConfirmData({
      title: "Delete Customer",
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
      <CustomersHeader
        searchField={searchField}
        title={`User`}
        icon={`user`}
        onSearchChange={setSearchField}
        onSearchSubmit={() => fetchCustomers(1, searchField)}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {loading?< Loading />:
              <CustomersTable
                data={customers}
                totalPages={totalPages}
                actions={actions}
                onPageChange={(page) => fetchCustomers(page)}
                onPageReset={onPageReset}
              />}
            </div>
          </div>
        </div>
      </div>
      <CustomersModals
        modalData={modalData}
        modalConfirmData={modalConfirmData}
        modalVisible={modalVisible}
        modalConfirmVisible={modalConfirmVisible}
        onCloseModal={() => setModalVisible(false)}
        onConfirmDelete={() => {
          deleteCustomers(modalConfirmData.ids);
          setModalConfirmVisible(false);
        }}
        onCloseConfirm={() => setModalConfirmVisible(false)}
      />
    </div>
  );
};

export default Customers;
