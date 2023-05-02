-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pass" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dpo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "actual" BOOLEAN NOT NULL DEFAULT true,
    "naturalPerson" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "dpo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_mapping" (
    "id" TEXT NOT NULL,
    "dpoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tagName" TEXT NOT NULL,
    "sourceData" TEXT NOT NULL,
    "colletedData" TEXT NOT NULL,
    "reasonData" TEXT NOT NULL,
    "howStorage" TEXT NOT NULL,
    "securityData" TEXT NOT NULL,
    "deadlineData" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "underAgeData" BOOLEAN NOT NULL,
    "sensitiveData" BOOLEAN NOT NULL,
    "controller" TEXT NOT NULL,

    CONSTRAINT "data_mapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sector" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "dpo" ADD CONSTRAINT "dpo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_mapping" ADD CONSTRAINT "data_mapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_mapping" ADD CONSTRAINT "data_mapping_dpoId_fkey" FOREIGN KEY ("dpoId") REFERENCES "dpo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_mapping" ADD CONSTRAINT "data_mapping_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sector" ADD CONSTRAINT "sector_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
