import React, { useRef, useState, useEffect } from "react";

interface FileUploadProps {
  label: string;
  id: string;
  accept?: string;
  value?: string;
  onChange: (file: File | null) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, id, accept, value, onChange, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);

  useEffect(() => {
    if (value && !preview) {
      setPreview(value);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (preview && !value) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange(file);
    }
  };

  const handleReset = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="form-group mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        type="file"
        id={id}
        accept={accept}
        className="form-control mb-2"
        onChange={handleFileChange}
      />

      {preview && (
        <div>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                height: 80,
                width: 80,
                objectFit: "cover",
                borderRadius: 4,
                border: "1px solid #ddd",
              }}
            />
            <button
              type="button"
              onClick={handleReset}
              className="reset-image-button"
              aria-label="Remove image"
              title="Remove image"
            >
              ×
            </button>
          </div>
        </div>
        
      )}

      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default FileUpload;
