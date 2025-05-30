interface DropdownItem {
  label: string;
  onClick?: () => void;
}

interface HeaderDropdownProps {
  data: DropdownItem[];
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  data,
}) => {

  return (
      <div className="dropdown ms-4">
              <button
                className="btn btn-outline-info dropdown-toggle"
                type="button"
                id="dropdownMenuOutlineButton1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Action
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuOutlineButton1">
                {data.map((item, index) => (
                  <div key={index}>
                    <a
                      className="dropdown-item"
                      href="javascript:void(0);"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </a>
                    {index !== data.length - 1 && <div className="dropdown-divider"></div>}
                  </div>
                ))}
              </div>
            </div>
  );
};

export default HeaderDropdown;
