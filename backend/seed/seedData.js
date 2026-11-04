const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('../models/User');
const Crop = require('../models/Crop');
const Scheme = require('../models/Scheme');
const Tip = require('../models/Tip');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' });

const seedCrops = [
  {
    name: 'Wheat (Triticum aestivum)',
    description: 'Wheat is a major staple cereal crop grown widely during the Rabi season across temperate and sub-tropical regions.',
    season: 'Rabi (Winter)',
    soilType: 'Loamy Soil & Clay Loam',
    waterRequirement: 'Moderate (450-650 mm)',
    climate: 'Cool growing season (15°C to 25°C) with clear sunshine during ripening.',
    cultivationInfo: 'Sowing occurs in October-November. Requires 4 to 6 irrigations at critical stages like Crown Root Initiation (CRI) and flowering.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Rice / Paddy (Oryza sativa)',
    description: 'Rice is the primary staple food for over half of the world population, thriving in warm and humid tropical monsoon climates.',
    season: 'Kharif (Monsoon)',
    soilType: 'Deep Clayey Loam & Alluvial Soil',
    waterRequirement: 'High (1000-1500 mm)',
    climate: 'Hot & Humid (20°C to 37°C) with abundant rainfall.',
    cultivationInfo: 'Transplanted from nurseries into puddle fields. Requires continuous standing water during early growth stages and proper weed control.',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Cotton (Gossypium)',
    description: 'Cotton is the most important cash crop providing raw fiber material for the global textile industry.',
    season: 'Kharif (Monsoon)',
    soilType: 'Black Cotton Soil (Regur) & Deep Alluvium',
    waterRequirement: 'Moderate to High (600-800 mm)',
    climate: 'Warm & dry weather (21°C to 30°C) with at least 180-200 frost-free days.',
    cultivationInfo: 'Sown in May-June. Integrated Pest Management (IPM) is essential for pink bollworm control. Requires bright sunlight during boll opening.',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Maize / Corn (Zea mays)',
    description: 'Maize is known as the Queen of Cereals, cultivated for grain, fodder, and industrial bio-products.',
    season: 'Kharif & Rabi',
    soilType: 'Well-drained Fertile Loam',
    waterRequirement: 'Moderate (500-800 mm)',
    climate: 'Warm climate (18°C to 27°C), sensitive to frost and waterlogging.',
    cultivationInfo: 'Requires adequate nitrogen supplementation. Maintain optimum plant density and practice crop rotation with legumes.',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Sugarcane (Saccharum officinarum)',
    description: 'Sugarcane is a long-duration perennial grass harvested for sugar production, ethanol, and bio-energy.',
    season: 'All Season (12-18 months duration)',
    soilType: 'Deep Rich Loamy Soil',
    waterRequirement: 'Very High (1500-2500 mm)',
    climate: 'Tropical & Sub-tropical (20°C to 35°C) with high humidity.',
    cultivationInfo: 'Propagated using stem cuttings (setts). Earthing up and trash mulching retain soil moisture and prevent lodging.',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Mustard / Rapeseed (Brassica juncea)',
    description: 'Mustard is a major oilseed crop rich in essential fatty acids and cultivated in cool climates.',
    season: 'Rabi (Winter)',
    soilType: 'Sandy Loam to Heavy Clay',
    waterRequirement: 'Low (250-400 mm)',
    climate: 'Cool dry climate (10°C to 25°C).',
    cultivationInfo: 'Requires 2-3 light irrigations. Timely spraying protects against aphid attacks during flowering.',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Tomato (Solanum lycopersicum)',
    description: 'Tomato is a high-value horticultural vegetable crop cultivated widely in open fields and polyhouses.',
    season: 'Year-Round (Kharif / Rabi / Summer)',
    soilType: 'Well-drained Sandy Loam with Organic Matter',
    waterRequirement: 'Moderate (400-600 mm, Drip Irrigation)',
    climate: 'Mild climate (18°C to 27°C). Sensitive to extreme frost and heavy rainfall.',
    cultivationInfo: 'Raised in nursery beds before transplanting. Staking tall varieties improves yields and reduces fruit rotting.',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Chickpea / Gram (Cicer arietinum)',
    description: 'Chickpea is a pulse crop that fixes atmospheric nitrogen, improving soil fertility for future crops.',
    season: 'Rabi (Winter)',
    soilType: 'Light to Medium Well-drained Soil',
    waterRequirement: 'Low (250-350 mm)',
    climate: 'Cool and dry weather (15°C to 25°C).',
    cultivationInfo: 'Nipping (pinching top shoots at 30-45 days) encourages lateral branching and higher pod numbers.',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Groundnut / Peanut (Arachis hypogaea)',
    description: 'Groundnut is an important oilseed and food legume crop grown in warm tropical climates.',
    season: 'Kharif & Summer',
    soilType: 'Well-drained Sandy Loam & Loamy Sand',
    waterRequirement: 'Moderate (450-600 mm)',
    climate: 'Warm climate (20°C to 30°C). Requires warm soil for seed germination.',
    cultivationInfo: 'Pegging phase requires loose soil aeration. Avoid heavy clay soils that impede pod development underground.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Soybean (Glycine max)',
    description: 'Soybean is known as the Wonder Crop of the 20th century, rich in high quality protein and oil.',
    season: 'Kharif (Monsoon)',
    soilType: 'Well-drained Fertile Loam & Black Soil',
    waterRequirement: 'Moderate (450-700 mm)',
    climate: 'Warm and moist climate (20°C to 30°C).',
    cultivationInfo: 'Seed inoculation with Bradyrhizobium japonicum enhances root nodulation and atmospheric nitrogen fixation.',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Potato (Solanum tuberosum)',
    description: 'Potato is the most popular tuber crop and fourth most important food crop worldwide.',
    season: 'Rabi (Winter)',
    soilType: 'Loose Well-aerated Sandy Loam',
    waterRequirement: 'Moderate (400-600 mm)',
    climate: 'Cool climate (15°C to 20°C). Tuberization stops if temperature exceeds 30°C.',
    cultivationInfo: 'Earthing up at 30 days covers developing tubers from direct sunlight to prevent solanine greening.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Onion (Allium cepa)',
    description: 'Onion is an essential bulb crop widely cultivated for culinary flavoring and medicinal properties.',
    season: 'Kharif, Late Kharif & Rabi',
    soilType: 'Deep Friable Alluvial & Sandy Loam',
    waterRequirement: 'Moderate (350-550 mm)',
    climate: 'Cool climate for early growth, warm dry weather for bulb development and maturity.',
    cultivationInfo: 'Stop irrigation 10-15 days prior to harvesting to improve bulb storage quality and neck curing.',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Tea (Camellia sinensis)',
    description: 'Tea is a major commercial beverage plantation crop thriving in humid sub-tropical high altitude regions.',
    season: 'All Season (Perennial)',
    soilType: 'Deep Acidic Soil rich in Organic Carbon (pH 4.5 - 5.5)',
    waterRequirement: 'Very High (1500-2500 mm)',
    climate: 'Warm humid climate (13°C to 30°C) with frequent gentle rains and shade.',
    cultivationInfo: 'Plucking two leaves and a bud ensures premium quality tea processing.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Coffee (Coffea)',
    description: 'Coffee is a high-value commercial beverage crop harvested for aromatic beans.',
    season: 'Perennial Plantation',
    soilType: 'Deep Well-drained Organic Humus Soil (pH 6.0 - 6.5)',
    waterRequirement: 'High (1500-2000 mm)',
    climate: 'Cool humid shade climate (15°C to 28°C) without frost.',
    cultivationInfo: 'Grown under two tiers of shade trees (silver oak and dadap) to protect berries from scorching sun.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Banana (Musa)',
    description: 'Banana is a high-yielding tropical fruit crop grown extensively across warm humid regions.',
    season: 'All Season (Perennial)',
    soilType: 'Rich Fertile Deep Clayey Loam',
    waterRequirement: 'Very High (1800-2200 mm)',
    climate: 'Tropical humid climate (15°C to 35°C).',
    cultivationInfo: 'Desuckering maintains one main pseudo-stem per pit for maximum fruit bunch weight.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Mango (Mangifera indica)',
    description: 'Mango is known as the King of Fruits, cultivated across tropical and sub-tropical orchards.',
    season: 'Summer Harvest',
    soilType: 'Deep Alluvial to Red Loamy Soil',
    waterRequirement: 'Moderate (750-1200 mm)',
    climate: 'Warm tropical climate with distinct dry rest period before flowering.',
    cultivationInfo: 'Pruning diseased twigs and applying paclobutrazol induces regular annual flowering.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Turmeric (Curcuma longa)',
    description: 'Turmeric is a high-value spice rhizome crop rich in curcumin, renowned for health benefits.',
    season: 'Kharif (Monsoon)',
    soilType: 'Rich Friable Sandy Loam with Organic Humus',
    waterRequirement: 'High (1200-1600 mm)',
    climate: 'Warm humid climate (20°C to 35°C).',
    cultivationInfo: 'Mulching with green leaves (15 tonnes/ha) conserves soil moisture and enhances rhizome yield.',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Chilli / Red Pepper (Capsicum annuum)',
    description: 'Chilli is a widely cultivated spice vegetable crop valued for pungency (capsaicin) and color.',
    season: 'Kharif & Rabi',
    soilType: 'Well-drained Black & Red Loamy Soil',
    waterRequirement: 'Moderate (600-900 mm)',
    climate: 'Warm humid climate (20°C to 30°C).',
    cultivationInfo: 'Transplanting healthy seedlings and spraying neem seed kernel extract suppresses thrips and fruit borers.',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Sunflower (Helianthus annuus)',
    description: 'Sunflower is a major commercial oilseed crop known for high-grade edible oil low in cholesterol.',
    season: 'Rabi, Summer & Kharif',
    soilType: 'Deep Fertile Neutral Soil (pH 6.5 - 8.0)',
    waterRequirement: 'Moderate (500-750 mm)',
    climate: 'Sub-tropical to warm climate (20°C to 28°C).',
    cultivationInfo: 'Hand pollination during peak morning flowering (7-11 AM) boosts seed set by up to 25%.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Apple (Malus domestica)',
    description: 'Apple is the premier temperate fruit crop grown in high altitude hilly valleys.',
    season: 'Autumn Harvest',
    soilType: 'Deep Well-drained Loamy Soil (pH 5.5 - 6.5)',
    waterRequirement: 'High (1000-1200 mm)',
    climate: 'Cold temperate climate requiring 1000-1500 chilling hours below 7°C.',
    cultivationInfo: 'Training central leader trees and winter pruning balances vegetative growth and fruit spur formation.',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=1200&q=80'
  }
];

