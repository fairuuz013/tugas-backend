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








/// TUGAS DAY 8 



/// 1

toko_laptop_db=# create table categories ( id serial primary key, name text not null unique);
CREATE TABLE
toko_laptop_db=# alter table laptop
toko_laptop_db-# add category_id int;
ALTER TABLE
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active | category_id 
----+-------------------------------------+----------+-------------+-----------+-------------
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t         |            
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t         |            
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t         |            
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t         |            
(4 rows)





// 2

toko_laptop_db=# insert into categories (name)
toko_laptop_db-# values ('gaming'), ('business');
INSERT 0 2
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active | category_id 
----+-------------------------------------+----------+-------------+-----------+-------------
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t         |            
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t         |            
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t         |            
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t         |            
(4 rows)

toko_laptop_db=# select * from categories;
 id |   name   
----+----------
  1 | gaming
  2 | business
(2 rows)


/// 3                               
HINT:  Perhaps you meant to reference the column "laptop.category".
toko_laptop_db=# update laptop set category_id = 1 where laptop.category = 'gaming';
UPDATE 3
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active | category_id 
----+-------------------------------------+----------+-------------+-----------+-------------
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t         |            
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t         |           1
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t         |           1
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t         |           1
(4 rows)

toko_laptop_db=# update laptop set category
toko_laptop_db-# ^C
toko_laptop_db=# update laptop set category_id = 2 where category = 'business';
UPDATE 1
toko_laptop_db=# select * from laptop;
 id |                name                 | category |    price    | is_active | category_id 
----+-------------------------------------+----------+-------------+-----------+-------------
  3 | Lenovo LOQ 15IRH8                   | gaming   | 12899000.00 | t         |           1
  5 | ASUS TUF GAMING F15 FX507VV         | gaming   | 21299000.00 | t         |           1
  4 | Lenovo LOQ 1JID i5 12450HX          | gaming   | 12999000.00 | t         |           1
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U | business |  6599000.00 | t         |           2
(4 rows)

toko_laptop_db=# 




/// 4
toko_laptop_db=# select laptop.id,
toko_laptop_db-# laptop.name,
toko_laptop_db-# laptop.price,
toko_laptop_db-# categories.name as category_name
toko_laptop_db-# from laptop
toko_laptop_db-# join categories
toko_laptop_db-# on laptop.category_id = categories.id;
 id |                name                 |    price    | category_name 
----+-------------------------------------+-------------+---------------
  3 | Lenovo LOQ 15IRH8                   | 12899000.00 | gaming
  5 | ASUS TUF GAMING F15 FX507VV         | 21299000.00 | gaming
  4 | Lenovo LOQ 1JID i5 12450HX          | 12999000.00 | gaming
  2 | Lenovo IdeaPad Slim 3 Ryzen 5 7520U |  6599000.00 | business
(4 rows)

toko_laptop_db=# 


/// 5
 

 toko_laptop_db=# select 
toko_laptop_db-# categories.name as category_name,
toko_laptop_db-# count (laptop.id) as jumlah_barang
toko_laptop_db-# from laptop
toko_laptop_db-# join categories
toko_laptop_db-# on laptop.category_id = categories.id
toko_laptop_db-# group by categories.name;
 category_name | jumlah_barang 
---------------+---------------
 business      |             1
 gaming        |             3
(2 rows)

toko_laptop_db=# 



toko_laptop_db=# select categories.name as cotegory_name,
max(laptop.price) as harga_termahal
from laptop
join categories on laptop.category_id = categories.id
group by categories.name order by harga_termahal desc
limit 1;
 cotegory_name | harga_termahal 
---------------+----------------
 gaming        |    21299000.00
(1 row)

toko_laptop_db=# 




- jawaaaaaaaaban

1. b 
2. b 
3. c 
4. c 
5. b 
6. c
7. c 
8. b 
9. c 
10. c