

### Setting up mysql database (via docker)
- create a volume to persist data on your mysql database:
`docker volume create mysqldata`
- create the mysql container using docker run and attach the volume to it:
`docker run --name go-music-mysql -e MYSQL_ROOT_PASSWORD=test123 -d -p 3306:3306 -v mysqldata:/var/lib/mysql mysql`
- enter the mysql terminal to enter a command:
`docker exec -it go-music-mysql mysql -uroot -p`
- create the database named __*gomusic*__: `CREATE DATABASE gomusic;`
- exit the terminal `EXIT;`

### generating a self-signed certificate
this will allow you to use https for your backend
- Make script executable
```
chmod +x generate_cert.sh
```
- Execute script to generate .
```
./generate_cert.sh
```