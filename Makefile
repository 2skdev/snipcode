up:
	docker-compose up

prune:
	docker-compose down --rmi all --volumes --remove-orphans

psql:
	docker-compose exec postgres psql postgres

prisma-studio:
	docker-compose exec nextjs npx prisma studio

prisma-init:
	docker-compose exec nextjs npx prisma migrate dev --name init
