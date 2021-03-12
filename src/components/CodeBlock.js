import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';

const CodeBlock = (props) => {
  return (
    <> 
      <Highlight {...defaultProps} theme={vsDark} code={props.code} language={props.language} style={{ padding: '15px' }}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{...style, padding: '15px', borderRadius: '8px', maxHeight: '700px' }}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })} key={i}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} key={key} />
              ))}
            </div>
          ))}
        </pre>
      )}
      </Highlight>
    </>
  )
}

export default CodeBlock;
