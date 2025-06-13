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

USER_DATA = /home/splattje/data/user
PAGE_CONTENT_DATA = /home/splattje/data/page_content
GAME_DATA = /home/splattje/data/game
TOURNAMENT_DATA = /home/splattje/data/tournament

all: up

up: build
	@mkdir -p $(USER_DATA)
	@mkdir -p $(PAGE_CONTENT_DATA)
	@mkdir -p $(GAME_DATA)
	@mkdir -p $(TOURNAMENT_DATA)
	@chmod 777 $(USER_DATA)
	@chmod 777 $(PAGE_CONTENT_DATA)
	@chmod 777 $(GAME_DATA)
	@chmod 777 $(TOURNAMENT_DATA)
	docker-compose -f src/docker-compose.yml up -d

build:
	docker-compose -f src/docker-compose.yml build

down:
	docker-compose -f src/docker-compose.yml down

stop:
	docker-compose -f src/docker-compose.yml stop

start:
	docker-compose -f src/docker-compose.ym start

clean:
	@docker stop $$(docker ps -qa) || true
	@docker rm $$(docker ps -qa) || true
	@docker rmi -f $$(docker images -qa) || true
	@docker volume rm $$(docker volume ls -q) || true
	@docker network rm $$(docker network ls -q) || true
	@rm -rf $(USER_DATA) || true
	@rm -rf $(PAGE_CONTENT_DATA) || true
	@rm -rf $(GAME_DATA) || true
	@rm -rf $(TOURNAMENT_DATA) || true

re: clean up

prune: clean
	@docker system prune -a --volumes -f || true

fresh: prune up

.PHONY: all up down start build clean re prune fresh