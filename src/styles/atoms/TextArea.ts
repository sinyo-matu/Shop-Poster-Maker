import styled from "styled-components";
import { Color } from "../Color";

const Input = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  outline: 3px;
  color: #2d2d2d;
  padding: 3px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${Color.MAIN};
  transition: box-shadow 0.25s ease-in-out;
  &:focus,
  &:hover {
    box-shadow: 0px 0px 5px ${Color.SUB};
    border-color: ${Color.MAIN};
  }
`;

export default Input;
