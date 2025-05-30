import FormInput from "../../../features/common/FormInput";
import SalesmansHeader from "../../../features/user/salesmans/SalesmansHeader";
import FormSelect from "../../../features/common/FormSelect";
import { useAddSalesmans } from "../../../hooks/user/salesmans/useAddSalesmans";
import Loading from "../../../features/common/Loading";
import Button from "../../../features/common/Button";
import FileUpload from "../../../features/common/FileUpload";

const SalesmansAdd = () => {
  const { formData, handleChange, handleSubmit, handleCancel, handleImageChange, errors, loading, buttonLoading} = useAddSalesmans();

  return (
    <div className="content-wrapper">
      <SalesmansHeader
        title={`Salesman`}
        icon={`user`}
        showSearch={false} 
        showDropdown={false} 
      />

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {loading?< Loading />:
                <form onSubmit={handleSubmit} className="forms-sample row" autoComplete="off">
                  <FormInput
                      label=""
                      id="id"
                      type="hidden"
                      placeholder=""
                      value={formData.id}
                      onChange={() => {}}
                      error={errors.id}
                    />
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Name"
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                      />
                    </div>
                  </div>                 
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Phone"
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormInput
                        label="Address"
                        id="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FormSelect
                        label="Status"
                        id="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={[
                          { value: "active", label: "Active" },
                          { value: "inactive", label: "Inactive" },
                          { value: "pending", label: "Pending" }
                        ]}
                        error={errors.status}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <FileUpload
                        label="Upload Profile Picture"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        error={errors.image}
                      />
                    </div>
                  </div>
                  
                  <div className="col-12 mt-3">
                    <Button
                        type="submit"
                        className="btn-gradient-primary me-2 "
                        loading={buttonLoading}
                      >
                        Submit
                      </Button>
                      <Button
                        type="button"
                        className="btn-light"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesmansAdd;
