import { defaultValue } from './defaultValue'
import { getCodeBoxConfigVue } from '../getConfig'
import coderBoxVueLoader from '@renderer/coderBox/loader/vue-loader'

export const getConfig = () => {
  return getCodeBoxConfigVue(
    defaultValue,
    '#coderBoxVueContainer',
    'App.vue',
    {
      '.vue': [coderBoxVueLoader]
    },
    {
      cssLibs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
      jsLibs: [
        'https://unpkg.com/vue@2.6.14/dist/vue.min.js',
        'https://unpkg.com/element-ui/lib/index.js'
      ],
      js: `Vue.config.productionTip = false`
    }
  )
}
