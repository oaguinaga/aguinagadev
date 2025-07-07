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
            <>
              <DataListTerm>Filed under</DataListTerm>
              <DataListDefinition>{category}</DataListDefinition>
            </>
          )}
          <DataListTerm>Published on</DataListTerm>
          <DataListDefinition>
            <time dateTime={publishedOn}>
              {humanReadableDatePublished}
            </time>
          </DataListDefinition>
        </DataList>
        {updatedOn && (
          <DataList>
            <DataListTerm>Updated on</DataListTerm>
            <DataListDefinition>
              <time dateTime={updatedOn}>{humanReadableDateUpdated}</time>
            </DataListDefinition>
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
  gap: 1rem;
  align-items: center;
  `;

const MetaData = styled.div`
align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DataList = styled.dl`
  display: flex;
  gap: 0.25rem;
`;

const DataListTerm = styled.dt`
  font-style: italic;
  color: var(--color-text-muted);
`;

const DataListDefinition = styled.dd`
  font-weight: var(--font-weight-semibold);
`;

export default BlogHero;
