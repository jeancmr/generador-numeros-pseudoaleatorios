const Button = ({
  text = '',
  className = 'mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 cursor-pointer',
  onClick = () => {},
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={text === 'Volver' ? `${className} ml-4` : className}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
