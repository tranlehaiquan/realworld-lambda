-- CreateTable
CREATE TABLE "article" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "body" TEXT,
    "slug" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" UUID,
    "tagList" TEXT[],

    CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "bio" TEXT,
    "image" VARCHAR,
    "salt" VARCHAR NOT NULL,
    "hash" VARCHAR NOT NULL,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_follower" (
    "userId" UUID NOT NULL,
    "followerId" UUID NOT NULL,

    CONSTRAINT "PK_9c78b540dd7907e72c3c5d8242a" PRIMARY KEY ("userId","followerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_0ab85f4be07b22d79906671d72f" ON "article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_e12875dfb3b1d92d7d7c5377e22" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_78a916df40e02a9deb1c4b75edb" ON "user"("username");

-- CreateIndex
CREATE INDEX "IDX_86f1191bfce87ddfcaf68438dd" ON "user_follower"("followerId");

-- CreateIndex
CREATE INDEX "IDX_c614f68194d9488c45840908fb" ON "user_follower"("userId");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_follower" ADD CONSTRAINT "FK_86f1191bfce87ddfcaf68438ddf" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_follower" ADD CONSTRAINT "FK_c614f68194d9488c45840908fb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

