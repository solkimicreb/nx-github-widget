'use strict'

require('@risingstack/nx-framework')
require('whatwg-fetch')
require('style!./fonts/index.css')

const API_URL = 'https://api.github.com/search/repositories'

// this is an NX component factory function
function widget (config) {
  config = config || { shadow: true }

  // this creates an NX app component
  return nx.components.app()
    .use(nx.middlewares.render({
      template: require('./view.html'),
      style: require('./styles/index.css'),
      shadow: config.shadow
    }))
    .use(setup)
}

// this is a middleware
function setup (elem, state) {
  state.sort = state.sort || 'stars'
  state.order = state.order || 'desc'

  state.sortBy = function sortBy (sort) {
    if (state.sort === sort) {
      state.order = (state.order === 'desc' ? 'asc' : 'desc')
    } else {
      state.sort = sort
      state.order = 'desc'
    }
  }

  elem.$observe(function fetchRepos () {
    fetch(`${API_URL}?q=${state.query}&sort=${state.sort}&order=${state.order}`)
      .then(resp => resp.json())
      .then(data => state.repos = data.items)
  })
}

if (module && module.exports) {
  module.exports = widget
}
window.widget = widget
