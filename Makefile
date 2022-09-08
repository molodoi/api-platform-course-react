CONSOLE=symfony console

# ================================== #
# Manipulation de la base de données #
# ================================== #
entity: ## Crée ou modifie une entité
	$(CONSOLE) make:entity

migration: ## Génère une migration avec les changements des entités
	$(CONSOLE) make:migration

migrate: ## Exécute les migrations
	$(CONSOLE) doctrine:migrations:migrate -n

migrations.list: ## Liste les migrations
	$(CONSOLE) doctrine:migrations:list

db.drop:
	$(CONSOLE) doctrine:database:drop -f

db.create:
	$(CONSOLE) doctrine:database:create

fixtures.load:
	$(CONSOLE) doctrine:fixtures:load

db.recreate: db.drop db.create migrate fixtures.load ## Commande (d'urgence) pour recréer la BdD depuis 0

# =================== #
# DOCKER + WEB SERVER #
# =================== #

server.start:
	symfony server:start -d

server.stop:
	symfony server:stop

docker.start:
	docker compose up -d

docker.stop:
	docker compose down

start: docker.start server.start

stop: docker.stop server.stop

# =================== #
# DOCKER + WEB SERVER #
# =================== #

route.debug:
	$(CONSOLE) debug:router