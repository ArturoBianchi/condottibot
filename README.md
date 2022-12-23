# **CONDOTTIBOT**

- <b>Per la documentazione ufficiale seguire il link seguente:
https://discordjs.guide/creating-your-bot/main-file.html#running-your-application <br>
- Per la documentazione ufficale Discord seguire il link seguente:
https://discord.com/developers/docs/intro <br>
- Per la documentazione sul collegamento alla chat vocale
https://discordjs.guide/voice/#installation
</b>
<br><br>
## 1. ID SERVER
Attualmente non e' stata implementata nessuna funzionalita di deploy generica, ovvero capace di adattarsi a tutti
i server di cui il Bot fara' parte. <br>
Per collegare il bot ad un server specifico, modificare il paramentro relativo al _`guildId`_ nel file `config.json`

**TESTING**: _1055552330398978098_<br>
**TEAM PUCCIOSO**: _252464782223867905_


## 2. DIPENDENZE
Da terminale eseguire

`npm init -y` <br>
`npm install discord.js `<br>
`npm install @discordjs/voice libsodium-wrappers`<br>
`npm install @discordjs/opus`<br>
`npm install ffmpeg-static`

## 3. FILE .gitignore
Se non presente su reporistory, creare il file .gitignore ed aggiungere i seguenti elementi
>node_modules <br>
>.env <br>
>config.json<br>
>.idea