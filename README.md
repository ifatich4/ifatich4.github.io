# pgd-ui-kit-vue



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

```
npm install git+https://repo.pegadaian.co.id/client/pegadaian-ui-kit-vue.git
```

# Configuration
Add sass plugin

```
vue add style-resource-loader
```

On your vue config add

```
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ['bootstrap-vue'],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
})
```

Spesific on line 
```
transpileDependencies: ['bootstrap-vue'],

pluginOptions: {
    'style-resources-loader': {
        preProcessor: 'scss',
        patterns: []
    }
}
```


# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!).  Thank you to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.