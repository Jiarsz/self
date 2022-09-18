
const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")

const PremiumKey = "kontol404"
const Host = "https://api.vhtear.com"



const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone") 
const fs = require("fs")
const kagApi = require('@kagchi/kag-api')
const Requests = require('node-fetch')
const base64Img = require('base64-img')
const axios = require('axios')
const speed = require('performance-now')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const setiker = JSON.parse(fs.readFileSync('./src/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./src/video.json'))
const audionye = JSON.parse(fs.readFileSync('./src/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./src/image.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
			// API KEY
			apiKey = 'APIKEY' // get in https://mhankbarbars.herokuapp.com/api
			tobzkey = 'BotWeA'// GET IN https://tobz-api.herokuapp.com/api
			vhtearkey = 'kontol404'// GET IN https://api.vhtear.com/
			zekskey = 'apivinz' //GET IN https://api.zeks.xyz/api
			techkey = 'fQb63k-jVVg0v-ccBECZ-9FTpC7-uYNlGr'
			creply = '_*JIARSZ SELF-BOT*_'
			stnm = '0'
			publik = false
			
			
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Ownerbot\n'
            + 'ORG:Creator SELF BOT;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6285959375675:+62 877-7545-2636\n'
            + 'END:VCARD'
prefix = 'z'
blocked = []            
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

const bulan = arrayBulan[moment().format('MM') - 1]


function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)}H, ${pad(minutes)}Min, ${pad(seconds)}Sec `
}
        function monospace(string) {
            return '```' + string + '```'
        }




const { exec } = require("child_process")

const hafizh = new WAConnection()

hafizh.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready`)
})

