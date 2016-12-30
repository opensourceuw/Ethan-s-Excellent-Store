import express from 'express';
let router = express.Router();

import mongoose from 'mongoose';
import {User} from '../util/schema';
import handleError from '../util/error';

import md5 from 'md5';

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

	const  newUser = new User();

	newUser.name = name;
	newUser.email = email;
	newUser.passwd = passwd;
	newUser.profile = JSON.parse(profile);
	newUser.admin = admin;
	newUser.lists = JSON.parse(lists);

	User.findOne({email: email}, (err,doc) => {
		if (err) handleError (err, req, res);
		if (doc != null) {
			console.error("User email already exist");
			res.send("User email already exist");
		} else {
			newUser.save((err) => {
				if(err) handleError (err, req, res);
				else {
					console.log("successfully registered");
					res.send ("success ... ");
				}
			});
		}
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
					doc.passwd = md5("123456");
					doc.save(err => {
						if (err) handleError(err, req, res);
						else res.send("password has been set as default")
					});
				};
			})
		}
	});
});



export default router;
