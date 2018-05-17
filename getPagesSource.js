function getBodyFB(document_root) {
  var html = '',
      node = document_root.firstChild;
  while (node) {
      switch (node.nodeType) {
      case Node.ELEMENT_NODE:
          html += node.outerHTML;
          break;
      case Node.TEXT_NODE:
          html += node.nodeValue;
          break;
      case Node.CDATA_SECTION_NODE:
          html += '<![CDATA[' + node.nodeValue + ']]>';
          break;
      case Node.COMMENT_NODE:
          html += '<!--' + node.nodeValue + '-->';
          break;
      case Node.DOCUMENT_TYPE_NODE:
          // (X)HTML documents are identified by public identifiers
          html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
          break;
      }
      node = node.nextSibling;
  } 
  let index = html.indexOf(`["DTSGInitialData",[],{"token":"`),
    lastIndex = index
  
  if(index !== -1) {
    while(html[lastIndex] !== `}`) {
      lastIndex++;
    }
    html = html.substring(index, lastIndex);
    
    let lengthOfFilter = html.length 
    
    while(html[lengthOfFilter - 2] !== `"`) {
      lengthOfFilter--;
    }
    html = `fb_dtsg=${html.substring(lengthOfFilter - 1, html.length - 1).replace(":", "%3")}`
  } else {
    html = "Empty."
  }

  return html
}

chrome.runtime.sendMessage({
  action: "getBodyFB",
  source: getBodyFB(document)
});