list
	GET categories : () -> array -> /products/categories GET
	GET item by id: (id) -> object -> /products/item
	POST Record History (uid, pid) -> status -> /products/record

myAccount
	POST login: (email, passwd) -> status -> /account/login POST
	POST Register: (email, passwd, Full Name) -> status -> /account/register
	POST Forget Passwd: (email) -> status -> /account/password
	GET myCart: (id) -> array -> /account/cart
	GET myOrders: (id) -> array -> /account/orders
	GET browsHistory: (id) -> array -> /account/history

Admin
	GET verify: (id) -> status (deny/approve) -> /admin/verify
	GET userList: () -> array -> /admin/users
	GET productsList: () -> array -> /admin/products
	POST updateProduct: (id, object) -> status -> /admin/product/update
	POST updateUser: 
	POST newProduct
	POST newUser
	POST delProduct
	POST delUser



