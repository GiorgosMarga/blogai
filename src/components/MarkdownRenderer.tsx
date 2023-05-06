import React from 'react'
import  ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {CodeBlock, tomorrowNightBlue} from 'react-code-blocks'
const MarkdownRenderer = ({content, className}:{content:string;className:string}) => {
  return <ReactMarkdown
  children={content}
    remarkPlugins={[remarkGfm]}
    className={`text-white text-md ${className} `}
    components={{
      ol:({node,...props}) => <ol className=' list-decimal ml-4 my-5 font-semibold  space-y-3'>{props.children}</ol>,
      ul:({node,...props}) => <ul className=' list-disc ml-5 space-y-2 font-semibold  my-5'>{props.children}</ul>,
      hr: ({node,...props}) => <hr className='my-5'/>,
      p: ({node,...props}) => <p className='break-words leading-relaxed'>{props.children}</p>,
      strong: ({node,...props}) => <strong className='text-blue-500 text-lg font-bold'>{props.children}</strong>,
      h1: ({node, ...props}) => <h1 className="mt-5  mb-2 text-white text-2xl font-bold">{props.children}</h1>,
      h2: ({node, ...props}) => <h2 className="mt-5 mb-2 text-white text-xl font-bold">{props.children}</h2>,
      h3: ({node, ...props}) => <h3 className="mt-5 mb-2 text-white text-lg font-bold">{props.children}</h3>,
      h4: ({node, ...props}) => <h4 className="mt-5 mb-2 text-white font-bold text-lg">{props.children}</h4>,
      code: ({node, ...props}) => <div className='mt-10 mb-5'><CodeBlock className="bg-blue-950/50 m-10" theme={tomorrowNightBlue} {...props} text={props.children} language="go"/></div>,
      blockquote: ({node,...props}) => <blockquote className="bg-blue-950/30 rounded-lg text-blue-500 p-2 text-sm font-semibold border-l-4 border-blue-500 my-5 w-fit">{props.children}</blockquote>
    }}
  />
}

export default MarkdownRenderer