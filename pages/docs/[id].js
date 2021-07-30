import React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import fs from "fs";

const DocPage = ({ code, frontmatter }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      <Component />
    </div>
  );
};

export async function getStaticPaths() {
  return { paths: [{ params: { id: "button" } }], fallback: false };
}

const DOCS_SOURCE = "./docs";

export async function getStaticProps({ params }) {
  let mdxSource = fs.readFileSync(`${DOCS_SOURCE}/button.mdx`, "utf-8").trim();
  let buttonSource = fs.readFileSync("./src/components/button.jsx", "utf-8");

  const { code } = await bundleMDX(mdxSource, {
    "./button.jsx": buttonSource,
  });

  return {
    props: { id: params.id, code },
  };
}

export default DocPage;
