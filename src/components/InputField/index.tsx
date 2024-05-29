import { ChangeEvent, FunctionComponent, useState, FormEvent } from 'react';
import { Typography } from 'components';
import './style.css';

interface Props {
  style?: any;
  inputStyle?: any;
  inputText?: string;
  children?: any;
  disabled?: boolean;
  leftDecoration?: string;
  leftTextDecoration?: string;
  rightDecoration?: string;
  secondRightDecoration?: string;
  rightStyle?: any;
  secondRightStyle?: any;
  placeholderStyle?: any;
  rightDecorationTapped?: () => void;
  secondRightDecorationTapped?: () => void;

  type?: 'email' | 'text' | 'password' | 'number' | 'card' | 'cvc';
  helperText?: string;

  error?: boolean;
  errorText?: string;

  placeholder?: string | number | null;
  defaultValue?: any;
  autoFocus?: boolean;

  min?: number;
  max?: number;
  maxLength?: number;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (value: string) => void;
  onInvalid?: (e: FormEvent<HTMLInputElement>) => void;
}

const InputField: FunctionComponent<Props> = (props: Props) => {
  const {
    style,
    inputStyle,
    inputText,
    disabled,
    defaultValue,
    leftDecoration,
    leftTextDecoration,
    type,
    children,
    rightDecoration,
    placeholderStyle,
    secondRightDecoration,
    secondRightStyle,
    rightStyle,
    error,
    errorText,
    placeholder,
    autoFocus,
    min,
    max,
    maxLength,
    onChange,
    onPressEnter,
    onInvalid,
    rightDecorationTapped,
    secondRightDecorationTapped,
  } = props;
  const [animate, setAnimate] = useState(false); 
  const [focused, setFocused] = useState<string>(
    inputText && inputText.length > 0 ? 'focused' : 'unfocused',
  );
  const [inputValue, setInputValue] = useState<string>('');

  const defaultClassName = 'component-inputfield';
  const labelClassName = `${defaultClassName}-label${
    leftDecoration ? '-left-deco' : ''
    }`;
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setAnimate(true); // 엔터 키를 누르면 애니메이션 시작
      // onPressEnter가 있다면 입력값 전달
      if (onPressEnter && inputValue) {
        onPressEnter(inputValue);
        setInputValue('');
      }
    }
  };

  // 변경된 form 클래스 이름을 기반으로 스타일 적용
  const formClassName = `${defaultClassName} ${animate ? 'slide-down-fade-out' : ''}`;
  
  const errorTextStyle: React.CSSProperties = {
    color: 'var(--status-danger)',
    marginTop: '-20px',
    fontSize: 'var(--body-label-bold-size)',
    fontWeight: '400',
    position: 'absolute',
    top: '57px',
    left: '-1px',
  };

  const handleSubmit = (event: any) => event.preventDefault();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setInputValue(e.target.value);
  };

  const handleFocus = () => setFocused('focused');

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setFocused('focused');
    } else {
      setFocused('unfocused');
    }
  };
  

  return (
    <>
      <form
        // className={`${defaultClassName}`}
        className={formClassName}
        style={
          !error
            ? style
            : {
                ...style,
                border: '1px solid var(--status-danger)',
                marginBottom: '5px',
              }
        }
        onSubmit={handleSubmit}
      >
        {leftDecoration && <img src={leftDecoration} alt="" />}
        {leftTextDecoration && (
          <Typography variant="b1" weight="thin">
            {leftTextDecoration}
          </Typography>
        )}
        <div className={`${labelClassName}-${focused}`} onClick={handleFocus}>
          <Typography
            variant="label"
            weight="regular"
            style={{
              color: 'var(--text-tertiary)',
              marginTop: '-4px',
              ...placeholderStyle,
            }}
          >
            {placeholder}
          </Typography>
        </div>
        <input
          className={
            type === 'cvc'
              ? `${defaultClassName}-input cvc-input`
              : `${defaultClassName}-input`
          }
          defaultValue={defaultValue}
          disabled={disabled}
          value={inputText}
          maxLength={maxLength}
          autoFocus={autoFocus || focused === 'focused'}
          type={
            !type
              ? 'text'
              : type === 'card'
              ? 'text'
              : type === 'cvc'
              ? 'password'
              : type
          }
          min={type === 'number' && min ? min : undefined}
          max={type === 'number' && max ? max : undefined}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          onInvalid={onInvalid ? onInvalid : () => {}}
        />
        {rightDecoration && (
          <img
            src={rightDecoration}
            style={rightStyle}
            alt=""
            className="input-right-deco"
            onClick={rightDecorationTapped}
          />
        )}
        {secondRightDecoration && (
          <img
            src={secondRightDecoration}
            alt=""
            style={secondRightStyle}
            onClick={secondRightDecorationTapped}
          />
        )}
        {children}
        {error && <Typography style={errorTextStyle}>{errorText}</Typography>}
      </form>
    </>
  );
};

export default InputField;
