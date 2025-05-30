interface HeaderTitleProps {
  icon: String;
  title: String;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  icon,
  title,
}) => {

  return (
      <div className="page-header">
        <h3 className="page-title"> <span className="page-title-icon bg-gradient-primary text-white me-2"><i className={`fa fa-`+icon}></i></span> {title} </h3>
      </div>
  );
};

export default HeaderTitle;
