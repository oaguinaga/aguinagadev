"use client";

import { format } from "date-fns";
import * as React from "react";
import styled from "styled-components";

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
    </Wrapper>
  );
}

const Wrapper = styled.header`
  font-family: var(--font-family-heading);
  display: flex;  
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
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
