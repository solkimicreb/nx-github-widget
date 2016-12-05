require('@risingstack/nx-framework')
require('whatwg-fetch')
require('style!./fonts/index.css')

const SEARCH_URL = 'https://api.github.com/search/repositories'

// also do module.exports
window.widget = function widget (config) {
  config = config || { shadow: true }

  return nx.components.app()
    .use(nx.middlewares.render({
      template: require('./view.html'),
      style: require('./styles/index.css'),
      shadow: config.shadow
    }))
    .use(setup)
}

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
    fetch(`${SEARCH_URL}?q=${state.query}&sort=${state.sort}&order=${state.order}`)
      .then(resp => resp.json())
      .then(data => state.repos = data.items)
  })
}
