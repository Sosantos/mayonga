import React, { InputHTMLAttributes, forwardRef } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";

export const Input = styled(InputMask)`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius:8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;
type Props = {
  label?: string;
  error?: string;
  mask?: string;
  ref?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, Props>((props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input mask={props.mask ?? ""} ref={props.ref} {...props} />
      <span style={{ fontSize: 12, color: "red" }}>{props.error}</span>
    </div>
  );
});
export default TextField;
