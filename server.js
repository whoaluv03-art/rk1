const express = require('express');
const path = require('path');
const data = require('./data.json');

const app = express();
const port = process.env.PORT || 3000;
const sharedViewData = {
  company: data.company,
  stats: data.stats,
  services: data.services,
  steps: data.steps
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    ...sharedViewData,
    posts: data.posts,
    pageTitle: 'Форма Строй — дома, в которых хочется жить',
    description: data.company.description,
    activePage: 'home'
  });
});

app.get('/posts/:slug', (req, res, next) => {
  const post = data.posts.find((item) => item.slug === req.params.slug);

  if (!post) {
    return next();
  }

  res.render('post', {
    ...sharedViewData,
    post,
    relatedPosts: data.posts.filter((item) => item.slug !== post.slug).slice(0, 2),
    pageTitle: `${post.title} | Форма Строй`,
    description: post.excerpt,
    activePage: 'posts'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    ...sharedViewData,
    about: data.company.about,
    pageTitle: 'О проекте | Форма Строй',
    description: data.company.about.description,
    activePage: 'about'
  });
});

app.use((req, res) => {
  res.status(404).render('404', {
    ...sharedViewData,
    pageTitle: 'Страница не найдена | Форма Строй',
    description: 'Запрошенная страница не найдена.',
    requestedPath: req.originalUrl,
    activePage: ''
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Форма Строй запущена: http://localhost:${port}`);
  });
}

module.exports = app;