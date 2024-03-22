const express = require('express');
const router = express.Router();
const z = require('zod');
const carsDB = require("../database/db");
//Con la fe de dios se pasa esto
// GET /cars
router.get('/', (req, res) => {
    const { marca, modelo } = req.query;
    if (marca && modelo) {
        const filteredCars = carsDB.filter(car => 
            car.marca.toLowerCase() === marca.toLowerCase() && 
            car.modelo.toLowerCase() === modelo.toLowerCase()
        );
        if (filteredCars.length > 0) {
            res.status(200).json(filteredCars);
        } else {
            res.status(404).json({ message: `No cars found for marca ${marca} and modelo ${modelo}` });
        }
    } else if (marca) {
        const filteredCars = carsDB.filter(car => car.marca.toLowerCase() === marca.toLowerCase());
        if (filteredCars.length > 0) {
            res.status(200).json(filteredCars);
        } else {
            res.status(404).json({ message: `No cars found for marca ${marca}` });
        }
    } else {
        res.status(200).json(carsDB);
    }
});

// GET /cars/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const car = findCarById(id);

    if (car) {
        res.status(200).json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// POST /cars
router.post('/', (req, res) => {
    const newCar = req.body;

    if (hasInvalidData(newCar)) {
        res.status(400).json([{ message: 'Invalid car data' }]);
    } else {
        try {
            validateAndAddCar(newCar);
            res.status(201).json(newCar);
        } catch (error) {
            res.status(400).json({ message: error.errors });
        }
    }
});

// PUT /cars/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedCar = req.body;
    const existingCarIndex = findCarIndexById(id);

    if (existingCarIndex !== -1) {
        if (updatedCar.id !== undefined) { // Check if ID is being updated
            res.status(400).json({ message: 'Cannot update car ID' });
        } else if (hasInvalidData(updatedCar)) {
            res.status(400).json({ message: 'Invalid car data' });
        } else {
            updateCar(existingCarIndex, updatedCar);
            res.status(200).json(carsDB[existingCarIndex]);
        }
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// DELETE /cars/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const existingCarIndex = findCarIndexById(id);

    if (existingCarIndex !== -1) {
        deleteCar(existingCarIndex);
        res.status(200).json({ message: 'Car deleted' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

function findCarById(id) {
    return carsDB.find(car => car.id === parseInt(id));
}

function findCarIndexById(id) {
    return carsDB.findIndex(car => car.id === parseInt(id));
}

function hasInvalidData(car) {
    return isNaN(car.año);
}

function validateAndAddCar(car) {
    const schema = z.object({
        marca: z.string(),
        modelo: z.string(),
        año: z.number(),
        color: z.string(),
        precio: z.number()
    });

    schema.parse(car);
    car.id = carsDB.length + 1;
    carsDB.push(car);
}

function updateCar(index, updatedCar) {
    carsDB[index] = { ...carsDB[index], ...updatedCar };
}

function deleteCar(index) {
    carsDB.splice(index, 1);
}

module.exports = router;