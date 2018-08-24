(function () {
  	'use strict';
  class Cards {
    constructor(args) {
      this.cardNum =  args.length;
      this.cardDatas = this._clone(args);
      this.cardsContainer = document.createElement('ul');
      this.cardsContainer.classList.add('cards');
      this.cards = [];
    }
    _clone(src) {
      let target = {};
      for (let prop in src) {
        if (src.hasOwnProperty(prop)) {
          target[prop] = src[prop];
        }
      }
      return target;
    }
    pasteCards(targetBody){
      for (var i = 0; i < this.cardNum; i++) {
        var dataForCard ={};
        dataForCard.name = this.cardDatas[i].gsx$name;
        dataForCard.time = this.cardDatas[i].gsx$timestamp;
        dataForCard.content = this.cardDatas[i].gsx$content;
        let newCard = new Card(dataForCard);
        this.cards.push(newCard);
        this.cardsContainer.innerHTML += newCard.createDom();
      }
      targetBody.appendChild(this.cardsContainer);
    }
  }
  class Card {
    constructor(args) {
      if (args != null) {
        this.author = args.name.$t;
        this.time = args.time.$t;
        this.content = args.content.$t;
        //console.log(args.name.$t);
      }else{
        this.author = 'unknown';
        this.time = '2018.8.22';
        this.content = 'Happy Birthday!';
      }
    }
    // set author(name){
    //   if (name != '' && typeof name === 'string') {
    //     this.author = name;
    //   }
    // }
    // set time(timeStamp){
    //   if (timeStamp != '' && typeof timeStamp === 'string') {
    //     this.time = timeStamp;
    //   }
    // }
    // set content(words){
    //   if (words != '' && typeof words === 'string') {
    //     this.content = words;
    //   }
    // }
    createDom(){
      return '<li class = "card"><h4 class= "card__author">'+ this.author +
      '</h4><p class= "card__body">'+ this.content +
      '</p><h6 class= "card__date">' + this.time + '</h6></li>';
    }
  }
  let cardBox = document.getElementById('card');
  fetch('https://spreadsheets.google.com/feeds/list/1maGudwK9I2M8D2ZFuxhPVEBBsIL1dHservdrzUFEd-A/od6/public/values?alt=json',{method: 'get'})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }else{
      throw new Error(response.statusText);
    }
  }).then(function (j) {
    let cardDatas = j.feed.entry;
    let cardDom = new Cards(cardDatas);
    cardDom.pasteCards(cardBox);
    $('.cards').slick();
  }).catch(function (err) {
    console.log(err);
  })

})()
