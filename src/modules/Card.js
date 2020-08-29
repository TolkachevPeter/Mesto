export default class Card {
  constructor(name, url, func) {
    this.name = name;
    this.url = url;
    this.card = null;
    this.func = func;
  }

  like() {
    this.placeCardLikeIcon.classList.toggle("place-card__like-icon_liked");
  }

  remove() {
    this.card.remove();
  }

  createCard() {
    // Переменные для функции
    const newCardContainer = document.createElement('div'),
      linkElement = document.createElement('div'),
      buttonElement = document.createElement('button'),
      placeCardDecription = document.createElement('div'), // placeCardDescription
      nameElement = document.createElement('h3'),
      placeCardLikeIcon = document.createElement('button');
    newCardContainer.className = 'place-card';

    // задаем ссылку для карточки

    linkElement.className = 'place-card__image';
    linkElement.setAttribute('style', `background-image: url(${this.url})`);
    newCardContainer.append(linkElement);

    buttonElement.className = 'place-card__delete-icon';
    linkElement.append(buttonElement);

    //добавляем див с описанием

    placeCardDecription.className = 'place-card__description';
    newCardContainer.append(placeCardDecription);

    //задаем наименования карточки

    nameElement.className = 'place-card__name';
    nameElement.textContent = this.name;
    placeCardDecription.append(nameElement);

    //кнопка с лайками

    placeCardLikeIcon.className = 'place-card__like-icon';
    placeCardDecription.append(placeCardLikeIcon);
    this.placeCardLikeIcon = placeCardLikeIcon;
    this.card = newCardContainer;

  
     //Слушатели 
    linkElement.addEventListener('click', () => this.func(this.url));
    buttonElement.addEventListener('click', (event) => {
      event.stopPropagation();
      this.remove(); // лишний параметр this
    });
    placeCardLikeIcon.addEventListener('click', this.like.bind(this));

    return this.card;
  }
}