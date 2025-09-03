"use client";

import styled from "styled-components";
import Icon from "@/components/icon/index";

function GithubButton({ href, children }: { href: string; children?: React.ReactNode }) {
  return (
    <Wrapper target="_blank" rel="noopener noreferrer" href={href}>
      <Icon id="github" />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  background: var(--color-black);
  
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 600;
  text-decoration: none;
`;

export default GithubButton;
