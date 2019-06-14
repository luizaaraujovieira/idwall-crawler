const Telegram = require('telegram-node-bot')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const chatbot = new Telegram.Telegram('INSIRA_SEU_TOKEN')


request('https://old.reddit.com/', (erro, resposta, body) => {
    if (erro) console.log('Erro na request do imdb')
    if (resposta) console.log('request chamando, tudo ok aqui')

    let $ = cheerio.load(body)



    $('div.thing').each(function () {
        let score = $(this).find('div.midcol div.score.unvoted').text().trim()
        let subThread = $(this).find('div.entry div.top-matter p.tagline a.subreddit.hover.may-blank').text().trim()
        let linkComments = $(this).find('div.entry div.top-matter ul.flat-list li.first a.bylink').attr('href')
        let thread = $(this).find('div.entry div.top-matter p.title a.title').text().trim()
        let linkThread = $(this).find('div.entry div.top-matter p.title a.title').attr('href')

        let scoreMaior = parseInt(score.split(/\D+/).join(""), 10)
        if (scoreMaior >= 50) {


            class EventsController extends TelegramBaseController {
                nadaprafazerAction(scope) {

                    let msg = 'Score: ' + score + '\n' + 'SubThread: ' + 'https://old.reddit.com/'+subThread + '\n' + 'Thread: '
                    + thread + '\n' + 'Link da Thread : ' + 'https://old.reddit.com/'+linkThread + '\n' + 'Link dos comentários : '
                    + linkComments

                    scope.sendMessage(msg)
                }
                get routes() {
                    return {
                        'nadaprafazer': 'nadaprafazerAction'
                    }
                }
            }
            chatbot.router
                .when(
                    new TextCommand('/nadaprafazer', 'nadaprafazer'), new EventsController()
                )
        }
    })


})

