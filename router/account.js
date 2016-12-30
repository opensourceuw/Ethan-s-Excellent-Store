import express from 'express';
let router = express.Router();

import mongoose from 'mongoose';
import {User} from '../util/schema';
import handleError from '../util/error';

// Login
router.post ("/login", (req, res) => {
	let { email, passwd} = req.body;

	User.findOne({email: email},(err, doc) =>{
		if (err) handleError (err, req, res);
		else if (doc == null) {
			console.error("User not found");
			res.send("User not found");
		} else if (doc.passwd != passwd){
			console.error("user name and password did not match");
			res.send("user name and password did not match");			
		} else {
			doc.save((err) => {
				if (err) handleError (err, req, res);
				else res.send(doc._id);
			})
		}
	});
});


// Register
router.post ("/register", (req, res) => {
	let {name, email, passwd, profile, 
			admin, lists} = req.body;

	const User = new User ({
		name: name, email: email, passwd: passwd,
		profile: JSON.parse(profile), admin: admin, 
		lists: JSON.parse(lists)
	});

	User.save (err => {
		if (err) handleError (err, req, res);
		else res.send ("success ... ");
	});
});

//Forget Passwd
router.post("/password", (req, res) => {
	let {email} = req.body;

	User.findOne({email: email},(err, doc) =>{
		if (err) handleError (err, req, res);
		else if (doc == null) {
			console.error("User not found");
			res.send("User not found");
		} else {
			doc.save((err) => {
				if (err) handleError (err, req, res);
				else {
					doc.passwd = "123456";
					res.send(doc._id);
				};
			})
		}
	});
});




