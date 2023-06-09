const {Telegraf} = require("telegraf");

const bot = new Telegraf('6148735539:AAGW9eXg63srLCsqSijEXnNMuhcjmgecPjo');

bot.command('start',ctx=>{
    console.log(ctx.form)
    bot.telegram.sendMessage(ctx.chat.id,'hello there! Welcome to my new telegram bot.',{})
});

bot.command('pay',ctx=>{
    console.log(ctx.from)
    bot.telegram.sendInvoice(ctx.chat.id,{
        title:"Pay",
        description:"This is a test for paying in tgbot through chapa",
        payload:`${ctx.chat.id}_${Number(new Date())}`,
        provider_token:"6141645565:TEST:6OCsr8nZ6bUi3qWCP9gt",
        currency:"ETB",
        prices:[{label:"Subscription Fee",amount:450}]
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
});

bot.on('pre_checkout_query',(ctx)=>ctx.answerPreCheckoutQuery(true));
bot.on('successful_payment',async(ctx,next)=>{
    await ctx.reply('Successful Payment')
})

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