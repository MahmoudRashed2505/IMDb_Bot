const {Client,MessageAttachment} = require("discord.js");
const client = new Client();
const tmdb = require('./tmdp.js');
const fetch = require("node-fetch");
const prefix = '~';
"use strict";

let title, language, rate, overview, release_date,poster_path;

let resultMovie = [];
let resultSeries = [];
let random = Math.floor((Math.random() * 4 ) + 1);

const urlMovie = "https://api.themoviedb.org/3/discover/movie?api_key=9c3d2974beffc3faec62e82396e77714&language=en-US&sort_by=popularity.desc";
const urlSeries = "https://api.themoviedb.org/3/discover/tv?api_key=9c3d2974beffc3faec62e82396e77714&language=en-US&sort_by=popularity.desc&page=1&vote_average.gte=5";

const token = "NzI3NzkyMzgxMjkzODg3NTg4.XvztuA.IZY1Co8v2feyvmvebh4KTaj_Omk";
client.on('ready', ()=>{
  console.log("IMDb_Bot is running...");
  var testMovie = fetch(urlMovie).then(function (res) {
      return res.json();
    }).then(function (data){
      resultMovie = data.results;
    });

  var testSeris = fetch(urlSeries).then(function (res) {
        return res.json();
      }).then(function (data){
        resultSeries = data.results;
      });

});






client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'movie'){
    random = Math.floor((Math.random() * resultMovie.length ));
    title = resultMovie[random]['title'];
    language = resultMovie[random]['original_language'];
   rate = resultMovie[random]['vote_average'];
   overview = resultMovie[random]['overview'];
   release_date = resultMovie[random]['release_date'];
   poster_path = resultMovie[random]['poster_path'];
   poster_path = "https://image.tmdb.org/t/p/w200"+poster_path;
   const attachment = new MessageAttachment(poster_path);
   message.reply(attachment).then(()=> message.channel.send(`\nMovie Title: ${title}\nlanguage: ${language}\nrating: ${rate}\nOverview: ${overview}\nRelease Date: ${release_date}`));
  }
  else if (command === 'series') {
    random = Math.floor((Math.random() * resultSeries.length ));
    title = resultSeries[random]['name'];
    language = resultSeries[random]['original_language'];
    rate = resultSeries[random]['vote_average'];
    overview = resultSeries[random]['overview'];
    release_date = resultSeries[random]['first_air_date'];
    poster_path = resultSeries[random]['poster_path'];
    poster_path = "https://image.tmdb.org/t/p/w200"+poster_path;
    const attachment = new MessageAttachment(poster_path);
    message.reply(attachment).then(()=> message.channel.send(`\nSeries Title: ${title}\nlanguage: ${language}\nrating: ${rate}\nOverview: ${overview}\nRelease Date: ${release_date}`));
  }
  else if (command === "help"){
    message.reply("\nHello ! This is IMDb Bot, Its Intial Version is to Recomend Movies and TV Shows\nBot Author: TheSpartan9898\nBot Version: 1.0.0\nBot Features:\n -To Get a random Recomended Movie use ~movie\n -To Get Recomended TV Show use ~series\n -To Get help use ~help");
  }
});



client.login(token)
