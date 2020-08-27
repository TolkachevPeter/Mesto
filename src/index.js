import './pages/index.css';

import Api from './modules/Api';
import Card from './modules/Card';
import CardList from './modules/CardList';
import errorMessages from './modules/errorMessages';
import FormValidator from './modules/FormValidator';
import Popup from './modules/Popup';
import PopupImage from './modules/PopupImage';
import UserInfo from './modules/UserInfo';

const
  popupNew = new Popup(document.querySelector('#popup-new')),
  popupProfile = new Popup(document.querySelector('#popup-edit')),
  popupImage = new PopupImage(document.querySelector('#popup-image')),
  validEdit = new Validation(document.forms.edit, errorMessages),
  validNew = new Validation(document.forms.new, errorMessages),
  apiServer = new Api({
    baseUrl: 'https://praktikum.tk/cohort12',
    headers: {
      authorization: 'cf9507e2-f20f-44ff-8a3f-06f8e0491d03',
      'Content-Type': 'application/json'
    }
  }),
  cardList =
  new CardList(document.querySelector('.places-list'),
    function forRenderCards(name, link) {
      return new Card(name, link,
        function openImage(url) {
          popupImage.open(url);
        })
    },
    apiServer),
  userInfo = new UserInfo(document.forms.edit,
    document.querySelector('.user-info__name'),
    document.querySelector('.user-info__job'),
    apiServer);

cardList.render();
userInfo.userInfoLoad();

document.querySelector('.user-info__button').addEventListener('click', function () {
  popupNew.open();
  document.forms.new.reset();
  validNew.clearError();
  validNew.setEventListeners();
  validNew.checkFields();
});

document.forms.new.addEventListener('submit', function (event) {
  event.preventDefault();

  function popupFormNew() {
    cardList.addCard(document.forms.new.elements.name.value, document.forms.new.elements.link.value);
    popupNew.close();
    document.forms.new.reset();
  }
  popupFormNew();
});

document.querySelector('.user-info__button-edit').addEventListener('click', function () {
  // userInfo.updateUserInfo();
  validEdit.clearError();
  validEdit.setEventListeners();
  validEdit.checkFields();
  popupProfile.open();
});

document.forms.edit.addEventListener('submit', function (event) {
  event.preventDefault();
  const userName = event.target.querySelector('#user-name').value,
    userData = event.target.querySelector('#about').value;
  apiServer.patchProfileOwner(userName, userData)
    .then(data => {
      userInfo.updateUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      alert(err);
    });

  // editProfile();
});

/*
  Хорошая работа, создан класс Api и запросы на сервер выполняются
  Но есть замечание:

  Надо исправить:
  - у запроса карточек this.api.getInitialCards() нет обработки ошибок

  + дописал catch. Толком еще не разобрался, можно ли так сделать, либо надо сделать как в примере в яндекс практикум.
  Ничего больше трогать не стал, поскольку знаю эту пагубную практику - поменял одно, а сломалось другое :)

  Если все хорошо, то хотел бы на выходных попробовать доделать дополнительные задания, если успею.
  Спасибо

  Можно лучше:
  - проверка ответа сервера и преобразование из json дублируется во всех методах
   класса Api, лучше вынести в отдельный метод



*/

/*
  Отлично, критические замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/