import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock, tomorrowNightBlue } from "react-code-blocks";
const MarkdownRenderer = ({
  content,
  className,
}: {
  content: string;
  className: string;
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`text-md text-white ${className} `}
      components={{
        a: ({ ...props }) => (
          <a
            href={props.href}
            className="cursor-pointer font-bold text-blue-500 underline"
          >
            {props.children}
          </a>
        ),

        ol: ({ ...props }) => (
          <ol className=" my-5 ml-4 list-decimal space-y-3  font-semibold">
            {props.children}
          </ol>
        ),
        ul: ({ ...props }) => (
          <ul className=" my-5 ml-5 list-disc space-y-2  font-semibold">
            {props.children}
          </ul>
        ),
        hr: () => <hr className="my-5" />,
        p: ({ ...props }) => (
          <p className="break-words leading-relaxed">{props.children}</p>
        ),
        strong: ({ ...props }) => (
          <strong className="text-lg font-bold text-blue-500">
            {props.children}
          </strong>
        ),
        h1: ({ ...props }) => (
          <h1 className="mb-2  mt-5 text-2xl font-bold text-white">
            {props.children}
          </h1>
        ),
        h2: ({ ...props }) => (
          <h2 className="mb-2 mt-5 text-xl font-bold text-white">
            {props.children}
          </h2>
        ),
        h3: ({ ...props }) => (
          <h3 className="mb-2 mt-5 text-lg font-bold text-white">
            {props.children}
          </h3>
        ),
        h4: ({ ...props }) => (
          <h4 className="mb-2 mt-5 text-lg font-bold text-white">
            {props.children}
          </h4>
        ),
        code: ({ ...props }) => (
          <div className="mb-5 mt-10">
            <CodeBlock
              className="m-10 bg-blue-950/50"
              theme={tomorrowNightBlue}
              text={props.children}
              language="go"
              showLineNumbers={false}
            />
          </div>
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="my-5 w-fit rounded-lg border-l-4 border-blue-500 bg-blue-950/30 p-2 text-sm font-semibold text-blue-500">
            {props.children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
