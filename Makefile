.PHONY: help install dev build test lint format clean docker-build docker-run docker-stop docker-clean all

# Variables
DOCKER_IMAGE_NAME = podcaster
DOCKER_CONTAINER_NAME = podcaster-app
DOCKER_PORT = 8080

# Colors for output
GREEN = \033[0;32m
NC = \033[0m # No Color

## help: Show this help message
help:
	@echo "$(GREEN)Available commands:$(NC)"
	@sed -n 's/^##//p' $(MAKEFILE_LIST) | column -t -s ':' | sed -e 's/^/ /'

## install: Install dependencies
install:
	@echo "$(GREEN)Installing dependencies...$(NC)"
	npm ci

## dev: Start development server
dev:
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

## build: Build for production
build:
	@echo "$(GREEN)Building for production...$(NC)"
	npm run build

## preview: Preview production build
preview: build
	@echo "$(GREEN)Starting preview server...$(NC)"
	npm run preview

## test: Run all tests
test:
	@echo "$(GREEN)Running tests...$(NC)"
	npm test

## test-watch: Run tests in watch mode
test-watch:
	@echo "$(GREEN)Running tests in watch mode...$(NC)"
	npm run test:watch

## test-ui: Run tests with UI
test-ui:
	@echo "$(GREEN)Running tests with UI...$(NC)"
	npm run test:ui

## lint: Lint code
lint:
	@echo "$(GREEN)Linting code...$(NC)"
	npm run lint

## lint-fix: Lint and fix code
lint-fix:
	@echo "$(GREEN)Linting and fixing code...$(NC)"
	npm run lint:fix

## format: Format code with prettier
format:
	@echo "$(GREEN)Formatting code...$(NC)"
	npm run prettier

## clean: Clean build artifacts and dependencies
clean:
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	rm -rf dist coverage node_modules

## docker-build: Build Docker image
docker-build:
	@echo "$(GREEN)Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE_NAME):latest .

## docker-run: Run Docker container
docker-run:
	@echo "$(GREEN)Running Docker container on port $(DOCKER_PORT)...$(NC)"
	docker run -d \
		--name $(DOCKER_CONTAINER_NAME) \
		-p $(DOCKER_PORT):80 \
		$(DOCKER_IMAGE_NAME):latest
	@echo "$(GREEN)App running at http://localhost:$(DOCKER_PORT)$(NC)"

## docker-stop: Stop Docker container
docker-stop:
	@echo "$(GREEN)Stopping Docker container...$(NC)"
	docker stop $(DOCKER_CONTAINER_NAME) || true
	docker rm $(DOCKER_CONTAINER_NAME) || true

## docker-logs: Show Docker container logs
docker-logs:
	docker logs -f $(DOCKER_CONTAINER_NAME)

## docker-clean: Remove Docker image and container
docker-clean: docker-stop
	@echo "$(GREEN)Removing Docker image...$(NC)"
	docker rmi $(DOCKER_IMAGE_NAME):latest || true

## docker-rebuild: Rebuild and run Docker container
docker-rebuild: docker-clean docker-build docker-run

## all: Install, lint, test, and build
all: install lint test build
	@echo "$(GREEN)All tasks completed!$(NC)"

## ci: Run CI pipeline (lint, test, build)
ci:
	@echo "$(GREEN)Running CI pipeline...$(NC)"
	npm run lint
	npm test
	npm run build
	@echo "$(GREEN)CI pipeline completed successfully!$(NC)"
