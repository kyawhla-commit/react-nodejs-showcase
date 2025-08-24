const jwt = require("jsonwebtoken");
const secret = "some secret";

const user = { id: 1, name: "Alice" };
const token = jwt.sign(user, secret);

// console.log(token);

try {
	console.log(
		jwt.verify(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNzU2MDE4NDE3fQ.W0n6N3TnLoBQHb9anDSDRDiqjH084Q40QL9h7Isf8",
			secret
		)
	);
} catch (e) {
	console.log(e.message);
}
