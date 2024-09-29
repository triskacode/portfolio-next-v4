import antfu, {
  renameRules,
} from '@antfu/eslint-config'
import { fixupPluginRules } from '@eslint/compat'
import pluginNext from '@next/eslint-plugin-next'

export default antfu(
  {
    formatters: true,
    react: true,
  },
  {
    name: 'custom/next',
    plugins: {
      next: fixupPluginRules(pluginNext),
    },
    rules: {
      ...renameRules(pluginNext.configs.recommended.rules, { '@next/next': 'next' }),
      'react-refresh/only-export-components': 'off',
    },
  },
)
