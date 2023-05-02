-- AlterTable
ALTER TABLE "data_mapping" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "dpo" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "quiz" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "sector" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "status" DROP NOT NULL;
