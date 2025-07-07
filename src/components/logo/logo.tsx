import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { BLOG_TITLE } from "@/constants/constants";

function Logo({ mobileAlignment = "left" }) {
  return (
    <Wrapper>
      <Link href="/" data-mobile-alignment={mobileAlignment}>
        {BLOG_TITLE}
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.5px;

  @media (width >= 35rem) {
    font-size: 1.5rem;
  }
`;

export default Logo;
