const cron = require('node-cron');
const model = require('../Models/NameEventss'); // Importa el modelo

console.log(model);

cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const result = await model.updateMany(
            { dateTime: { $lt: now } },  // Busca eventos donde al menos una fecha ha pasado
            { $pull: { dateTime: { $lt: now } } } // Elimina solo las fechas menores a `now`
        );
        const findresult = await model.find({});
        console.log("Todos los eventos en la BD:", findresult);
        console.log("Eventos a eliminar:", result);
        console.log(`Eventos expirados eliminados: ${result.deletedCount}`);
    } catch (error) {
        console.error('Error en la tarea de limpieza de eventos:', error);
    }
});

console.log('🕛 Cron job de limpieza de eventos programado.');
