-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'CAPITANA',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cabildo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "resguardo" TEXT NOT NULL,
    "comunidad" TEXT NOT NULL,
    "vigencia" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioCabildo" (
    "usuarioId" TEXT NOT NULL,
    "cabildoId" TEXT NOT NULL,
    "rolEnCabildo" TEXT NOT NULL DEFAULT 'CAPITANA',

    PRIMARY KEY ("usuarioId", "cabildoId"),
    CONSTRAINT "UsuarioCabildo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UsuarioCabildo_cabildoId_fkey" FOREIGN KEY ("cabildoId") REFERENCES "Cabildo" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Familia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" INTEGER NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cabildoId" TEXT NOT NULL,
    CONSTRAINT "Familia_cabildoId_fkey" FOREIGN KEY ("cabildoId") REFERENCES "Cabildo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Miembro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipoIdentificacion" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "fechaNacimiento" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "estadoCivil" TEXT,
    "profesion" TEXT,
    "escolaridad" TEXT,
    "integrantes" INTEGER NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "observaciones" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    "fechaAlta" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaBaja" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "familiaId" TEXT NOT NULL,
    "cabildoId" TEXT NOT NULL,
    CONSTRAINT "Miembro_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Miembro_cabildoId_fkey" FOREIGN KEY ("cabildoId") REFERENCES "Cabildo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "vigencia" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "novedad" TEXT,
    "archivoPath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "cabildoId" TEXT NOT NULL,
    CONSTRAINT "Reporte_cabildoId_fkey" FOREIGN KEY ("cabildoId") REFERENCES "Cabildo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReporteAltas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ReporteAltas_A_fkey" FOREIGN KEY ("A") REFERENCES "Miembro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReporteAltas_B_fkey" FOREIGN KEY ("B") REFERENCES "Reporte" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ReporteBajas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ReporteBajas_A_fkey" FOREIGN KEY ("A") REFERENCES "Miembro" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ReporteBajas_B_fkey" FOREIGN KEY ("B") REFERENCES "Reporte" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Miembro_familiaId_idx" ON "Miembro"("familiaId");

-- CreateIndex
CREATE INDEX "Miembro_sexo_idx" ON "Miembro"("sexo");

-- CreateIndex
CREATE UNIQUE INDEX "Miembro_numeroDocumento_cabildoId_key" ON "Miembro"("numeroDocumento", "cabildoId");

-- CreateIndex
CREATE UNIQUE INDEX "_ReporteAltas_AB_unique" ON "_ReporteAltas"("A", "B");

-- CreateIndex
CREATE INDEX "_ReporteAltas_B_index" ON "_ReporteAltas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReporteBajas_AB_unique" ON "_ReporteBajas"("A", "B");

-- CreateIndex
CREATE INDEX "_ReporteBajas_B_index" ON "_ReporteBajas"("B");
