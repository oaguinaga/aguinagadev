import { Code } from "bright";

import styles from "./code-snippet.module.css";
import theme from "./theme";

function CodeSnippet(props: React.ComponentProps<typeof Code>) {
  return (
    <Code
      {...props}
      theme={theme}
      className={styles.wrapper}
    />
  );
}

export default CodeSnippet;
