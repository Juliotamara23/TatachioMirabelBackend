import prisma from "./database.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding test data...");

  // 1. Create Admin User
  const adminEmail = "admin@tatachio.com";
  const passwordHash = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: { rol: "ADMINISTRADOR" },
    create: {
      email: adminEmail,
      passwordHash,
      nombre: "Admin Test",
      rol: "ADMINISTRADOR",
    },
  });
  console.log(`Admin user created/updated: ${admin.email}`);

  // 2. Create a Cabildo
  const cabildo = await prisma.cabildo.upsert({
    where: { id: "test-cabildo-id" }, // We use a fixed ID for testing
    update: {},
    create: {
      id: "test-cabildo-id",
      nombre: "Cabildo Test Mirabel",
      resguardo: "Resguardo Test",
      comunidad: "Comunidad Test",
      vigencia: 2024,
    },
  });
  console.log(`Cabildo created: ${cabildo.nombre}`);

  // 3. Create a Familia
  const familia = await prisma.familia.create({
    data: {
      numero: 1,
      direccion: "CALLE FALSA 123",
      cabildoId: cabildo.id,
    },
  });

  // 4. Create a Miembro
  const miembro = await prisma.miembro.create({
    data: {
      tipoIdentificacion: "CC",
      numeroDocumento: "12345678",
      nombres: "JUAN",
      apellidos: "PEREZ",
      fechaNacimiento: "01/01/1990",
      parentesco: "CF",
      sexo: "M",
      integrantes: 1,
      cabildoId: cabildo.id,
      familiaId: familia.id,
    },
  });
  console.log(`Miembro created: ${miembro.nombres} ${miembro.apellidos}`);

  console.log("Test data setup complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
