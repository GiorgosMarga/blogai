import React from 'react'
import  ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {CodeBlock, tomorrowNightBlue} from 'react-code-blocks'
const MarkdownRenderer = ({content, className}:{content:string;className:string}) => {
  return <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    className={`text-white text-md ${className} `}
    components={{
      ol:({...props}) => <ol className=' list-decimal ml-4 my-5 font-semibold  space-y-3'>{props.children}</ol>,
      ul:({...props}) => <ul className=' list-disc ml-5 space-y-2 font-semibold  my-5'>{props.children}</ul>,
      hr: ({...props}) => <hr className='my-5'/>,
      p: ({...props}) => <p className='break-words leading-relaxed'>{props.children}</p>,
      strong: ({...props}) => <strong className='text-blue-500 text-lg font-bold'>{props.children}</strong>,
      h1: ({ ...props}) => <h1 className="mt-5  mb-2 text-white text-2xl font-bold">{props.children}</h1>,
      h2: ({ ...props}) => <h2 className="mt-5 mb-2 text-white text-xl font-bold">{props.children}</h2>,
      h3: ({ ...props}) => <h3 className="mt-5 mb-2 text-white text-lg font-bold">{props.children}</h3>,
      h4: ({...props}) => <h4 className="mt-5 mb-2 text-white font-bold text-lg">{props.children}</h4>,
      code: ({ ...props}) => <div className='mt-10 mb-5'><CodeBlock className="bg-blue-950/50 m-10" theme={tomorrowNightBlue} text={props.children} language="go" showLineNumbers={false}/></div>,
      blockquote: ({...props}) => <blockquote className="bg-blue-950/30 rounded-lg text-blue-500 p-2 text-sm font-semibold border-l-4 border-blue-500 my-5 w-fit">{props.children}</blockquote>
    }}
  >{content}</ReactMarkdown>
}

export default MarkdownRenderer