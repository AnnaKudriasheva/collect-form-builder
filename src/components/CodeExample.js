import React, { useContext, useState, useEffect } from 'react';
import {  Button, Tabs } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

import getCollectJSConfiguration from '../templates/collect';
import getCollectHTMLConfiguration from '../templates/collect-html';
import getCollectCSSConfiguration from '../templates/collect-css';

import CodeBlock from '../components/CodeBlock';

import { FormContext, FormStylesContext } from '../context';

const { TabPane } = Tabs;

const CodeExample = () => {
  const [state] = useContext(FormContext);
  const [styles] = useContext(FormStylesContext);
  const [jsCode, updateJSCode] = useState('');
  const [htmlCode, updateHTMLCode] = useState('');
  const [cssCode, updateCSSCode] = useState('');

  const updateCodeExamples = () => {
    updateJSCode(getCollectJSConfiguration(state, styles.iframe));
    updateHTMLCode(getCollectHTMLConfiguration(state, styles.iframe));
    updateCSSCode(getCollectCSSConfiguration(styles));
  }

  const handleCodeDownload = () => {
    const zip = new JSZip();
    zip.folder('collect-form')
      .file('form.js', jsCode)
      .file('styles.css', cssCode)
      .file('index.html', htmlCode)
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'collect-form.zip');
    });
  }

  useEffect(() => {
    updateCodeExamples();
  }, [state.form, styles]);

  return (
    <>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="JS" key="1">
          <CodeBlock code={jsCode} language="javascript" />
        </TabPane>
        <TabPane tab="HTML" key="2">
          <CodeBlock code={htmlCode} language="html" />
        </TabPane>
        <TabPane tab="CSS" key="3">
          <CodeBlock code={cssCode} language="css" />
        </TabPane>
      </Tabs>
      <Button onClick={handleCodeDownload} className="mr-1">Download Code</Button>
    </>
  )
};

export default CodeExample;
