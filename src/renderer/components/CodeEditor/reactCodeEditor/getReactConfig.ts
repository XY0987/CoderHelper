import coderBoxReactLoader from '@renderer/coderBox/loader/react-loader'
import { defaultValue } from './defaultValue'
import { getCodeBoxConfigReact } from '../getConfig'

export const getConfig = () => {
  return getCodeBoxConfigReact(
    defaultValue,
    '#coderBoxContainerReact',
    'App.tsx',
    {
      '.tsx': [coderBoxReactLoader]
    },
    {
      imports: {
        react: 'https://ga.jspm.io/npm:react@17.0.2/index.js',
        'react-dom': 'https://ga.jspm.io/npm:react-dom@17.0.2/index.js',
        antd: 'https://ga.jspm.io/npm:antd@4.24.12/dist/antd.js',
        moment: 'https://ga.jspm.io/npm:moment@2.29.3/moment.js',
        '@lucky-canvas/react': 'https://unpkg.com/@lucky-canvas/react@0.1.7/dist/index.esm.js'
      },
      scopes: {
        'https://ga.jspm.io/': {
          'object-assign': 'https://ga.jspm.io/npm:object-assign@4.1.1/index.js',
          scheduler: 'https://ga.jspm.io/npm:scheduler@0.20.2/index.js',
          'scheduler/tracing': 'https://ga.jspm.io/npm:scheduler@0.20.2/tracing.js'
        }
      }
    },
    ['https://unpkg.com/antd@4.24.12/dist/antd.min.css'],
    `body { padding: 10px; } #root>div { margin: 10px 0; }`
  )
}
