const model = require('../Models/NameEventss')

exports.getData = async (req, res) => {
    try {
        const docs = await model.find({});
        res.send({ docs });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al obtener datos' });
    }
};

exports.createNameEvent = async (req, res) => {
    try {
      const newEvent = await model.create(req.body);
      res.status(200).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateNameEvent = async (req, res) => {
    try {
      const updatedEvent = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteNameEvent = async (req, res) => {
    try {
      await model.findByIdAndDelete(req.params.id);
      res.json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.checkNameEvent = async (req, res) => {
    try {
        const { name } = req.query; // Se recibe el nombre como query param
        if (!name) {
            return res.status(400).json({ error: "El nombre del evento es requerido" });
        }

        const eventExists = await model.findOne({ name });
        res.json({ exists: !!eventExists }); // Devuelve true si existe, false si no
    } catch (error) {
        console.error('Error al verificar el evento:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
