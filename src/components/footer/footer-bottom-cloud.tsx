"use client";
import styled from "styled-components";

function FooterBottomCloud() {
  return (
    <Wrapper>
      <svg viewBox="0 0 1557 213" width="1590" height="213" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M1331 165.5C1320.5 162.5 1311 112 1221.5 92.4999C1132 72.9999 1104.5 114 1093.5 112C1082.5 110 1052 6.04351 903.5 1.00011C771 -3.49989 732.5 90 722.5 92.4999C712.5 94.9998 647.5 54.0001 535.5 73.9999C423.5 93.9997 421.5 165.5 411.5 165.5C401.5 165.5 359 58.5001 203.5 49.4999C48 40.4998 0.5 136 0.5 209.5C0.5 283 62.5 309.5 62.5 309.5H100.5L1556.5 304.5V232.5C1556.5 215.5 1542.5 159.009 1464 145.5C1368.81 129.118 1341.5 168.5 1331 165.5Z"></path></svg>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  svg {
    position: absolute;
    right: 50%;
    bottom: 0;
    max-width: revert;
    transform: translate(86px);
    

    @media (max-width: 48rem) {
      min-width: 670vw;
    }

    path {
      fill:  rgba(14, 20, 27, .5);
    }
  }
`;

export default FooterBottomCloud;
