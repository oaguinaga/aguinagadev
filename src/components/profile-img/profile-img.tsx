"use client";
import styled from "styled-components";

export default function ProfileImg() {
  return (
    <Wrapper className="profile-img-wrapper">
      <img src="/profile.png" alt="Omar Aguinaga" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 180px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