hafizh.on('credentials-updated', () => {
   const authInfo = hafizh.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && hafizh.loadAuthInfo('./session.json')

hafizh.connect();

// hafizh.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@kingg_squard028`)

hafizh.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await hafizh.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await hafizh.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `@${num.split('@')[0]}\nwelcome to group *${mdata.subject}* semoga betah`
				let buff = await getBuffer(ppimg)
				hafizh.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await hafizh.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `alhamdulillah, beban hilang 1 @${num.split('@')[0]} `
				let buff = await getBuffer(ppimg)
				hafizh.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	hafizh.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
hafizh.on('message-update', async (hurtz) => {
	try {
		const from = hurtz.key.remoteJid
		const messageStubType = WA_MESSAGE_STUB_TYPES[hurtz.messageStubType] || 'MESSAGE'
		const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
		const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
		const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
		const sender = hurtz.key.fromMe ? hafizh.user.jid : hurtz.key.remoteJid.endsWith('@g.us') ? hurtz.participant : hurtz.key.remoteJid
		const isRevoke = hurtz.key.remoteJid.endsWith('@s.whatsapp.net') ? true : hurtz.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
		const isCtRevoke = hurtz.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
		const isBanCtRevoke = hurtz.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
		if (messageStubType == 'REVOKE') {
			console.log(`Status untuk grup : ${!isRevoke}\nStatus semua kontak : ${!isCtRevoke}\nStatus kontak dikecualikan : ${!isBanCtRevoke}`)
			if (!isRevoke) return
			if (!isCtRevoke) return
			if (!isBanCtRevoke) return
			const from = hurtz.key.remoteJid
			const isGroup = hurtz.key.remoteJid.endsWith('@g.us') ? true : false
			let int
			let infoMSG = JSON.parse(fs.readFileSync('./src/dat/msg.data.json'))
			const id_deleted = hurtz.key.id
			const conts = hurtz.key.fromMe ? hafizh.user.jid : hafizh.contacts[sender] || { notify: jid.replace(/@.+/, '') }
			const pushname = hurtz.key.fromMe ? hafizh.user.name : conts.notify || conts.vname || conts.name || '-'
			const opt4tag = {
				contextInfo: { mentionedJid: [sender] }
			}
			for (let i = 0; i < infoMSG.length; i++) {
				if (infoMSG[i].key.id == id_deleted) {
					const dataInfo = infoMSG[i]
					const type = Object.keys(infoMSG[i].message)[0]
					const timestamp = infoMSG[i].messageTimestamp
					int = {
						no: i,
						type: type,
						timestamp: timestamp,
						data: dataInfo
					}
				}
			}
			const index = Number(int.no)
			const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
			const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
			var itsme = `${stnm}@s.whatsapp.net`
				var split = `${creply}`
				// var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot72 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
			if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
				const strConversation = `「 *ANTI-DELETE* 」

*Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
*Tipe :* Text
*Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
*Pesan :* ${body ? body : '-'}
`
				hafizh.sendMessage(from, strConversation, MessageType.text, selepbot72)
			} else if (int.type == 'stickerMessage') {
				var itsme = `${stnm}@s.whatsapp.net`
					var split = `${creply}`
					const pingbro23 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await hafizh.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filename}`);
				const strConversation = `「 *ANTI-DELETE* 」

*Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
*Tipe :* Sticker
*Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

				const buff = fs.readFileSync(savedFilename)
				hafizh.sendMessage(from, strConversation, MessageType.text, opt4tag)
				hafizh.sendMessage(from, buff, MessageType.sticker, pingbro23)
				// console.log(stdout)
				fs.unlinkSync(savedFilename)
				fs.unlinkSync(`./media/sticker/${filename}-done.webp`)
				
			} else if (int.type == 'imageMessage') {
				var itsme = `${stnm}@s.whatsapp.net`
					var split = `${creply}`
					const pingbro22 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
				const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
				const savedFilename = await hafizh.downloadAndSaveMediaMessage(int.data, `./media/revoke/${filename}`);
				const buff = fs.readFileSync(savedFilename)
				const strConversation = `「 *ANTI-DELETE* 」

*Nama :* ${pushname} ( @${sender.replace('@s.whatsapp.net', '')} )
*Tipe :* Image
*Waktu :* ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
*Pesan :* ${body ? body : '-'}
`
				hafizh.sendMessage(from, strConversation, MessageType.text, opt4tag, pingbro22)
				hafizh.sendMessage(from, buff, MessageType.image, pingbro22)
				fs.unlinkSync(savedFilename)
			}
		}
	} catch (e) {
		console.log('Message : %s', color(e, 'green'))
		// console.log(e)
	}
})

	hafizh.on('message-new', async (tod) => {
		try {
			if (!tod.message) return
			if (tod.key && tod.key.remoteJid == 'status@broadcast') return
			let infoMSG = JSON.parse(fs.readFileSync('./src/dat/msg.data.json'))
		infoMSG.push(JSON.parse(JSON.stringify(tod)))
		fs.writeFileSync('./src/dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		const urutan_pesan = infoMSG.length
		if (urutan_pesan === 5000) {
			infoMSG.splice(0, 4300)
			fs.writeFileSync('./src/dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
		}
			if (!tod.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(tod.message)
			const from = tod.key.remoteJid
			const type = Object.keys(tod.message)[0]
			
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && tod.message.conversation.startsWith(prefix)) ? tod.message.conversation : (type == 'imageMessage') && tod.message.imageMessage.caption.startsWith(prefix) ? tod.message.imageMessage.caption : (type == 'videoMessage') && tod.message.videoMessage.caption.startsWith(prefix) ? tod.message.videoMessage.caption : (type == 'extendedTextMessage') && tod.message.extendedTextMessage.text.startsWith(prefix) ? tod.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? tod.message.conversation : (type === 'extendedTextMessage') ? tod.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'Loading...',
				success: '️success ✔ ',
				error: {
					stick: 'error gan',
					Iv: 'Link ga valid gan'
				},
				only: {
					group: 'only gc',
					ownerG: 'only owner gc',
					ownerB: 'only owner bot',
					admin: 'only admin gc',
					Badmin: 'jadikan ot admin udin'
				}
			}
			const botNumber = hafizh.user.jid
			const ownerNumber = ["6285710912951@s.whatsapp.net"] // ganti nomer lu
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? tod.participant : tod.key.remoteJid
			const groupMetadata = isGroup ? await hafizh.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				hafizh.sendMessage(from, teks, text, {quoted:tod})
			}
			const sendMess = (hehe, teks) => {
				hafizh.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? hafizh.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : hafizh.sendMessage(from, teks.trim(), extendedText, {quoted: tod, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
		switch(command) {
				case 'menu':
		        case 'help':
hafizh.sendMessage(from, help(prefix), text, { quoted: { key: { fromMe: false, participant: `${stnm}@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": `${creply}`, "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIAGAAYAMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAABAgADBAUGAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAA8XJKqQsJJYGLGIJGiAGAAx2B47zQ2R51FyOtNEHnS2mdGaMBuXr3y86z0VDx4VHvuFO3n6/Vefdc9dNEbrZVYPR6Pzz6cXo+n5voTPW873uAyjJZzjZ6kkdCujF6NOHbfLo38qmufq4siTqFWR1tFI6ypTZ6y1omdiGErKIBVOpIf//EAC0QAAIDAAAFAwIEBwAAAAAAAAECAAMRBBASIUEFMVETIBQiMkIlMFJhcYGR/9oACAEBAAE/AP5+TJkyZM55yAmQCZCJneETphWYAITyEBgWdI+Yf8TJk9pgyNDyEURR2JyJUzdwIaX+I3CXj9pydDqcw7D29xkJOf2h2ZyAgzJQn8K4s5++qel1L+XPNT6f9QU/kQ53I2LwzD09kdP1KbC3xnsJTQo9R4U4QC4yesj6dJpsse6x7OtWI7IsKKKkHnSY4EImwQAdMdko9Mq4TR9SxutpwdwSs4wVgCJStNlXSvcZkNFhDO9hLYRvwPbAJxF9qXIy7tZHSTF4ziGFqMFdbGLdJG4zeVl75YR8DIWUw5BBF7jIhw75lZFoA3pbPPsZwf4ilwf2y+4sMZiJf9IsWd2/5Lb60XKwd/qMLb9giEzp3uDKlY6ewA8mLxRqQ5bp8ZG4pm3uRLnBH6hCRCd5AZvIRWIMrtweNhuJBBGeYzGFz8wmEwZyOjzyEEDZOsH3ELaBD2MJhMHIn7NmwH7Mi62AQ1v8T//EAB0RAQEAAgIDAQAAAAAAAAAAAAEAEBECIBIxQWH/2gAIAQIBAT8A7hatWpwWzHuc8uP7cD6yhLgbyJTrvp//xAAfEQADAAICAwEBAAAAAAAAAAAAAQIRIQMQEhMxMkH/2gAIAQMBAT8A6yZ7ZVYPZl6PMVkjZdZKVfUxU0t/BNSTWSin+iOTaXjo5b+KSJdbaJlIZyx/Uemm3vBHHWdsS7aPBCXf/9k", "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==" } } } })
break
case 'cr':
		var anu = body.slice(4).split('|')
		//const itulo = m.message.extendedTextMessage.contextInfo.mentionedJid
		//console.log(mentioned)
		const itunya = anu[0].replace("@","").replace(" ","")
		var optionss ={
			key: {
      remoteJid: '6285710912951-160947628@g.us',
      fromMe: false,
      id: generateMessageID()
    },
    message: { conversation: anu[1] },
    messageTimestamp: '1608717869',
    status: 'ERROR',
    participant: itunya+'@s.whatsapp.net',
	ephemeralOutOfSync: false
  }
  console.log(optionss)
  await hafizh.sendMessage(anu[3], anu[2], MessageType.text, {quoted: optionss})
		break
		case 'getid':
  await hafizh.sendMessage('6285710912951@c.us', from, MessageType.text)
		break
		case 'return':
					return hafizh.sendMessage(from, JSON.stringify(eval(args.join(''))), text, {quoted: tod})
					break
case 'film':
		data = await fetchJson(`https://api.zeks.xyz/api/film?q=${body.slice(6)}&apikey=${zekskey}`)
		teks = '\n'
		for (let i of data.result) {
		teks += `Judul: ${i.tile}\nLink: ${i.url}`
		buffss = await getBuffer(data.result[0].thumb)
		hafizh.sendMessage(from, buffss, image, {quoted: tod, caption: teks}) 
		}
		break
		case 'getses':
                    const sesPic = await hafizh.getSnapshot()
                    hafizh.sendFile(from, sesPic, 'session.png', 'Neh boss', id)
                    break
				case 'donasi':
				case 'donate':
					hafizh.sendMessage(from, donasi(), text)
					break
				case 'info':
					me = hafizh.user
					uptime = process.uptime()
					teks = `𝗡𝗮𝗺𝗮 𝗯𝗼𝘁 : ${me.name}\n*𝗡𝗼𝗺𝗲𝗿 𝗯𝗼𝘁* : @${me.jid.split('@')[0]}\n*𝗣𝗿𝗲𝗳𝗶𝘅* : ${prefix}\n𝗧𝗼𝘁𝗮𝗹 𝗕𝗹𝗼𝗰𝗸 𝗖𝗼𝗻𝘁𝗮𝗰𝘁 : ${blocked.length}\n𝗧𝗵𝗲 𝗯𝗼𝘁 𝗶𝘀 𝗮𝗰𝘁𝗶𝘃𝗲 𝗼𝗻 : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					hafizh.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
			case 'readall':
					if (!isOwner)return reply(mess.only.ownerB)
					var chats = await hafizh.chats.all()
                    chats.map( async ({ jid }) => {
                          await hafizh.chatRead(jid)
                    })
					teks = `\`\`\`Berhasil membaca ${chats.length} Chat !\`\`\``
					await hafizh.sendMessage(from, teks, MessageType.text, {quoted: tod})
					console.log(chats.length)
					break
				case 'blocklist': 
					teks = 'BLOCK LIST  :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					hafizh.sendMessage(from, teks.trim(), extendedText, {quoted: tod, contextInfo: {"mentionedJid": blocked}})
					break
           case 'fordward':
	   hafizh.sendMessage(from, `${body.slice(10)}`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true }})
           break
            case 'fordward1':
           hafizh.sendMessage(from, `${body.slice(11)}`, MessageType.text, {contextInfo: { forwardingScore: 2, isForwarded: true }})
           break
		   case 'hiddentag': //Remote
	const hdBody = body.slice(11)
	const txH = hdBody.split('|')[0]
	const gcH = hdBody.split('|')[1]
	var valTxt = text.replace(text.split(' ')[0], `${txH}`)
	var getGCPar = await hafizh.groupMetadata(gcH)
	var memTagHd = getGCPar['participants']
	var noArray = []
	memTagHd.map( async nomb => {
		noArray.push(nomb.id.replace('c.us', 's.whatsapp.net'))
	})
	var optMent = {
		text: valTxt,
		contextInfo: { mentionedJid: noArray }
	}
	hafizh.sendMessage(gcH, optMent, MessageType.text)
break
case 'getsticker':
			case 'gets':
				var itsme = `${stnm}`
				var split = `_*STICKER-DATABASE*_`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				namastc = body.slice(12)
				result = fs.readFileSync(`./src/sticker/${namastc}.webp`)
				hafizh.sendMessage(from, result, sticker, selepbot)
				break
			case 'stickerlist':
			case 'liststicker':
				teks = '*Sticker List :*\n\n'
				for (let awokwkwk of setiker) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${setiker.length}*`
				hafizh.sendMessage(from, teks.trim(), extendedText, { quoted: tod, contextInfo: { "mentionedJid": setiker } })
				break
			case 'addsticker':
				if (!isQuotedSticker) return reply('Reply stiker nya')
				svst = body.slice(12)
				if (!svst) return reply('Nama sticker nya apa?')
				boij = JSON.parse(JSON.stringify(tod).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await hafizh.downloadMediaMessage(boij)
				setiker.push(`${svst}`)
				fs.writeFileSync(`./src/sticker/${svst}.webp`, delb)
				fs.writeFileSync('./src/stik.json', JSON.stringify(setiker))
				hafizh.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststicker`, MessageType.text, { quoted: tod })
				break
			case 'addvn':
				if (!isQuotedAudio) return reply('Reply vnnya blokk!')
				svst = body.slice(7)
				if (!svst) return reply('Nama audionya apa su?')
				boij = JSON.parse(JSON.stringify(tod).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await hafizh.downloadMediaMessage(boij)
				audionye.push(`${svst}`)
				fs.writeFileSync(`./src/audio/${svst}.mp3`, delb)
				fs.writeFileSync('./src/audio.json', JSON.stringify(audionye))
				hafizh.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: tod })
				break
			case 'getvn':
				namastc = body.slice(7)
				buffer = fs.readFileSync(`./src/audio/${namastc}.mp3`)
				hafizh.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: tod, ptt: true })
				break
			case 'listvn':
			case 'vnlist':
				teks = '*List Vn:*\n\n'
				for (let awokwkwk of audionye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${audionye.length}*`
				hafizh.sendMessage(from, teks.trim(), extendedText, { quoted: tod, contextInfo: { "mentionedJid": audionye } })
				break
			case 'addimage':
				if (!isQuotedImage) return reply('Reply imagenya blokk!')
				svst = body.slice(10)
				if (!svst) return reply('Nama imagenya apa su?')
				boij = JSON.parse(JSON.stringify(tod).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await hafizh.downloadMediaMessage(boij)
				imagenye.push(`${svst}`)
				fs.writeFileSync(`./src/image/${svst}.jpeg`, delb)
				fs.writeFileSync('./src/image.json', JSON.stringify(imagenye))
				hafizh.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listimage`, MessageType.text, { quoted: tod })
				break
			case 'getimage':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/image/${namastc}.jpeg`)
				hafizh.sendMessage(from, buffer, image, { quoted: tod, caption: `Result From Database : ${namastc}.jpeg` })
				break
			case 'imagelist':
			case 'listimage':
				teks = '*List Image :*\n\n'
				for (let awokwkwk of imagenye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${imagenye.length}*`
				hafizh.sendMessage(from, teks.trim(), extendedText, { quoted: tod, contextInfo: { "mentionedJid": imagenye } })
				break
			case 'addvideo':
				if (!isQuotedVideo) return reply('Reply videonya blokk!')
				svst = body.slice(10)
				if (!svst) return reply('Nama videonya apa su?')
				boij = JSON.parse(JSON.stringify(tod).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
				delb = await hafizh.downloadMediaMessage(boij)
				videonye.push(`${svst}`)
				fs.writeFileSync(`./src/video/${svst}.mp4`, delb)
				fs.writeFileSync('./src/video.json', JSON.stringify(videonye))
				hafizh.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listvideo`, MessageType.text, { quoted: tod })
				break
			case 'getvideo':
				namastc = body.slice(10)
				buffer = fs.readFileSync(`./src/video/${namastc}.mp4`)
				hafizh.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: tod })
				break
			case 'listvideo':
			case 'videolist':
				teks = '*List Video :*\n\n'
				for (let awokwkwk of videonye) {
					teks += `- ${awokwkwk}\n`
				}
				teks += `\n*Total : ${videonye.length}*`
				hafizh.sendMessage(from, teks.trim(), extendedText, { quoted: tod, contextInfo: { "mentionedJid": videonye } })
				break
				case 'otakulatest':
				var itsme = `${stnm}@s.whatsapp.net`
				var split = `${creply}`
				var selepbot = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				anu = await fetchJson(`https://api.vhtear.com/otakulatest&apikey=${vhtearkey}`, { method: 'get' })
				if (anu.error) return reply(anu.error)
				teks = '=================\n\n'
				for (let i of anu.result.data) {
					teks += `Title : ${i.title}\n*Link* : ${i.link}\n*Published* : ${i.datetime}\n\n=================\n\n`
				}
				hafizh.sendMessage(from, teks.trim(), extendedText, selepbot)
				break
				
				case 'brainly':
				var itsme = `${stnm}@s.whatsapp.net`
				var split = `${creply}`
				var asuu = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				var teks = body.slice(9)
				axios.get(`https://api.vhtear.com/branly?query=${teks}&apikey=${vhtearkey}`).then((res) => {
					let hasil = ` ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏ ${res.data.result.data}`;
					hafizh.sendMessage(from, hasil, MessageType.text, asuu);
				})
				break
		case 'moddroid':
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=${tobzkey}`)
			hepi = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*publisher*: ${hepi.publisher}\n*mod info:* ${hepi.mod_info}\n*size*: ${hepi.size}\n*latest version*: ${hepi.latest_version}\n*genre*: ${hepi.genre}\n*link:* ${hepi.link}\n*download*: ${hepi.download}`
			buff = await getBuffer(hepi.image)
			hafizh.sendMessage(from, buff, image, {quoted: tod, caption: `${teks}`})
			break
			case 'tiktok':
				anu = await fetchJson (`https://docs-jojo.herokuapp.com/api/tiktok_nowm?url=${args[0]}`, {method : 'get' })
				if (anu.error) return reply(anu.error)
					teks = `*From* : ${anu.result.from}\n*Judul* : ${anu.result.title}\n*Upload* : ${anu.result.uploaded}`
					thumb = await getBuffer(anu.result.thumb)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(anu.result.url)
					hafizh.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: tod})
					break
					case 'indohot':
                   anu = await fetchJson(`https://arugaz.herokuapp.com/api/indohot`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   hasil = `*Judul* : ${anu.result.judul}\n*Genre* : ${anu.result.genre}\n *Durasi* : ${anu.result.durasi}\n *Url* : ${anu.result.url}`
				   hafizh.sendMessage(from, hasil, text, {quoted: tod})
                   break
			case 'ttp': //By NOIR
					if (args.length < 1) return reply('Isi Text?!')
					namafile = 'pel.jpeg'
					namastc = 'pel'
					teks = body.slice(5)
					reply(mess.wait)
					anu = await axios.get(`https://api.areltiyan.site/sticker_maker?text=${teks}`, {method: 'get'})
					datas = anu.data.base64.replace('data:image/png;base64,', '').toString('base64')
					fs.writeFileSync(namafile, datas, 'base64')
					exec('cwebp -q 50 ' + namafile + ' -o temp/' + namastc + '.webp', (error, stdout, stderr) => {
						      if (error) console.log(stderr)
						      result = fs.readFileSync('./temp/' + namastc + '.webp')
						      reply(result)
						hafizh.sendMessage(from, result, sticker, {quoted: tod})
						//fs.unlinkSync('./temp/ttp.png')
						//fs.unlinkSync('./temp/pel.webp')
					})
					break
					case 'setreply':
                    hafizh.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					creply = body.slice(10)
					reply(`reply berhasil di ubah menjadi : ${creply}`)
					break
					case 'setnomer':
					case 'setnomor':
                    hafizh.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					stnm = body.slice(10)
					reply(`reply berhasil di ubah menjadi : ${stnm}`)
					break
					case 'ping':
		var optionss ={
			key: {
      fromMe: false,
	  participant: `${stnm}@s.whatsapp.net`,
      id: generateMessageID()
    },
    message: { conversation: `${creply}` },
    messageTimestamp: '1608717869',
    status: 'ERROR',
	ephemeralOutOfSync: false
  }
  const processTime = (timestamp, now) => {
    // timestamp => timestamp when message was received
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}
	function format(seconds){
            function pad(s){
            return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
             var minutes = Math.floor(seconds % (60*60) / 60);
             var seconds = Math.floor(seconds % 60);

             return pad(hours) + ' Jam ' + pad(minutes) + ' Menit ' + pad(seconds) + ' Detik ';
              }

            var uptime = process.uptime();
			const timestamp = speed();
		const latensi = speed() - timestamp
		hafizh.sendMessage(from, `*Speed*: ${latensi.toFixed(4)} _MS_\n*Uptime Bot*: ${format(uptime)} `, MessageType.text, {quoted:optionss})
		break
		case 'bass':
					encmedia = JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await hafizh.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						hafizh.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: tod})
						fs.unlinkSync(ran)
					})
				break
				case 'antidelete':
				const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
				const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
				const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
				const isRevoke = dataRevoke.includes(from)
				const isCtRevoke = dataCtRevoke.data
				const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
				const argz = body.split(' ')
				if (argz.length === 1) return hafizh.sendMessage(from, `Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 628558xxxxxxx* (banlist kontak)`, MessageType.text)
				if (argz[1] == 'aktif') {
					if (isGroup) {
						if (isRevoke) return hafizh.sendMessage(from, `Antidelete telah diaktifkan di grup ini sebelumnya!`, MessageType.text)
						dataRevoke.push(from)
						fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						hafizh.sendMessage(from, `Antidelete diaktifkan di grup ini!`, MessageType.text)
					} else if (!isGroup) {
						hafizh.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctaktif*`, MessageType.text)
					}
				} else if (argz[1] == 'ctaktif') {
					if (!isGroup) {
						if (isCtRevoke) return hafizh.sendMessage(from, `Antidelete telah diaktifkan di semua kontak sebelumnya!`, MessageType.text)
						dataCtRevoke.data = true
						fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						hafizh.sendMessage(from, `Antidelete diaktifkan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						hafizh.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete aktif*`, MessageType.text)
					}
				} else if (argz[1] == 'banct') {
					if (isBanCtRevoke) return hafizh.sendMessage(from, `kontak ini telah ada di database banlist!`, MessageType.text)
					if (argz.length === 2 || argz[2].startsWith('0')) return hafizh.sendMessage(from, `Masukan nomer diawali dengan 62! contoh 62859289xxxxx`, MessageType.text)
					dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
					fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
					hafizh.sendMessage(from, `Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`, MessageType.text)
				} else if (argz[1] == 'mati') {
					if (isGroup) {
						const index = dataRevoke.indexOf(from)
						dataRevoke.splice(index, 1)
						fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
						hafizh.sendMessage(from, `Antidelete dimatikan di grup ini!`, MessageType.text)
					} else if (!isGroup) {
						hafizh.sendMessage(from, `Untuk kontak penggunaan *${prefix}antidelete ctmati*`, MessageType.text)
					}
				} else if (argz[1] == 'ctmati') {
					if (!isGroup) {
						dataCtRevoke.data = false
						fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
						hafizh.sendMessage(from, `Antidelete dimatikan disemua kontak!`, MessageType.text)
					} else if (isGroup) {
						hafizh.sendMessage(from, `Untuk grup penggunaan *${prefix}antidelete mati*`, MessageType.text)
					}
				}
				break
		case 'pinterest':
                     tels = body.slice(11)
					hafizh.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					hafizh.sendMessage(from, pok, image, { quoted: mek, caption: `*PINTEREST*\n\*Hasil Pencarian* : *${tels}*`})
					break
				case 'nulis':
					if (args.length < 1) return reply('Yang mau di tulis apaan?')
					tulis = body.slice(7)
					reply(mess.wait)
					buffer4 = await getBuffer(`https://api.vhtear.com/write?text=${tulis}&apikey=${vhtearkey}`)
					hafizh.sendMessage(from, buffer4, image, {quoted: tod, caption: 'Ketahuan guru mampus lu'})
					break
		case 'bpink':
                if (args.length < 1) return reply(`Masukan Teks\nContoh : ${prefix}Caliph Bot`)
                data = await getBuffer(`https://docs-jojo.herokuapp.com/api/blackpink?text=${body.slice(7)}`)
                hafizh.sendMessage(from, data, image, {quoted: tod, caption: body.slice(7)})
        break
        case 'hidetag':
		case 'pe':
                hafizh.updatePresence(from, Presence.composing) 
                
                teks = body.slice(9)
                group = await hafizh.groupMetadata(from);
                member = group['participants']
                jids = [];
                member.map( async adm => {
                jids.push(adm.id.replace('c.us', 's.whatsapp.net'));
                 })
                 options = {
                 text: teks,
                contextInfo: {mentionedJid: jids},
                quoted: tod
                }
              await hafizh.sendMessage(from, options, text)
               break
			   case 'randomcry':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry&apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
					case 'randomhentai':
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod})
                                        break
                                case 'loli':
                                        gatauda = body.slice(6)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod})
                                        break
                                        case 'neonime':
					hafizh.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/neonime_lastest`, {method: 'get'})
					teks = '################\n'
					for (let i of data.result) {
						teks += `*Title* : ${i.judul}\n*link* : ${i.link}\n*rilis* : ${i.rilis}\n###############\n`
					}
					reply(teks.trim())
					break 
					case 'nekonime':
           data = await fetchJson('https://waifu.pics/api/sfw/neko')
           hasil = await getBuffer(data.url)
           hafizh.sendMessage(from, hasil, image, {quoted: tod})
           break
           case 'neko':
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nekonime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, image, {quoted: tod})
					break
		case 'randomhug':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/hug&apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
			case 'nsfwneko':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'mesum'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					break
                                case 'shota':
				    try{
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomshota?apikey=BotWeA`, {method: 'get'})
						buffer = await getBuffer(res.result)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nich'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
			         }
			break
		case 'tomp3':
                	hafizh.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('❌ reply videonya um ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await hafizh.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi video ke mp3 ❌')
						bufferlkj = fs.readFileSync(ran)
						hafizh.sendMessage(from, bufferlkj, audio, { quoted: tod})
						fs.unlinkSync(ran)
					})
					break
					case 'randomanime':
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, image, {quoted: tod})
		break
		     case 'igstalk':
					if (args.length < 1) return reply('Masukan username mu!!')
					ige = body.slice(9)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/igprofile?query=${ige}&apikey=${vhtearkey}`, {method: 'get'})
					buffer7 = await getBuffer(anu.result.picture)
					capt = `User Ditemukan!!\n\n*➸ Nama :* ${anu.result.full_name}\n*➸ Username :* ${anu.result.username}\n*➸ Followers :* ${anu.result.follower}\n*➸ Mengikuti :* ${anu.result.follow}\n*➸ Jumlah Post :* ${anu.result.post_count}\n*➸ Private :* ${anu.result.is_private}\n*➸ Bio :* ${anu.result.biography}`
					hafizh.sendMessage(from, buffer7, image, {quoted: tod, caption: capt})
					break
           case 'husbu':
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, image, {quoted: tod})
			break
			case 'nsfwtrap':
                                        try{
                                                res = await fetchJson(`https://tobz-api.herokuapp.com/nsfwtrap?apikey=BotWeA`, {method: 'get'})
                                                buffer = await getBuffer(res.result)
                                                hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        } catch (e) {
                                                console.log(`*Error* :`, color(e,'red'))
                                                reply('❌ *ERROR* ❌')
                                        }
                                        break
										
                                case 'burnpaper':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}burnpaper NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=burn_paper&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih kak gambarnya...'})
                                        //await limitAdd(sender)
                                        break
                                case 'coffee':
                                        var gh = body.slice(7)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}coffee NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=coffee&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'lovepaper':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}lovepaper NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=love_paper&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'woodblock':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}woodblock NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wood_block&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'qowheart':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}qowheart NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=quote_on_wood_heart&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'mutgrass':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}mutgrass NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=message_under_the_grass&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'undergocean':
                                        var gh = body.slice(12)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}undergocean NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=underwater_ocean&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'woodenboards':
                                        var gh = body.slice(13)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}woodenboards NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wooden_boards&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'wolfmetal':
                                        var gh = body.slice(10)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}wolfmetal NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=wolf_metal&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case 'metalictglow':
                                        var gh = body.slice(14)
                                        var teks1 = gh.split("|")[0];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}metalictglow NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=metalic_text_glow&text=${teks1}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                case '8bit':
                                        var gh = body.slice(5)
                                        var teks1 = gh.split("|")[0];
                                        var teks2 = gh.split("|")[1];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}8bit Nazwa|Canss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=bit8&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih gambarnya kak...'})
                                        //await limitAdd(sender)
                                        break
                                        case 'pubglogo':
                                        var gh = body.slice(9)
                                        var teks1 = gh.split("|")[0];
                                        var teks2 = gh.split("|")[1];
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}pubglogo Nazwa|Canss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${teks1}&text2=${teks2}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih logonya kak...'})
                                       // await limitAdd(sender)
                                        break
                                case 'herrypotter':
                                case 'harrypotter':
                                        var gh = body.slice(12)
                                        if (args.length < 1) return reply('teksnya mana um\nContoh: ${prefix}harrypotter NazwaCanss')
                                        //if (!isRegister) return reply(mess.only.daftarB)
                                        //if (isLimit(sender)) return reply(ind.limitend(pusname))
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=harry_potter&text=${gh}&apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Nih kak gambarnya...'})
                                        //await limitAdd(sender)
                                        break
		case 'pinterest':
                     tels = body.slice(11)
					hafizh.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					hafizh.sendMessage(from, pok, image, { quoted: tod, caption: `*PINTEREST*\n\*Hasil Pencarian* : *${tels}*`})
					break
				case 'ocr': 
					if ((isMedia && !tod.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply(`𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 ${prefix}𝗼𝗰𝗿`)
					}
					break
				case 'stiker': 
				case 'sticker':
				case 's':
					if ((isMedia && !tod.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && tod.message.videoMessage.seconds < 11 || isQuotedVideo && tod.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`𝗬𝗮𝗵 𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮 𝘀𝗮𝘆𝗮𝗻𝗴`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						const media = await hafizh.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('𝗬𝗮𝗵 𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮 𝘀𝗮𝘆𝗮𝗻𝗴')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								buff = fs.readFileSync(ranw)
								hafizh.sendMessage(from, buff, sticker, {quoted: tod})
							})
						})					
					} else {
						reply(`𝗸𝗶𝗿𝗶𝗺 𝗴𝗮𝗺𝗯𝗮𝗿 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗮𝗽𝘁𝗶𝗼𝗻 ${prefix}𝘀𝘁𝗶𝗰𝗸𝗲𝗿 𝗮𝘁𝗮𝘂 𝗿𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝗴𝗮𝗺𝗯𝗮𝗿`)
					}
					break
				case 'gtts':	
				case 'tts':
					if (args.length < 1) return hafizh.sendMessage(from, '𝗱𝗶𝗽𝗲𝗿𝗹𝘂𝗸𝗮𝗻 𝗸𝗼𝗱𝗲 𝗯𝗮𝗵𝗮𝘀𝗮!', text, {quoted: tod})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return hafizh.sendMessage(from, '𝗧𝗲𝗸𝘀 𝗺𝗮𝗻𝗮 𝘁𝗲𝗸𝘀?', text, {quoted: tod})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('𝘁𝗲𝗸𝘀𝗻𝘆𝗮 𝗷𝗮𝗻𝗴𝗮𝗻 𝗸𝗲𝗽𝗮𝗻𝗷𝗮𝗻𝗴𝗮𝗻')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('𝗬𝗮𝗵 𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘆𝗮 𝘀𝗮𝘆𝗮𝗻𝗴')
							hafizh.sendMessage(from, buff, audio, {quoted: tod, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'setprefix':
					if (args.length < 1) return
					prefix = args[0]
					reply(`𝗣𝗿𝗲𝗳𝗶𝘅 𝗯𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗱𝗶 𝘂𝗯𝗮𝗵 𝗺𝗲𝗻𝗷𝗮𝗱𝗶 : ${prefix}`)
					break 	
			       case 'pussy':
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://nekos.life/api/v2/img/pussy', {method: 'get'})
					if (anu.error) return reply(anu.error)

					exec(`wget ${anu.url} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buffer = fs.readFileSync(rano)
						hafizh.sendMessage(from, buffer, sticker, {quoted: tod})
						fs.unlinkSync(rano)
					})
					break
				case 'meme': 
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: '.......'})
					break
					case 'playstore':
					kuji = body.slice(11)
					reply(mess.wait)
					anu = await getBuffer(`https://api.vhtear.com/playstore?query={kuji}&apikey=${vhtearkey}`)
					capty = `*➸ title :* ${anu.title}\n*➸ app_id :* ${anu.app_id}\n*➸ description :* ${anu.description}\n*➸ developer_id :* ${anu.developer_id}\n*➸ developer :* ${anu.developer}\n*➸ score :* ${anu.score}\n*➸ full_price :* ${anu.full_price}\n*➸ price :* ${anu.price}\n*➸ free :* ${anu.free}`
					hafizh.sendMessage(from, anu, image, {quoted: tod, caption: capty})
					break
				case 'memeindo': 
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: '.......'})
					break
								                case 'ssphone':
                buff = await getBuffer(`https://api.vhtear.com/ssweb?link=${body.slice(9)}&type=phone&apikey=${vhtearkey}`)
                
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				break   
				                case 'sspc':
                buff = await getBuffer(`https://api.vhtear.com/ssweb?link=${body.slice(6)}&type=pc&apikey=${vhtearkey}`)
                
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				break     
			         case 'puisi':
                buff = await getBuffer(`https://api.vhtear.com/puisi_image&apikey=${vhtearkey}`)
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				break
		case 'kapankah':
					const kapan1 = body.slice(1)
					const kapan2 = [
					'Hari ini',

					'Mungkin besok',

					'1 Minggu lagi',

					'Masih lama',

					'3 Bulan lagi',

					'7 Bulan lagi',

					'3 Tahun lagi',

					'4 Bulan lagi',

					'2 Bulan lagi',

					'1 Tahun lagi',

					'1 Bulan lagi',

					'Coba ulangi',

					]

					const kpnkh = kapan2[Math.floor(Math.random() * (kapan2.length))]

					const jawab1 = `Pertanyaan : *${kapan1}*\n\nJawaban: ${kpnkh}`

					hafizh.sendMessage(from, jawab1, text, {quoted: tod})

					break
			case 'apakah':
					const tanya = body.slice(1)
					const apa = [
					'Ya',

					'Mungkin',

					'Tidak',

					'Coba Ulangi',

					]

					const apkh = apa[Math.floor(Math.random() * (apa.length))]

					const jawab = `Pertanyaan : *${tanya}*\n\nJawaban: ${apkh}`

					hafizh.sendMessage(from, jawab, text, {quoted: tod})

					break
			    case 'darkjoke':
                                data = await fetchJson(`https://api.zeks.xyz/api/darkjokes?apikey=${zekskey}`)
                                dark = data.result
                                thumb = await getBuffer(dark)
                                hafizh.sendMessage(from, thumb, image, {quoted: tod})
                                break
                case 'harta':
                buff = await getBuffer(`https://api.vhtear.com/hartatahta?text=${body.slice(7)}&apikey=${vhtearkey}`)
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				break
                case 'lovetext':
                buff = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${body.slice(10)}&apikey=${vhtearkey}`)
				hafizh.sendMessage(from, buff, image, {quoted: tod})
				break
				
			case 'loli': 
				    try {
						res = await fetchJson(`https://api.lolis.life/random`, {method: 'get'})
						buffer = await getBuffer(res.url)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'ingat! Cintai lolimu'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('𝗘𝗥𝗥𝗢𝗥')
					}
					break
				case 'nsfwloli': 
				    try {
						if (!isNsfw) return reply('𝗠𝗮𝗮𝗳 𝗳𝗶𝘁𝘂𝗿 𝗶𝗻𝗶 𝗯𝗲𝗹𝘂𝗺 𝗱𝗶 𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻/𝗸𝗲𝘀𝗮𝗹𝗮𝗵𝗮𝗻 𝘀𝗲𝗿𝘃𝗲𝗿𝗻𝘆𝗮')
						res = await fetchJson(`https://api.lolis.life/random?nsfw=true`, {method: 'get'})
						buffer = await getBuffer(res.url)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: 'Jangan jadiin bahan buat comli'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('𝗘𝗥𝗥𝗢𝗥')
					}
					break
				
				case 'holoh': 
					if (args.length < 1) return reply('𝗸𝗮𝘀𝗶𝗵 𝘁𝗲𝗸𝘀 𝗹𝗮𝗵!!!')
					anu = await fetchJson(`https://shirayuki-api.herokuapp.com/api/v1/holoh?kata=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'ytmp3':
					if (args.length < 1) return reply('linknya dong om')
					console.log('1')
					//if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Kek itu bukan')
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3?url=${args[0]}&apikey=apivinz`, {method: 'get'})
					console.log('1')
					if (anu.status == false) return reply(anu.message)
					teks = `*YTMP3* [ @${tod.participant.replace('@s.whatsapp.net', '')} ]\n*Title* : ${anu.result.title}`
					thumb = await getBuffer('https://play-lh.googleusercontent.com/Pqp5U38hP4c_iJpMHgaCkPG9Qw8DWFVGmqIT4d0QzcQ-S-ihFuMgxxvdy1XgwbxZIbw')
					console.log('1')
					hafizh.sendMessage(from, thumb, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": tod.participant}})
					console.log('1')
					buffer = await getBuffer(anu.result.url_audio)
					hafizh.sendMessage(from, buffer, MessageType.audio, {mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: tod})
					break
					
        case 'ytmp4':
					if (args.length < 1) return reply('linknya dong om')
					console.log('1')
					//if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Kek itu bukan')
					anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4?url=${args[0]}&apikey=apivinz`, {method: 'get'})
					console.log('1')
					if (anu.status == false) return reply(anu.message)
					teks = `*YTMP4* [ @${tod.participant.replace('@s.whatsapp.net', '')} ]\n*Title* : ${anu.result.title}`
					thumb = await getBuffer('https://play-lh.googleusercontent.com/Pqp5U38hP4c_iJpMHgaCkPG9Qw8DWFVGmqIT4d0QzcQ-S-ihFuMgxxvdy1XgwbxZIbw')
					console.log('1')
					hafizh.sendMessage(from, thumb, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": tod.participant}})
					console.log('1')
					buffer = await getBuffer(anu.result.url_video)
					hafizh.sendMessage(from, buffer, MessageType.video, {mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: tod})
					break
		case 'nekohentai':
				buff = await getBuffer(Host + "/nekohentai&apikey=" + PremiumKey)
				/*const datas = await anu.json()
				const asu = datas.result
				let fox = "*Neko Hentai*\n"
				for (var a = 0; a < asu.length; a++) {
					fox += "\n\n*Title :*" + asu[a].title
					fox += "*Detail :*\n" + asu[a].detail
					fox += "*Link :*\n" + asu[a].url
				}*/
				hafizh.sendMessage(from, buff, image, {quoted: tod, caption: '.......'})
				break
			case 'joox':
					data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=${tobzkey}`, {method: 'get'})
					teks = '=================\n'
					const joox = data.result
						teks += `*Judul:* ${joox.title}\n*Album:* ${joox.album}\n*dipublikasian pada*: ${joox.dipublikasi}\n*Download sendiri:* ${joox.mp3}\n=================\n`
					thumb = await getBuffer(joox.thumb)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(joox.mp3)
					hafizh.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${joox.title}.mp3`, quoted: tod})
					break
			case 'play':
					data = await fetchJson(`https://api.vhtear.com/ytmp3?query=${body.slice(6)}&apikey=${vhtearkey}`, {method: 'get'})
					teks = '=================\n'
					const play = data.result
						teks += `*Judul:* ${play.title}\n*Durasi:* ${play.duration}\n*size*: ${play.size}\n*Download sendiri:* ${play.mp3}\n=================\n`
					thumb = await getBuffer(play.image)
					hafizh.sendMessage(from, thumb, image, {quoted: tod, caption: teks})
					buffer = await getBuffer(play.mp3)
					hafizh.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${play.title}.mp3`, quoted: tod, ptt:true})
					break
				case 'tiktok': 
					if (args.length < 1) return reply('𝘂𝗿𝗹𝗻𝘆𝗮 𝗺𝗮𝗻𝗮?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/tiktok?url=${args[0]}&apiKey=${apikey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					hafizh.sendMessage(from, buffer, video, {quoted: tod})
					break
				case 'tiktokstalk':
					try {
						if (args.length < 1) return hafizh.sendMessage(from, '𝘂𝘀𝗲𝗿𝗻𝗮𝗺𝗲 𝗺𝗮𝗻𝗮?', text, {quoted: tod})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('[𝗘𝗥𝗥𝗢𝗥] 𝗸𝗲𝗺𝘂𝗻𝗴𝗸𝗶𝗻𝗮𝗻 𝘂𝘀𝗲𝗿𝗻𝗮𝗺𝗲 𝘁𝗶𝗱𝗮𝗸 𝘃𝗮𝗹𝗶𝗱')
					}
					break
				case 'tagall':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						rchoice = Math.floor(Math.random() * list_emoji.length)
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
				case 'clearall':
					if (!isOwner) return reply('𝙡𝙪 𝙨𝙞𝙖𝙥𝙖?')
					anu = await hafizh.chats.all()
					hafizh.setMaxListeners(25)
					for (let _ of anu) {
						hafizh.deleteChat(_.jid)
					}
					reply('𝗰𝗹𝗲𝗮𝗿 𝗮𝗹𝗹 𝘀𝘂𝗸𝘀𝗲𝘀 𝘆𝗮𝗵 :)')
					break
			       case 'block':
					hafizh.blockUser (`${body.slice(7)}@c.us`, "add")
					hafizh.sendMessage(from, `𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗗𝗶𝘁𝗲𝗿𝗶𝗺𝗮, 𝗺𝗲𝗺𝗯𝗹𝗼𝗸𝗶𝗿 ${body.slice(7)}@c.us`, text)
					break
                    case 'unblock':
				    hafizh.blockUser (`${body.slice(9)}@c.us`, "remove")
					hafizh.sendMessage(from, `𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝗗𝗶𝘁𝗲𝗿𝗶𝗺𝗮, 𝗺𝗲𝗺𝗯𝘂𝗸𝗮 ${body.slice(9)}@c.us`, text)
				break
				case 'leave': 
				//if (!isGroup) return reply(mess.only.group)//if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				await hafizh.hafizh.leaveGroup(from, '𝗕𝘆𝗲𝗲', groupId)
	
                    break
				case 'bc': 
					if (args.length < 1) return reply('.......')
					anu = await hafizh.chats.all()
					if (isMedia && !tod.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						buff = await hafizh.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							hafizh.sendMessage(_.jid, buff, image, {caption: `❮ 𝘽𝙊𝙏 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`})
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `❮ 𝘽𝙊𝙏 𝘽𝙍𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`)
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					}
					break
		case 'igstalk':
                     hmm = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/igs?u=${body.slice(9)}`)
                     buffer = await getBuffer(hmm.data.profilehd)
                     hasil = `Fullname : ${hmm.data.fullname}\npengikut : ${hmm.data.follower}\nMengikuti : ${hmm.data.following}\nPrivate : ${hmm.data.private}\nVerified : ${hmm.data.verified}\nbio : ${hmm.data.bio}`
                    hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: hasil})
                    break
		case 'setprofile':
		case 'setprofil':
				hafizh.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await hafizh.downloadAndSaveMediaMessage(enmedia)
					await hafizh.updateProfilePicture(botNumber, media)
					reply('Sudah bos😘')
					break
			       	case 'setpp': 
                       media = await hafizh.downloadAndSaveMediaMessage(tod)
                         await hafizh.updateProfilePicture (from, media)
                        reply('𝗦𝘂𝗸𝘀𝗲𝘀 𝗺𝗲𝗻𝗴𝗴𝗮𝗻𝘁𝗶 𝗶𝗰𝗼𝗻 𝗚𝗿𝘂𝗽')
                                        break						
				case 'add':
					if (args.length < 1) return reply('𝗽𝗮𝘀𝘁𝗶 𝘆𝗮𝗻𝗴 𝗺𝗮𝘂 𝗱𝗶 𝗮𝗱𝗱 𝗮𝗻𝗮𝗸 𝗽𝘂𝗻𝗴𝘂𝘁?')
					if (args[0].startsWith('08')) return reply('𝗚𝘂𝗻𝗮𝗸𝗮𝗻 𝗸𝗼𝗱𝗲 𝗻𝗲𝗴𝗮𝗿𝗮')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						hafizh.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('𝗴𝗮𝗴𝗮𝗹 𝗺𝗲𝗻𝗮𝗺𝗯𝗮𝗵𝗸𝗮𝗻, 𝗺𝘂𝗻𝗴𝗸𝗶𝗻 𝗸𝗮𝗿𝗲𝗻𝗮 𝗱𝗶 𝗽𝗿𝗶𝘃𝗮𝘁𝗲')
					}
					break
					case 'grup':
					case 'group':
					if (args[0] === 'open') {
					    reply(`𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗠𝗲𝗺𝗯𝘂𝗸𝗮 𝗚𝗿𝗼𝘂𝗽`)
						hafizh.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'close') {
						reply(`𝗕𝗲𝗿𝗵𝗮𝘀𝗶𝗹 𝗠𝗲𝗻𝘂𝘁𝘂𝗽 𝗚𝗿𝗼𝘂𝗽`)
						hafizh.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
                    
            case 'admin':
            case 'owner':
            case 'creator':
                  hafizh.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: tod})
       hafizh.sendMessage(from, 'wa.me/+6285710912951',MessageType.text, { quoted: tod} )
           break    
           case 'demote':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝘆𝗮𝗵𝗵 𝗷𝗮𝗯𝗮𝘁𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝗸𝗮𝗺𝘂 𝘀𝘂𝗱𝗮𝗵 𝗱𝗶 𝗰𝗼𝗽𝗼𝘁 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝘆𝗮𝗵𝗵 @${mentioned[0].split('@')[0]} 𝗷𝗮𝗯𝗮𝘁𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝗸𝗮𝗺𝘂 𝘀𝘂𝗱𝗮𝗵 𝗱𝗶 𝗰𝗼𝗽𝗼𝘁`, mentioned, true)
						hafizh.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `DONE :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`DONE @${mentioned[0].split('@')[0]}`, mentioned, true)
						hafizh.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Otw.... :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						hafizh.groupRemove(from, mentioned)
					} else {
						mentions(`Otw... @${mentioned[0].split('@')[0]} 𝘀𝗮𝘆𝗮𝗻𝗴`, mentioned, true)
						hafizh.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					teks = `𝗟𝗶𝘀𝘁 𝗮𝗱𝗺𝗶𝗻 𝗼𝗳 𝗴𝗿𝗼𝘂𝗽 *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
					if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿!')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await hafizh.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('𝗬𝗮𝗵 𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘀𝗮𝘆𝗮𝗻𝗴')
						buffer = fs.readFileSync(ran)
						hafizh.sendMessage(from, buffer, image, {quoted: tod, caption: '𝗡𝗶𝗵 𝗦𝗮𝘆𝗮𝗻𝗴'})
						fs.unlinkSync(ran)
					})
					break
				case 'welcome':
					if (args.length < 1) return reply('𝗜𝘆𝗮 𝘀𝗮𝘆𝗮𝗻𝗴')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('𝘀𝘂𝗱𝗮𝗵 𝗮𝗸𝘁𝗶𝗳!!!')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘄𝗲𝗹𝗰𝗼𝗺𝗲/𝗹𝗲𝗳𝘁 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘄𝗲𝗹𝗰𝗼𝗺𝗲/𝗹𝗲𝗳𝘁 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else {
						reply('𝗸𝗲𝘁𝗶𝗸 𝗽𝗲𝗿𝗶𝗻𝘁𝗮𝗵 𝟭 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻, 𝟬 𝘂𝗻𝘁𝘂𝗸 𝗺𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻\n𝗰𝗼𝗻𝘁𝗼𝗵: ${prefix}𝘄𝗲𝗹𝗰𝗼𝗺𝗲 𝟭')
					}
				case 'clone':
					if (args.length < 1) return reply('𝘁𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗺𝗮𝘂 𝗱𝗶 𝗰𝗹𝗼𝗻𝗲!!!')
					if (tod.message.extendedTextMessage === undefined || tod.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = tod.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await hafizh.getProfilePicture(id)
						buffer = await getBuffer(pp)
						hafizh.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('𝗬𝗮𝗵 𝗴𝗮𝗴𝗮𝗹, 𝘂𝗹𝗮𝗻𝗴𝗶 𝗹𝗮𝗴𝗶 𝘀𝗮𝘆𝗮𝗻𝗴')
					}
					break
				case 'wait':
					if ((isMedia && !tod.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(tod).replace('quotedM','m')).message.extendedTextMessage.contextInfo : tod
						media = await hafizh.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							hafizh.sendMessage(from, res.video, video, {quoted: tod, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗮𝗽??𝗶𝗼𝗻 𝗼𝗰𝗿')
					}
					break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

                   

