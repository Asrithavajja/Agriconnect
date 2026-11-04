const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const store = require('../config/inMemoryStore');

const CROP_IMAGE_MAP = {
  'Wheat (Triticum aestivum)': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
  'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
  'Rice / Paddy (Oryza sativa)': 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80',
  'Rice': 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80',
  'Paddy': 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80',
  'Cotton (Gossypium)': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80',
  'Cotton': 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80',
  'Maize / Corn (Zea mays)': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
  'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
  'Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
  'Sugarcane (Saccharum officinarum)': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
  'Sugarcane': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80',
  'Mustard / Rapeseed (Brassica juncea)': 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1200&q=80',
  'Mustard': 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1200&q=80',
  'Rapeseed': 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1200&q=80',
  'Tomato (Solanum lycopersicum)': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
  'Tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
  'Chickpea / Gram (Cicer arietinum)': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80',
  'Chickpea': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80',
  'Gram': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80',
  'Groundnut / Peanut (Arachis hypogaea)': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80',
  'Groundnut': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80',
  'Peanut': 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80',
  'Soybean (Glycine max)': 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1200&q=80',
  'Soybean': 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1200&q=80',
  'Potato (Solanum tuberosum)': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
  'Onion (Allium cepa)': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80',
  'Onion': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80',
  'Tea (Camellia sinensis)': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
  'Tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
  'Coffee (Coffea)': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
  'Coffee': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
  'Banana (Musa)': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80',
  'Banana': 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80',
  'Mango (Mangifera indica)': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80',
  'Mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80',
  'Turmeric (Curcuma longa)': 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80',
  'Turmeric': 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80',
  'Chilli / Red Pepper (Capsicum annuum)': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80',
  'Chilli': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80',
  'Red Pepper': 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80',
  'Sunflower (Helianthus annuus)': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80',
  'Sunflower': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80',
  'Apple (Malus domestica)': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80',
  'Apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80'
};


const mapCropImage = (crop) => {
  if (!crop) return crop;
  const obj = crop.toObject ? crop.toObject() : { ...crop };
  const cropName = (obj.name || '').toLowerCase();

  if (cropName.includes('turmeric')) {
    obj.image = 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('mango')) {
    obj.image = 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('banana')) {
    obj.image = 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('coffee')) {
    obj.image = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('tea')) {
    obj.image = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('soybean')) {
    obj.image = 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('groundnut') || cropName.includes('peanut')) {
    obj.image = 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('mustard') || cropName.includes('rapeseed')) {
    obj.image = 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('rice') || cropName.includes('paddy')) {
    obj.image = 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('cotton')) {
    obj.image = 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('wheat')) {
    obj.image = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('maize') || cropName.includes('corn')) {
    obj.image = 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('sugarcane')) {
    obj.image = 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('tomato')) {
    obj.image = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('chickpea') || cropName.includes('gram')) {
    obj.image = 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('potato')) {
    obj.image = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('onion')) {
    obj.image = 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('chilli') || cropName.includes('pepper')) {
    obj.image = 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('sunflower')) {
    obj.image = 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80';
  } else if (cropName.includes('apple')) {
    obj.image = 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80';
  } else if (CROP_IMAGE_MAP[obj.name]) {
    obj.image = CROP_IMAGE_MAP[obj.name];
  }
  return obj;
};

// Auto-sync database records if connected to real MongoDB instance
const syncMongoDBImages = async () => {
  if (mongoose.connection.readyState !== 1) return;
  try {
    for (const [cropName, imageUrl] of Object.entries(CROP_IMAGE_MAP)) {
      const cleanName = cropName.split('(')[0].trim();
      await Crop.updateMany(
        { name: { $regex: cleanName, $options: 'i' }, image: { $ne: imageUrl } },
        { $set: { image: imageUrl } }
      );
    }
  } catch (err) {
    console.error('Auto-sync MongoDB crop images notice:', err.message);
  }
};

