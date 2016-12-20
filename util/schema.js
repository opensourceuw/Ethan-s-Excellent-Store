import mongoose, {Schema} from 'mongoose';
var deepPopulate = require('mongoose-deep-populate')(mongoose);

const UserSchema = new Schema ({
	name: String, email: String,
	passwd: String, profile: Object,
	admin: Boolean, lists: Array
});

const ProductSchema = new Schema ({
	name: String, price: String,
	seller: {type: Schema.Types.ObjectId, ref: "user"},
	description: String, status: String
});

const HistorySchema = new Schema ({
	product: {type: Schema.Types.ObjectId, ref: "product"},
	user: {type: Schema.Types.ObjectId, ref: "user"},
	time: {type: Date, default: Date.now}
});

const ShoppingListSchema = new Schema ({
	name: String, products: Array,
	user: {type: Schema.Types.ObjectId, ref: "user"},
});

const OrderSchema = new Schema ({
	product: Array, user: {type: Schema.Types.ObjectId, ref: "user"},
	track_id: String, time: {type: Date, default: Date.now}
});

UserSchema.plugin(deepPopulate);
ProductSchema.plugin(deepPopulate);
HistorySchema.plugin(deepPopulate);
ShoppingListSchema.plugin(deepPopulate);
OrderSchema.plugin(deepPopulate);

const User = mongoose.model('user', CategorySchema);
const Product = mongoose.model('product', AuthorSchema);
const History = mongoose.model('history', PostSchema);
const ShoppingList = mongoose.model('lists', ShoppingListSchema);
const Order = mongoose.model('order', PageSchema);

// export module
export {User, Product, History, ShoppingList, Order};
