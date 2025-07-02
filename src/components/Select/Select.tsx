import * as React from "react";
import styled from "styled-components";
import Icon from "../Icon/Icon";

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <PresentationalBit>
        <span>{label}</span>
        <Icon id="chevron-down" size={24} strokeWidth={1} />
      </PresentationalBit>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const PresentationalBit = styled.div`
  background-color: red;
`;

export default Select;