// @desc    Get all crops (with optional search)
// @route   GET /api/crops
// @access  Public
const getCrops = async (req, res, next) => {
  try {
    const search = req.query.search || '';

    let cropsList = [];

    if (mongoose.connection.readyState === 1) {
      await syncMongoDBImages();
      const keyword = search
        ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { season: { $regex: search, $options: 'i' } },
            { soilType: { $regex: search, $options: 'i' } }
          ]
        }
        : {};

      cropsList = await Crop.find({ ...keyword }).sort({ createdAt: -1 });
      if (cropsList.length < store.crops.length && !search) {
        cropsList = store.crops;
      }
    } else {
      // Fallback In-Memory Mode
      cropsList = store.crops;
      if (search.trim()) {
        const s = search.toLowerCase();
        cropsList = store.crops.filter(
          c =>
            c.name.toLowerCase().includes(s) ||
            c.season.toLowerCase().includes(s) ||
            c.soilType.toLowerCase().includes(s)
        );
      }
    }

    const mappedCrops = cropsList.map(mapCropImage);
    return res.json(mappedCrops);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single crop by ID
// @route   GET /api/crops/:id
// @access  Public
const getCropById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (mongoose.connection.readyState === 1) {
      let crop = await Crop.findById(id);
      if (!crop) {
        crop = store.crops.find(c => c._id === id);
      }
      if (crop) return res.json(mapCropImage(crop));
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Fallback In-Memory Mode
    const crop = store.crops.find(c => c._id === id);
    if (crop) return res.json(mapCropImage(crop));
    return res.status(404).json({ message: 'Crop not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new crop
// @route   POST /api/crops
// @access  Private
const createCrop = async (req, res, next) => {
  try {
    const {
      name,
      description,
      season,
      soilType,
      waterRequirement,
      climate,
      cultivationInfo,
      image
    } = req.body;

    if (!name || !description || !season || !soilType || !waterRequirement || !climate || !cultivationInfo) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (mongoose.connection.readyState === 1) {
      const crop = new Crop({
        name,
        description,
        season,
        soilType,
        waterRequirement,
        climate,
        cultivationInfo,
        image: image || undefined
      });

      const createdCrop = await crop.save();
      return res.status(201).json(createdCrop);
    }

    // Fallback In-Memory Mode
    const newCrop = {
      _id: 'crp_' + Date.now(),
      name,
      description,
      season,
      soilType,
      waterRequirement,
      climate,
      cultivationInfo,
      image: image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date()
    };

    store.crops.unshift(newCrop);
    return res.status(201).json(newCrop);
  } catch (error) {
    next(error);
  }
};

// @desc    Update crop by ID
// @route   PUT /api/crops/:id
// @access  Private
const updateCrop = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (mongoose.connection.readyState === 1) {
      const crop = await Crop.findById(id);

      if (crop) {
        crop.name = req.body.name || crop.name;
        crop.description = req.body.description || crop.description;
        crop.season = req.body.season || crop.season;
        crop.soilType = req.body.soilType || crop.soilType;
        crop.waterRequirement = req.body.waterRequirement || crop.waterRequirement;
        crop.climate = req.body.climate || crop.climate;
        crop.cultivationInfo = req.body.cultivationInfo || crop.cultivationInfo;
        if (req.body.image) crop.image = req.body.image;

        const updatedCrop = await crop.save();
        return res.json(updatedCrop);
      }
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Fallback In-Memory Mode
    const crop = store.crops.find(c => c._id === id);
    if (crop) {
      Object.assign(crop, req.body);
      return res.json(crop);
    }
    return res.status(404).json({ message: 'Crop not found' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete crop by ID
// @route   DELETE /api/crops/:id
// @access  Private
const deleteCrop = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (mongoose.connection.readyState === 1) {
      const crop = await Crop.findById(id);

      if (crop) {
        await Crop.deleteOne({ _id: id });
        return res.json({ message: 'Crop removed successfully' });
      }
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Fallback In-Memory Mode
    const index = store.crops.findIndex(c => c._id === id);
    if (index !== -1) {
      store.crops.splice(index, 1);
      return res.json({ message: 'Crop removed successfully' });
    }
    return res.status(404).json({ message: 'Crop not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
  mapCropImage
};
