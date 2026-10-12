const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#main-nav');

    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isExpanded));
      menuButton.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
      navigation.classList.toggle('open', !isExpanded);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Открыть меню');
        navigation.classList.remove('open');
      }
    });
