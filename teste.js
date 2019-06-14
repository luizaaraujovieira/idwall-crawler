const Telegram = require('telegram-node-bot')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const chatbot = new Telegram.Telegram('802547117:AAGSb7PJBTJFJzEp2wmcPkSkory2pWUl8wM')


request('https://www.buscape.com.br/search/cerveja', (erro, resposta, body) => {
    if (erro) console.log('Erro na request do imdb')
    if (resposta) console.log('request chamando, tudo ok aqui')

    let $ = cheerio.load(body)



    $('div.catalogo').each(function () {
        // let score = $(this).find('div.midcol div.score.unvoted').text().trim()
        // let subThread = $(this).find('div.entry div.top-matter p.tagline a.subreddit.hover.may-blank').text().trim()
        // let linkComments = $(this).find('div.entry div.top-matter ul.flat-list li.first a.bylink').attr('href')
        let cervejaNome = $(this).find('').text().trim()
        // let linkCerveja = $(this).find('div.home div.wrap div.row div.col div.content_products div.product_grid div.prod_col_2 div.sub_top_beverages a.productName').attr('href')

 console.log("chamando lets")


            class EventsController extends TelegramBaseController {
                cervejabarataAction(scope) {

                    let msg = 'Cervejas barata: '+cervejaNome

                    scope.sendMessage(msg)
                }
                get routes() {
                    return {
                        'cervejabarata': 'cervejabarataAction'
                    }
                }
            }
            chatbot.router
                .when(
                    new TextCommand('/cervejabarata', 'cervejabarata'), new EventsController()
                )
        
    })


})

