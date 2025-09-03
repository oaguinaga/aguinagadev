"use client";
import { GitHub, Linkedin, Mail, Twitter } from "react-feather";
import styled from "styled-components";
import Arrow from "@/components/doodle/arrow/arrow";
import Plane from "@/components/doodle/plane/plane";
import Logo from "../logo";
import FooterBottomCloud from "./footer-bottom-cloud";
import FooterTopCloud from "./footer-top-cloud";

function Footer() {
  return (
    <Wrapper>
      <FooterTopCloud />
      <Content>

        <Intro>
          <Logo />
        </Intro>

        <Email>
          <div>

            <span>
              Get in touch
            </span>
            <Arrow className="arrow" />
            <a href="mailto:og.aguinaga@gmail.com">og.aguinaga@gmail.com</a>
          </div>
          <Plane className="plane" />
        </Email>

        <Links>
          <Social>
            <a href="https://www.linkedin.com/in/oaguinaga/" target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </a>
            <a href="https://x.com/aguinaga_dev" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="https://github.com/oaguinaga" target="_blank" rel="noopener noreferrer">
              <GitHub />
            </a>
            <a href="mailto:og.aguinaga@gmail.com">
              <Mail />
            </a>
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
margin-left: 4rem;
display: flex;
grid-area: email;
position: relative;
.arrow {
  position: absolute;
   height: 3rem;
   top: 0;
   left: -3rem;
 }
.plane {
  margin-bottom: 2.5rem;
  margin-left: 1rem;
    height: 2.5rem;
    width: auto;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  a {
    margin-top: 0.5rem;
    text-decoration: none;
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-text-body);
  }
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
