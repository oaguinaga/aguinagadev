"use client";

import { format } from "date-fns";
import * as React from "react";
import styled from "styled-components";
import { BlogClouds } from "../clouds";

function BlogHero({
  title,
  publishedOn,
  updatedOn,
  className,
  category,
  ...delegated
}: {
  title: string;
  publishedOn: string;
  updatedOn?: string;
  className?: string;
  category?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const humanReadableDatePublished = format(new Date(publishedOn), "MMMM do, yyyy");
  const humanReadableDateUpdated = updatedOn ? format(new Date(updatedOn), "MMMM do, yyyy") : null;

  return (
    <Wrapper className={className} {...delegated}>
      <Content>
        <h1>{title}</h1>

        <MetaData>
          <DataList>
            {category && (
              <DataListItemWrapper>
                <dt>Filed under</dt>
                <dd>{category}</dd>
              </DataListItemWrapper>
            )}
            <DataListItemWrapper>
              <dt> on</dt>
              <dd>
                <time dateTime={publishedOn}>
                  {humanReadableDatePublished}
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
                    {humanReadableDateUpdated}
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
  max-width: 60rem;

`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8rem;
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