const seedSchemes = [
  {
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) [Sample Info]',
    description: 'Central sector scheme providing income support to small and marginal farmer families across the country to meet agricultural inputs and household needs.',
    eligibility: 'All landholding farmer families subject to operational guidelines and exclusions (e.g. institutional landholders).',
    benefits: 'Direct income support of ₹6,000 per year transferred into bank accounts in three equal installments of ₹2,000.',
    applicationInfo: 'Farmers can self-register on the PM-KISAN Portal or visit nearest Common Service Centre (CSC).'
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) [Sample Info]',
    description: 'Comprehensive crop insurance scheme protecting farmers against non-preventable natural risks from pre-sowing to post-harvest.',
    eligibility: 'All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.',
    benefits: 'Low uniform premium rate paid by farmers (2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops) with government subvention.',
    applicationInfo: 'Apply via national crop insurance portal, designated commercial banks, or authorized insurance agents.'
  },
  {
    name: 'Soil Health Card Scheme [Sample Info]',
    description: 'Government initiative to issue soil health cards to farmers with customized recommendations on nutrient dosages for different crops.',
    eligibility: 'All agricultural landowners and cultivating farmers across India.',
    benefits: 'Free soil testing reports analyzing 12 macro and micro nutrients to optimize fertilizer expenses and boost yield.',
    applicationInfo: 'Contact local District Agriculture Office or Krishi Vigyan Kendra (KVK) for soil sample collection.'
  },
  {
    name: 'Kisan Credit Card (KCC) Scheme [Sample Info]',
    description: 'Provides timely and hassle-free credit to farmers for agricultural expenses, post-harvest costs, and allied activities.',
    eligibility: 'Individual farmers, joint borrowers, self-help groups (SHGs), and tenant farmers engaged in agriculture and animal husbandry.',
    benefits: 'Access to revolving credit at subsidized interest rates (effective rate around 4% per annum with prompt repayment).',
    applicationInfo: 'Submit application along with land revenue records at any commercial bank or regional rural bank branch.'
  },
  {
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) [Sample Info]',
    description: 'Scheme focused on expanding cultivable area under assured irrigation and promoting water-use efficiency through micro-irrigation.',
    eligibility: 'Farmers of all categories owning land with access to water sources for micro-irrigation installation.',
    benefits: '50% to 55% financial subsidy for drip and sprinkler irrigation equipment installations.',
    applicationInfo: 'Apply through State Horticulture / Agriculture Department micro-irrigation online portals.'
  }
];

