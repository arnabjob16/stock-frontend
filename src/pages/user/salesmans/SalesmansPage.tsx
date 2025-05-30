import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SalesmansHeader from "../../../features/user/salesmans/SalesmansHeader";
import SalesmansTable from "../../../features/user/salesmans/SalesmansTable";
import SalesmansModals from "../../../features/user/salesmans/SalesmansModals";
import { useSalesmans } from "../../../hooks/user/salesmans/useSalesmans";
import { ModalDataType, ModalConfirmDataType } from "../../../types/users.types";
import ViewModal from "../../../features/common/ViewModal";
import Loading from "../../../features/common/Loading";

const Salesmans = () => {
  const navigate = useNavigate();
  const { salesmans, totalPages, fetchSalesmans, deleteSalesmans, loading } = useSalesmans();
  const [searchField, setSearchField] = useState("");
  const [onPageReset, setOnPageReset] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalDataType>({ title: "", content: "" });
  const [modalConfirmData, setModalConfirmData] = useState<ModalConfirmDataType>({ title: "", content: "", ids: [] });

  const viewRow = (data: any) => {
    setModalData({
      title: "View Salesman",
      content: <ViewModal data={data} showableField={['image', 'name', 'username', 'email', 'phone', 'address', 'status']} />
    });
    setModalVisible(true);
  };

  const editRow = (data: any) => {
    navigate(`/salesmans/${data._id}`);
  };

  const deleteRow = (selectedRows: any[]) => {
    const ids = selectedRows.map((item) => item._id);
    setModalConfirmData({
      title: "Delete Salesman",
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
      <SalesmansHeader
        searchField={searchField}
        title={`Salesman`}
        icon={`user`}
        onSearchChange={setSearchField}
        onSearchSubmit={() => fetchSalesmans(1, searchField)}
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              {loading?< Loading />:
              <SalesmansTable
                data={salesmans}
                totalPages={totalPages}
                actions={actions}
                onPageChange={(page) => fetchSalesmans(page)}
                onPageReset={onPageReset}
              />}
            </div>
          </div>
        </div>
      </div>
      <SalesmansModals
        modalData={modalData}
        modalConfirmData={modalConfirmData}
        modalVisible={modalVisible}
        modalConfirmVisible={modalConfirmVisible}
        onCloseModal={() => setModalVisible(false)}
        onConfirmDelete={() => {
          deleteSalesmans(modalConfirmData.ids);
          setModalConfirmVisible(false);
        }}
        onCloseConfirm={() => setModalConfirmVisible(false)}
      />
    </div>
  );
};

export default Salesmans;
