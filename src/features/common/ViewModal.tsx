interface ViewModalProps {
  data: { [key: string]: any };  
  showableField: string[]
}

const ViewModal: React.FC<ViewModalProps> = ({ data , showableField }) => {
  const formatFieldName = (key: string) => {
    return key
      .replace(/_/g, ' ') 
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <table className="table">
      <tbody>
        {showableField.map((key, index) => (
          <tr key={index}>
            {key != 'image' ? (
                <td>{formatFieldName(key)}</td>
              ):null}
            <td colSpan={key === 'image' ? 2 : 1} className={key === 'image' ? 'text-center' : ''}>
              {key === 'image' ? (
                <img src={data[key]} alt="Image" style={{ width: "60px", height: "60px" }} />
              ) : (
                data[key]?.toString()
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ViewModal;