const seedTips = [
  {
    title: 'Conduct Regular Soil Testing Before Sowing',
    description: 'Testing soil pH and nutrient levels every 2 years prevents over-application of chemical fertilizers and corrects acidity/alkalinity early.',
    category: 'Soil Health'
  },
  {
    title: 'Adopt Drip Irrigation for High Efficiency',
    description: 'Drip irrigation delivers water and nutrients directly to crop roots, saving up to 60% water compared to flood irrigation while minimizing weed growth.',
    category: 'Water Management'
  },
  {
    title: 'Practice Crop Rotation with Legumes',
    description: 'Alternating cereal crops with leguminous crops like chickpeas or soybeans natural fixes nitrogen in the soil and breaks pest lifecycle patterns.',
    category: 'Crop Selection'
  },
  {
    title: 'Use Neem Cake & Bio-pesticides for Natural Pest Control',
    description: 'Applying neem cake to soil suppresses soil-borne nematodes and root grubs while reducing reliance on hazardous synthetic chemicals.',
    category: 'Organic Farming'
  },
  {
    title: 'Implement Integrated Pest Management (IPM)',
    description: 'Combine yellow sticky traps, pheromone traps, biological predators, and targeted organic sprays to manage pest thresholds economically.',
    category: 'Pest Management'
  },
  {
    title: 'Apply Balanced Fertilizers Based on N-P-K Ratio',
    description: 'Avoid excessive Urea (Nitrogen) application. Maintain ideal N-P-K ratios (4:2:1 for cereals) and supplement with secondary micronutrients like Zinc and Boron.',
    category: 'Fertilizer Awareness'
  },
  {
    title: 'Mulch Crop Residues to Protect Soil Moisture',
    description: 'Covering topsoil with paddy straw or organic mulch lowers soil temperature by 3-5°C during hot summers and prevents evaporation losses.',
    category: 'Sustainable Agriculture'
  },
  {
    title: 'Prepare Seed Bed with Trichoderma Bio-Fungicide',
    description: 'Treating seeds with Trichoderma viride (5-10g/kg seed) shields germinating seedlings against damping-off and root rot diseases.',
    category: 'Modern Farming Methods'
  },
  {
    title: 'Monitor Weather Forecasts Before Chemical Spraying',
    description: 'Avoid spraying pesticides or liquid fertilizers immediately before rain or strong winds to prevent chemical runoff into nearby water bodies.',
    category: 'Climate Awareness'
  },
  {
    title: 'Store Harvested Grains in Hermetic Bags',
    description: 'Hermetic or airtight storage bags eliminate oxygen access, protecting stored grains against beetles and fungal mold without chemical fumigants.',
    category: 'Post-Harvest Management'
  }
];

