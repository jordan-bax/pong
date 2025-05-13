IMAGE_NAME = type
SOURCEFILE = pong.html
all: 
	docker build -t ${IMAGE_NAME} .
	open http://localhost:8080/${SOURCEFILE}
	docker run -p 8080:8080 --rm ${IMAGE_NAME}
clean:
	docker rmi ${IMAGE_NAME}
run:
	open http://localhost:8080/${SOURCEFILE}
	docker run -p 8080:8080 --rm ${IMAGE_NAME}

.PHONY: all clean run