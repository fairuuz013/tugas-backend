tugas day 3 ges
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Waktu dibuat otomatis
nomer 1 
{
  "status": true,
  "jumlah": 3,
  "data": [
    {
      "id": 1,
      "nama": "odoriko",
      "singer": "vaundy",
      "release": 2023
    },
    {
      "id": 2,
      "nama": "supernatural",
      "singer": "new jeans",
      "release": 2024
    },
    {
      "id": 1,
      "nama": "birds of a feather",
      "singer": "billie eilish",
      "realease": 2024
    }
  ]
}



-hasil nomer 2

{
  "success": true,
  "data": {
    "id": 4,
    "nama": "ditto",
    "singer": "newjeans",
    "release": 2023
  }
}


-  hasil hasil nomer 3
{
  "success": true,
  "data": {
    "id": 2,
    "nama": "supernatural",
    "singer": "new jeans",
    "release": 2024
  }
}

- hasil nomer 4
{
    "success": true,
    "messge": "lagu baru telah di tambah",
    "data": {
        "id": 4,
        "nama": "ditto",
        "singer": "newjeans",
        "release": 2023
    }
}



- hasil nomer 5

{
    "success": true,
    "message": "berasil update lagu",
    "data": {
        "id": 2,
        "nama": "omg",
        "singer": "newjeans",
        "release": 2022
    }
}



- hasil nomer 6

{
    "success": true,
    "message": "lagu berhasil dihapus",
    "data": {
        "id": 3,
        "nama": "birds of a feather",
        "singer": "billieeilish",
        "release": 2024
    }
}


==================================================





tugas day 7 

 id |                name                 | category |    price    | is_active 
----+-------------------------------------+----------+-------------+-----------
  1 | laptop HP 255 G10                   | business |  5939000.00 | t
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  4 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t
(5 rows)

toko_laptop_db=# 



toko_laptop_db=# select * from laptop where price > 5000000;
 id |                name                 | category |    price    | is_active 
----+-------------------------------------+----------+-------------+-----------
  1 | laptop HP 255 G10                   | business |  5939000.00 | t
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  4 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t
(5 rows)



toko_laptop_db=# select * from laptop where category = 'business';
 id |                name                 | category |   price    | is_active 
----+-------------------------------------+----------+------------+-----------
  1 | laptop HP 255 G10                   | business | 5939000.00 | t
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business | 6599000.00 | t
(2 rows)

toko_laptop_db=# 





toko_laptop_db=# update laptop set name = 'Lenovo LOQ 1JID i5 12450HX', price = 12999000 where id = 4;
UPDATE 1
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active 
----+-------------------------------------+----------+-------------+-----------
  1 | laptop HP 255 G10                   | business |  5939000.00 | t
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t
(5 rows)

toko_laptop_db=# 



toko_laptop_db=# delete from laptop where id = 1;
DELETE 1
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active 
----+-------------------------------------+----------+-------------+-----------
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t
(4 rows)

toko_laptop_db=# 






jawaaaaaban pg 

1. b
2. c
3. c
4. c
5. b
6. a 
7. a
8. c 
9. c
10. b 








































