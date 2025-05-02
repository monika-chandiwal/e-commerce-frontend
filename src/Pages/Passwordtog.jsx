function PasswordToggling() {
  const [status, setStatus] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Form.Group className="mb-3">
      <InputGroup
        style={{
          width: "15rem",
          border: "1px solid #ced4da",
          borderRadius: ".375rem",
          boxShadow: isFocused ? "0 0 0 0.1rem rgba(13,110,253,.15)" : "none",
          transition: "box-shadow 0.2s ease-in-out",
        }}
        className="p-0"
      >
        <Form.Control
          type={status ? "text" : "password"}
          placeholder="Enter password"
          style={{
            border: "none",
            boxShadow: "none",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <InputGroup.Text
          onClick={() => setStatus(!status)}
          style={{
            backgroundColor: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {status ? <FaEyeSlash /> : <FaEye />}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
}
