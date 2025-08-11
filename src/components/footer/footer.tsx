"use client";
import { GitHub, Linkedin, Twitter } from "react-feather";
import styled from "styled-components";
import FooterBottomCloud from "./footer-bottom-cloud";
import FooterTopCloud from "./footer-top-cloud";

function Footer() {
  return (
    <Wrapper>
      <FooterTopCloud />
      <Content>

        <Intro>
          <p>
            Omar Aguiñaga
          </p>
          <p>
            Software Engineer
          </p>
        </Intro>

        <Email>
          <p>
            Email
          </p>
        </Email>

        <Links>
          <p>
            Links
          </p>
          <Social>
            <Linkedin />
            <Twitter />
            <GitHub />
          </Social>
        </Links>

      </Content>
      <FooterBottomCloud />
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  isolation: isolate;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 192px;
  background: linear-gradient(to bottom, var(--color-sky-from), var(--color-sky-to));
  overflow: hidden;
  overflow: clip;
`;

const Content = styled.div` 
  z-index: 1;
  width: 100%;
  padding: 0 16px;
  display: grid;
  grid-template-areas:
  "intro empty"
  "email links"
  "copyright links";

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  max-width: var(--outer-content-width);
  margin: 0 auto;
`;

const Intro = styled.div`
  grid-area: intro;
`;

const Email = styled.div`
  grid-area: email;
`;

const Links = styled.div`
  grid-row: 2 / 3;
  grid-area: links;
  display: grid;
  grid-template-areas:
  "links-1 links-2"
  "social social";

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  justify-self: end;
`;

const Social = styled.div`
  grid-area: social;
  display: flex;
  gap: 16px;
  justify-self: end;
`;

export default Footer;
