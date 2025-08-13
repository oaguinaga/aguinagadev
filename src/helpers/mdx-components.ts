import React from "react";
import CodeSnippet from "@/components/code-snippet";
import { SectionHeading, SectionSubHeading, SectionSubSubHeading } from "@/components/content-heading";
import List, { ListItem } from "@/components/list";
import OceansideTechStack from "@/post-helpers/oceanside-case-of-study/tech-stack";

const Ul = (props: React.ComponentPropsWithoutRef<"ul">) =>
  React.createElement(List as any, { ...props, type: "unordered" });

const Ol = (props: React.ComponentPropsWithoutRef<"ol">) =>
  React.createElement(List as any, { ...props, type: "ordered" });

const Li = (props: React.ComponentPropsWithoutRef<"li">) =>
  React.createElement(ListItem as any, props);

export const MDX_COMPONENT_MAP = {
  pre: CodeSnippet,
  h2: SectionHeading,
  h3: SectionSubHeading,
  h4: SectionSubSubHeading,

  ul: Ul,
  ol: Ol,
  li: Li,

  // helpers for blog posts
  OceansideTechStack,
};
