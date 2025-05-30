interface HeaderSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({
  value,
  onChange,
  onSubmit,
}) => {

  return (
    <div className="search-field d-none d-md-block">
      <div className="form-group mb-0">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search.." value={value} onChange={(e) => onChange(e.target.value)}/>
            <div className="input-group-append">
              <button className="btn btn-info btn-fw py-3" type="button" onClick={() => onSubmit()} >
                Search
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HeaderSearch;