const importData = async () => {
  let mongoServer;
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agriconnect';
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      console.log('Database connected for seeding...');
    } catch (err) {
      console.log('⚠️ Local MongoDB service not active. Spinning up In-Memory MongoDB for seeding...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log('⚡ Connected to In-Memory MongoDB Server!');
    }

    await User.deleteMany();
    await Crop.deleteMany();
    await Scheme.deleteMany();
    await Tip.deleteMany();

    // Create demo admin and regular user
    const adminUser = await User.create({
      name: 'AgriConnect Admin',
      email: 'admin@agriconnect.com',
      password: 'adminpassword123',
      role: 'admin'
    });

    const demoUser = await User.create({
      name: 'Ramesh Kumar (Farmer)',
      email: 'ramesh@agriconnect.com',
      password: 'userpassword123',
      role: 'user'
    });

    console.log(`Created sample users: ${adminUser.email}, ${demoUser.email}`);

    await Crop.insertMany(seedCrops);
    console.log(`Inserted ${seedCrops.length} crop records`);

    await Scheme.insertMany(seedSchemes);
    console.log(`Inserted ${seedSchemes.length} government schemes`);

    await Tip.insertMany(seedTips);
    console.log(`Inserted ${seedTips.length} agriculture tips`);

    console.log('🌱 Seed Data Successfully Imported!');
    if (mongoServer) {
      console.log('In-memory seed complete.');
    }
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Error with data import: ${error.message}`);
    console.error('📌 Tip: Ensure MongoDB is running locally (e.g. net start MongoDB), or update MONGO_URI in backend/.env with your MongoDB Atlas connection string.\n');
    process.exit(1);
  }
};

importData();
