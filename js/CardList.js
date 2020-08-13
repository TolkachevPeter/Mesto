class CardList {
  constructor(container, func, api) {
    this.container = container;
    this.func = func;
    this.api = api;
  }

  addCard(name, link) {
    const card = this.func(name, link);
    this.container.appendChild(card.createCard());
  }

  render() {
    this.api.getInitialCards()
    .then(cards => {
      cards.forEach(data => {
        this.addCard(data.name, data.link);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
  