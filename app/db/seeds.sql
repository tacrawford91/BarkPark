INSERT INTO Users (user_name, password, email, dog_name, dog_location) VALUES ("userA", "passwordA", "emailA@email.com", "Fluffy");
INSERT INTO Users (user_name, password, email, dog_name, dog_location) VALUES ("userB", "passwordB", "emailB@email.com", "Spike");
INSERT INTO Users (user_name, password, email, dog_name, dog_location) VALUES ("userC", "passwordC", "emailC@email.com", "Fido");

INSERT INTO Parks (park_name, address_lat, address_long) VALUES ("Wiggly Field", 41.930533, -87.653434);
INSERT INTO Parks (park_name, address_lat, address_long) VALUES ("Belmont Dog Beach", 41.945151, -87.640307);
INSERT INTO Parks (park_name, address_lat, address_long) VALUES ("Hamlin Dog Park", 41.936824, -87.679481);

// for Postman
{
	"park_name": "Wiggly Field",
	"address_lat": "41.930533",
	"address_long": "-87.653434",
	"dog_number": 4
}

{
	"park_name": "Belmont Dog Beach",
	"address_lat": "41.945151",
	"address_long": "-87.640307",
	"dog_number": 0
} 

{
	"park_name": "Hamlin Dog Park",
	"address_lat": "41.936824",
	"address_long": "-87.679481",
	"dog_number": 2
}