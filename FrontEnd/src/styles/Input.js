const Input = {
  InputYellow: {
    boxSizing: 'border-box',
    background: '#FFFFFF',
    border: '3px solid #FFEB8C',
    borderRadius: '10px',
    color: 'black',
  },
  InputGray: {
    boxSizing: 'border-box',
    background: '#FFFFFF',
    border: '1px solid #6B7280',
    borderRadius: '10px',
    color: 'black',
  },
  InputOrange: {
    boxSizing: 'border-box',
    width: '340px',
    height: '48px',
    background: `${({ theme }) => theme.colors.white}`,
    border: '3px solid #F8C470',
    borderRadius: '10px',
    color: 'black',
  },
  InputRadio: {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundColor: '#adadad',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    marginLeft: '10px',
    cursor: 'pointer',
  },
};

export default Input;
