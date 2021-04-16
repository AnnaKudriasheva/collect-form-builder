import { useLayoutEffect } from 'react';
import config from 'config';

function heapTemplate(config) {
  return `
  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};   
  heap.load("${config.heapTrackingId}");
  `;
}

export default function useHeapAnalytics() {
  useLayoutEffect(() => {
    if (
      // ['production', 'development'].includes(process.env.DOCS_ENV) &&
      // !localStorage.getItem('vgs_staff') &&
      !document.querySelector('#heap-container')
    ) {
      const scriptElement = document.createElement('script');
      scriptElement.setAttribute('id', 'heap-container');
      scriptElement.text = heapTemplate(config);
      document.body.appendChild(scriptElement);
    }
  }, []);
}
