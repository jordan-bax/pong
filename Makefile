# IMAGE_NAME = type
# SOURCEFILE = pong.html
# all: 
# 	docker build -t ${IMAGE_NAME} .
# 	open http://localhost:8080/${SOURCEFILE}
# 	docker run -p 8080:8080 --rm ${IMAGE_NAME}
# clean:
# 	docker rmi ${IMAGE_NAME}
# run:
# 	open http://localhost:8080/${SOURCEFILE}
# 	docker run -p 8080:8080 --rm ${IMAGE_NAME}

# .PHONY: all clean run

all: up

up: build
	docker-compose -f docker-compose.yml up -d

build:
	docker-compose -f docker-compose.yml build

down:
	docker-compose -f docker-compose.yml down

stop:
	docker-compose -f docker-compose.yml stop

start:
	docker-compose -f docker-compose.ym start

clean:
	@docker stop $$(docker ps -qa) || true
	@docker rm $$(docker ps -qa) || true
	@docker rmi -f $$(docker images -qa) || true
	@docker volume rm $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q) || true

re: clean up

web: up
	firefox http://localhost:8080/

push:
	git add .
	git commit -m "update"
	git push git@github.com:jordan-bax/pong.git
pull:
	git pull git@github.com:jordan-bax/pong.git

prune: clean
	@docker system prune -a --volumes -f || true

.PHONY: all up down start build clean re prune push pull