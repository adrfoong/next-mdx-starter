const Button = ({ children }) => {
  return (
    <button type="button" onClick={() => alert("HI")}>
      {children}
    </button>
  );
};

export default Button;
