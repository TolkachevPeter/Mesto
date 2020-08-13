class UserInfo {
  constructor(form, userName, userData, api) {
    this.form = form;
    this.userName = userName;
    this.userData = userData;
    this.api = api;
    this.id = null;
  }
  
  userInfoLoad() {
    this.api.getProfileOwner()
    .then(data => {
    const {_id} = data;
    this.id = _id;
    this.userName.textContent= data.name;
    this.userData.textContent= data.about;
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  setUserInfo() {
    this.form.username.value = this.userName.textContent;
    this.form.about.value = this.userData.textContent;
  }

  updateUserInfo(data) {
    this.userName.textContent = data.name;
    this.userData.textContent = data.about;
  }
}