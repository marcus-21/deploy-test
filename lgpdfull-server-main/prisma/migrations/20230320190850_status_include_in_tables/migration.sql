/*
  Warnings:

  - Added the required column `status` to the `data_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `dpo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `sector` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_mapping" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "dpo" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "sector" ADD COLUMN     "status" BOOLEAN NOT NULL;
