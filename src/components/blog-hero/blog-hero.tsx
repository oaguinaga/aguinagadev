"use client";

import type { CategoryKey } from "@/constants/constants";
import { format } from "date-fns";
import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS, CATEGORIES } from "@/constants/constants";
import { BlogClouds } from "../clouds";

function BlogHero({
  title,
  subtitle,
  publishedOn,
  updatedOn,
  className,
  category,
  ...delegated
}: {
  title: string;
  subtitle?: string;
  publishedOn: string;
  updatedOn?: string;
  className?: string;
  category?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const human_readable_date_published = format(new Date(publishedOn), "MMMM do, yyyy");
  const human_readable_date_updated = updatedOn ? format(new Date(updatedOn), "MMMM do, yyyy") : null;

  return (
    <Wrapper className={className} {...delegated}>
      <Content>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        <MetaData>
          <DataList>
            {category && (
              <DataListItemWrapper>
                <dt>Filed under</dt>
                <dd>{CATEGORIES[category as CategoryKey]}</dd>
              </DataListItemWrapper>
            )}
            <DataListItemWrapper>
              <dt> on</dt>
              <dd>
                <time dateTime={publishedOn}>
                  {human_readable_date_published}
                </time>
              </dd>
            </DataListItemWrapper>
          </DataList>
          {updatedOn && (

            <DataList>
              <DataListItemWrapper>
                <dt>Last updated on</dt>
                <dd>
                  <time dateTime={updatedOn}>
                    {human_readable_date_updated}
                  </time>
                </dd>
              </DataListItemWrapper>
            </DataList>
          )}
        </MetaData>
      </Content>

      <BlogClouds />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  position: relative;
  isolation: isolate;
  overflow: clip;
  width: 100%;
  height: 100%;
  background: var(--color-sky-subtle);


  font-family: var(--font-family-heading);
  display: flex;  
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 4rem;
  margin-bottom: 8rem;
  max-width: 60rem; 
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;

  .subtitle {
    font-size: 1.2rem;
    max-width: 36rem;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
    line-height: 1.2;

    @media ${BREAKPOINTS.mdAndLarger} {
      font-size: 1.5rem;
    }
  }

`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DataListItemWrapper = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
  `;

const DataList = styled.dl`
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  flex-direction: column;

  div {
    display: flex;
  }

  @media (min-width: 768px) {
    flex-direction: row;

  }

  dt {
    font-style: italic;
    color: var(--color-text-muted);
  }

  dd {
    font-weight: var(--font-weight-semibold);
  }
`;

export default BlogHero;
