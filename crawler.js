const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

request('https://old.reddit.com/', (erro, resposta, body) => {
    if (erro) console.log('Erro na request do reddit')
    if (resposta) console.log('request está funcionando')
    let $ = cheerio.load(body)



    $('div.thing').each(function () {
        let score = $(this).find('div.midcol div.score.unvoted').text().trim()
        let subThread = $(this).find('div.entry div.top-matter p.tagline a.subreddit.hover.may-blank').text().trim()
        let linkComments = $(this).find('div.entry div.top-matter ul.flat-list li.first a.bylink').attr('href')
        let thread = $(this).find('div.entry div.top-matter p.title a.title').text().trim()
        let linkThread = $(this).find('div.entry div.top-matter p.title a.title').attr('href')
        
        let scoreMaior = parseInt(score.split(/\D+/).join(""), 10)
        if(scoreMaior >= 50){

        fs.appendFile('redditCrawler.txt', 'Score: ' + score + '\n' + 'SubThread: ' + subThread + '\n' + 'Thread: '
            + thread + '\n' + 'Link da Thread : ' + linkThread + '\n' + 'Link dos comentários : '
            + linkComments + '\n' + '_______________________________________________________________'
            + '\n', function (erro, resultado) {
                if (erro) console.log('Erro no callback do fs.appendFile redditCrawler.txt')
            })
        }
    })
    
    $('div.thing').each(function(){
        let subThread = $(this).find('div.entry div.top-matter p.tagline a.subreddit.hover.may-blank').text().trim()

        fs.appendFile('subThreadList.txt', subThread + ';', function(erro, resultado){
            if(erro) console.log('Erro no callback do fs.appendFile subThreadList.txt')
        })
    })
})
