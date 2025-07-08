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

USER_DATA = ~/data/user
USER_PROFILE_PICTURE = ~/data/user/uploads/profile_pictures
PAGE_CONTENT_DATA = ~/data/page_content
GAME_DATA = ~/data/game
TOURNAMENT_DATA = ~/data/tournament

all: up

up: build
	@mkdir -p $(USER_DATA)
	@mkdir -p $(PAGE_CONTENT_DATA)
	@mkdir -p $(GAME_DATA)
	@mkdir -p $(TOURNAMENT_DATA)
	@mkdir -p $(USER_PROFILE_PICTURE)
	@chmod 777 $(USER_DATA)
	@chmod 777 $(PAGE_CONTENT_DATA)
	@chmod 777 $(GAME_DATA)
	@chmod 777 $(TOURNAMENT_DATA)
	@chmod 777 $(USER_PROFILE_PICTURE)
	docker-compose -f src/docker-compose.yml up -d --force-recreate

build:
	docker-compose -f src/docker-compose.yml build --no-cache

down:
	docker-compose -f src/docker-compose.yml down

stop:
	docker-compose -f src/docker-compose.yml stop

start:
	docker-compose -f src/docker-compose.yml start

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
	@rm -rf $(USER_PROFILE_PICTURE) || true

re: clean up

prune: clean
	@docker system prune -a --volumes -f || true

fresh: prune up

rebuild-user:
	docker-compose -f src/docker-compose.yml build --no-cache user
	docker-compose -f src/docker-compose.yml up -d --force-recreate user

rebuild-page_content:
	docker-compose -f src/docker-compose.yml build --no-cache page_content
	docker-compose -f src/docker-compose.yml up -d --force-recreate page_content

rebuild-game:
	docker-compose -f src/docker-compose.yml build --no-cache game
	docker-compose -f src/docker-compose.yml up -d --force-recreate game

rebuild-nginx:
	docker-compose -f src/docker-compose.yml build --no-cache nginx
	docker-compose -f src/docker-compose.yml up -d --force-recreate nginx

rebuild-backend: rebuild-user rebuild-page_content rebuild-game

.PHONY: all up down start build clean re prune fresh rebuild-user rebuild-page_content rebuild.game rebuild-nginx rebuild-backend