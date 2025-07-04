import styled from "styled-components";

function VisuallyHidden({
  children,
  ...delegated
}: React.PropsWithChildren) {
  return <Wrapper {...delegated}>{children}</Wrapper>;
}

const Wrapper = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
`;

export default VisuallyHidden;
