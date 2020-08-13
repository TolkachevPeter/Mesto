//комментарий перенес в PopupImage
class Popup {
  constructor(popup) {
    this.popup = popup;
    this.popup.querySelector('.popup__close').addEventListener('click', function (event) {
      event.target.closest('.popup').classList.remove('popup_is-opened');
    });
  }
  open() {
    this.popup.classList.toggle('popup_is-opened');
  }
  close() {
    this.popup.classList.remove('popup_is-opened');
  }  
}
