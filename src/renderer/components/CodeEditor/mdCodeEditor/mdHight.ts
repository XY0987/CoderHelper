import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/ir-black.css'

import bash from 'highlight.js/lib/languages/bash.js'
import javascript from 'highlight.js/lib/languages/javascript.js'
import typescript from 'highlight.js/lib/languages/typescript.js'
import java from 'highlight.js/lib/languages/java.js'
import sql from 'highlight.js/lib/languages/sql.js'
import nginx from 'highlight.js/lib/languages/nginx.js'
import json from 'highlight.js/lib/languages/json.js'
import yaml from 'highlight.js/lib/languages/yaml.js'
import xml from 'highlight.js/lib/languages/xml.js'
import htmlbars from 'highlight.js/lib/languages/handlebars.js'
import shell from 'highlight.js/lib/languages/shell.js'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('java', java)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('json', json)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('htmlbars', htmlbars)
hljs.registerLanguage('shell', shell)

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  xhtmlOut: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

export default md
