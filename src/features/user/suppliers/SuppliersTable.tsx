import DataTable from "../../common/DataTable";
import { User } from "../../../types/users.types";

interface Props {
  data: User[];
  totalPages: number;
  onPageChange: (page: number) => void;
  actions: any[];
  onPageReset: boolean;
}

const columns = [
  { type: "text", key: "name", label: "Name", width: "20%" },
  { type: "text", key: "username", label: "Username", width: "20%" },
  { type: "text", key: "email", label: "Email", width: "20%" },
  { type: "text", key: "phone", label: "Phone", width: "20%" },
  {
    type: "status",
    key: "status",
    label: "Status",
    width: "15%",
    render: (item: any) => (
      <span className={`badge text-capitalize ${item.status === "active" ? "bg-success" : "bg-danger"}`}>
        {item.status}
      </span>
    ),
  },
];

const SuppliersTable: React.FC<Props> = ({ data, totalPages, onPageChange, actions, onPageReset }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      checkbox={true}
      actions={actions}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onPageReset={onPageReset}
    />
  );
};

export default SuppliersTable;
