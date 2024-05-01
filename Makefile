

up: 
	docker-compose up -d --build --no-deps

down:
	docker-compose down

build: down
	docker build -t authapi . 

clean: down
	docker volume prune
