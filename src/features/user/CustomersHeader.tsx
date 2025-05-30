import HeaderTitle from "../common/HeaderTitle";
import HeaderSearch from "../common/HeaderSearch";
import HeaderDropdown from "../common/HeaderDropdown";
import { useNavigate } from "react-router-dom";


interface Props {
  searchField?: string;
  title: string;
  icon: string;
  showSearch?: boolean;
  showDropdown?: boolean;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

const CustomersHeader: React.FC<Props> = ({ searchField = "", title = "", icon = "", showSearch = true,  showDropdown = true,onSearchChange, onSearchSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-lg-2 mb-3">
        <HeaderTitle title={title} icon={icon} />
      </div>
      <div className="col-lg-10 mb-3">
        <div className="d-flex align-items-end justify-content-end">
          {showSearch && (
            <HeaderSearch
              value={searchField}
              onChange={onSearchChange ?? (() => {})}
              onSubmit={onSearchSubmit ?? (() => {})}
            />
          )}
          {showDropdown && (
            <HeaderDropdown
              data={[
                { label: "Create", onClick: () => navigate(`/customers/add`) },
                { label: "Import", onClick: () => navigate(`/customers/add`) },
                { label: "Export (Excel)", onClick: () => navigate(`/customers/add`)},
                { label: "Export (PDF)", onClick: () => navigate(`/customers/add`) },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersHeader;
