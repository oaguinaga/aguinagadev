"use client";

import styled from "styled-components";
import NuxtLogo from "./logos/nuxt-logo";
import TypescriptLogo from "./logos/typescript-logo";
import VueLogo from "./logos/vue-logo";

function TechStack() {
  return (
    <Wrapper>
      <TechCard logo={<NuxtLogo />} title="Nuxt" version="3.17.7" link="https://nuxt.com/" />
      <TechCard logo={<VueLogo />} title="Vue" version="3.5.17" link="https://vuejs.org/" />
      <TechCard logo={<TypescriptLogo />} title="Typescript" version="5.7.3" link="https://www.typescriptlang.org/" />
      <TechCard title="Better Auth" variant="secondary" version="1.2.12" link="https://better-auth.com/" />
      <TechCard title="Dizzle" variant="secondary" version="0.44.3" link="https://dizzle.dev/" />
      <TechCard title="Tailwind" variant="secondary" version="4.1.11" link="https://tailwindcss.com/" />
      <TechCard title="Pinia" variant="secondary" version="3.0.3" link="https://pinia.vuejs.org/" />
      <TechCard title="Daisy UI" variant="secondary" version="3.11.1" link="https://daisyui.com/" />
      <TechCard title="VeeValidate" variant="secondary" version="4.15.1" link="https://vee-validate.logaretm.com/" />
      <TechCard title="Zod" variant="secondary" version="4.0.5" link="https://zod.dev/" />
      <TechCard title="Map libre" variant="secondary" version="5.6.1" link="https://maplibre.org/" />
    </Wrapper>
  );
}

function TechCard({
  logo,
  title,
  variant = "primary",
  version = "1.0.0",
  link = "",
}: {
  logo?: React.ReactNode;
  title: string;
  variant?: "primary" | "secondary";
  version?: string;
  link?: string;
}) {
  return (
    <Card data-variant={variant}>
      {logo && (
        <LogoWrapper>
          {logo}
        </LogoWrapper>
      )}
      <p className="title">
        {link ? <a href={link} target="_blank" rel="noopener noreferrer">{title}</a> : title}
        <span className="version">
          v
          {version}
        </span>
      </p>
    </Card>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 8px;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    width: 70%;
    height: 70%;
    object-fit: contain;
    object-position: center;
  }

`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
 
  background-color: var(--color-cloud-300);

  &:has(a:hover) {
    background-color: var(--color-cloud-100);

    ${LogoWrapper} svg {
      transform: scale(1.05) rotate(3deg);
      transition: transform 0.2s ease-in-out;
    }
  }
  
  &[data-variant="primary"] {
    grid-column: span 4;

    @media(max-width: 576px) {
      padding: 0px;
      grid-column: span 6;

      &:nth-child(1) {
        grid-column: span 12;
      }
    }
  }

  &[data-variant="secondary"] {
    grid-column: span 3;

    @media(max-width: 576px) {
      grid-column: span 12;

      .version {
        display: none;
      }

      .title {
        margin-top: 0px;
        margin-bottom: 0px;
      }
    }
  }
  .title {
    margin-top: 8px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color-text-headings);
    font-size: 1.2rem;

    span {
      font-size: 1rem;
      font-weight: 400;
      color: var(--color-text-body);
    }

    a {
      font-weight: 600;
      text-decoration: none;

     &:hover {
      text-decoration: underline;

     }
    }
  }
`;

export default TechStack;
