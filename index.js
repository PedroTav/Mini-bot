const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const sql = require('sqlite');



sql.open('./score.sqlite');

client.on('ready',() => {
	console.log('I\'m Online\nl\'m Online');
});


var prefix = "!"

client.on('message', message => {
	if (message.author.bot) return;
	if (message.channel.type !== 'text') return;
	
	if (message.channel.id === "236049686820159488") {
		
		for (let attachment of message.attachments.values()){
			if((/\.(gif|jpe?g|tiff|png)$/i).test(attachment.url)) {
				client.channels.get("236042005929656320").sendFile(attachment.url);
			}
		}
		
		var match = message.content.match(/(?:[^:/?#\s]+:\/\/)?[^/?#\s]+\/(?:[^?#\s]*\.(?:jpe?g|gif|png))(?:\?[^#\s]*)?(?:#.*)?/ig);
		if (!match) return;
		for (let url of match) {
			client.channels.get("236042005929656320").sendFile(url);
		}
	}
	
	if (!message.content.startsWith(prefix)) return;
	
		
	if (message.content.startsWith(prefix + 'addpoints')) {
		console.log(message.mentions.users);
        var user = message.mentions.users.first();
        var number = 0;
        var index = message.content.lastIndexOf(" ");
        if (index !== -1) {
            number = Number(message.content.substring(index + 1));
        }
		let myRole1 = message.guild.roles.find("name","Admin");
		let myRole2 = message.guild.roles.find("name","Dip 'N Forget");
		let myRole3 = message.guild.roles.find("name","Ebay Propainted");
		let myRole4 = message.guild.roles.find("name","C+C Plz");
		let myRole5 = message.guild.roles.find("name","JALMM");
		let myRole6 = message.guild.roles.find("name","Bub For The Bub Glub");
		
		if(!message.member.roles.has(myRole1.id)) {
			message.reply(`:japanese_goblin:  Haha! Being sneaky are we? :japanese_goblin: `);
			return;
		}
		
		let member = message.guild.member(user);
		
        sql.get(`SELECT * FROM scores WHERE userId ='${user.id}'`).then(row => {
            if (!row) {
                sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [user.id, number, 0]);
            } else {
				switch(row.level) {
					case 0: 
						if(row.points + number >= 5){
							row.level++;
							sql.run(`UPDATE scores SET points = ${row.points + number}, level = ${row.level} WHERE userId = ${user.id}`);
							message.channel.send(user + ` :confetti_ball: Congratulations you reached **Dip 'N Forget** rank! :confetti_ball:`);
							member.removeRole(myRole1).catch(console.error);
							member.addRole(myRole2).catch(console.error);
						} else sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
					case 1:
						if(row.points + number >= 10){
							row.level++;
							sql.run(`UPDATE scores SET points = ${row.points + number}, level = ${row.level} WHERE userId = ${user.id}`);
							message.channel.send(user + ` :confetti_ball: Congratulations you reached **Ebay Pro-Painted** rank! :confetti_ball:`);
							member.removeRole(myRole2).catch(console.error);
							member.addRole(myRole3).catch(console.error);
						} else sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
					case 2:
						if(row.points + number >= 20){
							row.level++;
							sql.run(`UPDATE scores SET points = ${row.points + number}, level = ${row.level} WHERE userId = ${user.id}`);
							message.channel.send(user + ` :confetti_ball: Congratulations you reached **C+C Plz** rank! :confetti_ball:`);
							member.removeRole(myRole3).catch(console.error);
							member.addRole(myRole4).catch(console.error);
						} else sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
					case 3:
						if(row.points + number >= 40){
							row.level++;
							sql.run(`UPDATE scores SET points = ${row.points + number}, level = ${row.level} WHERE userId = ${user.id}`);
							message.channel.send(user + ` :confetti_ball: Congratulations you reached **JALMM** rank! :confetti_ball:`);
							member.removeRole(myRole4).catch(console.error);
							member.addRole(myRole5).catch(console.error);
						} else sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
					case 4:
						if(row.points + number >= 70){
							row.level++;
							sql.run(`UPDATE scores SET points = ${row.points + number}, level = ${row.level} WHERE userId = ${user.id}`);
							message.channel.send(user + ` :confetti_ball: Congratulations you reached **Bub For The Bub Glub** rank! :confetti_ball:`);
							member.removeRole(myRole5).catch(console.error);
							member.addRole(myRole6).catch(console.error);
						} else sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
					default:
						sql.run(`UPDATE scores SET points = ${row.points + number} WHERE userId = ${user.id}`);	
						break;
				}
            }  
        }).catch(() => {
            console.error;
            sql.run('CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)').then(() => {
                sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [user.id, number, 0]);
            });
        });
       
    } else
		
	if (message.content.startsWith(prefix + 'resetpoints')) {
		var user = message.mentions.users.first();
        var number = 0;
	
		
		let myRole1 = message.guild.roles.find("name","Admin");
		
		if(!message.member.roles.has(myRole1.id)) {
			message.reply(`:japanese_goblin:  Haha! Being sneaky are we? :japanese_goblin: `);
			return;
		}
		
		let member = message.guild.member(user);
		
		let myRole2 = message.guild.roles.find("name","Dip 'N Forget");
		let myRole3 = message.guild.roles.find("name","Ebay Propainted");
		let myRole4 = message.guild.roles.find("name","C+C Plz");
		let myRole5 = message.guild.roles.find("name","JALMM");
		let myRole6 = message.guild.roles.find("name","Bub For The Bub Glub");
		
		if(member.roles.has(myRole2.id)) {
			member.removeRole(myRole2).catch(console.error);
		}
		
		if(member.roles.has(myRole3.id)) {
			member.removeRole(myRole3).catch(console.error);
		}
		
		if(member.roles.has(myRole4.id)) {
			member.removeRole(myRole4).catch(console.error);
		}
		
		if(member.roles.has(myRole5.id)) {
			member.removeRole(myRole5).catch(console.error);
		}
		
		if(member.roles.has(myRole6.id)) {
			member.removeRole(myRole6).catch(console.error);
		}
		
		sql.get(`SELECT * FROM scores WHERE userId ='${user.id}'`).then(row => {
            if (!row) {
                sql.run('INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)', [user.id, number, 0]);
            } else {sql.run(`UPDATE scores SET points = ${number}, level = ${number} WHERE userId = ${user.id}`);
			console.log("points-reset!");
			}
		});
		
	} else
	
	if (message.content.startsWith(prefix + 'points')) {
		
		sql.get(`SELECT * FROM scores WHERE userId ='${message.author.id}'`).then(row => {
			if (!row) return message.reply('Your current points are 0');
			message.reply(`Your current points are ${row.points}`);
		});
	} else 
		
	if (message.content.startsWith(prefix + "makers")) {
		
		message.reply(`here's a list of all manufacturers: https://www.reddit.com/r/minipainting/wiki/manufacturers`);
	} else
		
	if (message.content.startsWith(prefix + "tutorials")) {
		
		message.reply(`here's a compilation of useful guides: https://www.reddit.com/r/minipainting/wiki/tutorials`);
	} else
		
	if (message.content.startsWith(prefix + "checkpoints")) {
	
		var user = message.mentions.users.first();
		
		sql.get(`SELECT * FROM scores WHERE userId ='${user.id}'`).then(row => {
            if (!row) {
                message.reply(`User ` + user + ` does not exist.`);
            } else {
				message.reply(`User ` + user + ` has ` + row.points + ` points!`);
			}
		});
	
	} else
		
	if (message.content.startsWith(prefix + "help")) {
		
		message.reply(`**COMMAND LIST**\n
		"!points":	You can see you're current experience points!
		"!checkponts [name]":	You can check someones points!
		"!makers":	You can find all mini related manufactores!
		"!tutorials":	You can find useful guide lists!`);
	
	} 
		
	
});

client.login(settings.token);