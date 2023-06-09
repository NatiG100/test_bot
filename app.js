const {Telegraf} = require("telegraf");

const bot = new Telegraf('6148735539:AAGW9eXg63srLCsqSijEXnNMuhcjmgecPjo');

bot.command('start',ctx=>{
    console.log(ctx.form)
    bot.telegram.sendMessage(ctx.chat.id,'hello there! Welcome to my new telegram bot.',{})
});

bot.hears('animals',ctx=>{
    console.log(ctx.from);
    let animalMessage = `great, here are pictures of animals you would love`;
    bot.telegram.sendMessage(ctx.chat.id,animalMessage,{
        reply_markup:{
            inline_keyboard:[[
                {
                    text:"dog",
                    callback_data:'dog'
                },
                {
                    text:"cat",
                    callback_data: 'cat'
                }
            ]]
        }
    })
});

bot.action('dog', ctx=>{
    bot.telegram.sendPhoto(ctx.chat.id,{
        source:"res/dog.jpg"
    })
});

bot.action('cat',ctx=>{
    bot.telegram.sendPhoto(ctx.chat.id,{
        source:"res/cat.jpg"
    })
});

bot.launch();