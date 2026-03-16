// Comprehensive Physics Vocabulary Database
// 30 words covering atomic structure, electrical properties, thermal concepts, and quantum physics - ARABIC EDITION

const physicsVocabulary = [
    // Atomic Structure (8 words)
    {
        id: 1,
        word: "ذرة",
        english: "Atom",
        definition: "أصغر وحدة في المادة تتكون من نواة وإلكترونات.",
        category: "atomic",
        difficulty: "beginner",
        visualization: {
            type: "interactive-atom",
            description: "نموذج ذري تفاعلي"
        },
        contextText: "الذرة هي الوحدة الأساسية للمادة. من وجهة نظر الفيزياء الحديثة، تتكون الذرة من نواة مركزية كثيفة تحتوي على البروتونات والنيوترونات، محاطة بسحابة إلكترونية."
    },
    
    {
        id: 2,
        word: "إلكترون",
        english: "Electron",
        definition: "جسيم صغير بشحنة سالبة يدور حول النواة.",
        category: "atomic",
        difficulty: "beginner",
        visualization: {
            type: "electron-orbit",
            description: "إلكترون يدور حول النواة"
        },
        contextText: "الإلكترون هو جسيم أولي يحمل شحنة سالبة. تلعب الإلكترونات دوراً محورياً في التوصيل الكهربائي وفي التفاعلات الكيميائية."
    },
    
    {
        id: 3,
        word: "بروتون",
        english: "Proton",
        definition: "جسيم موجب الشحنة يوجد داخل النواة.",
        category: "atomic",
        difficulty: "beginner",
        visualization: {
            type: "nucleus-zoom",
            description: "عرض تفصيلي للبروتونات"
        },
        contextText: "البروتونات هي جسيمات موجبة الشحنة تقع في النواة. عدد البروتونات يحدد نوع العنصر."
    },
    
    {
        id: 4,
        word: "نيوترون",
        english: "Neutron",
        definition: "جسيم متعادل الشحنة يوجد داخل النواة.",
        category: "atomic",
        difficulty: "beginner",
        visualization: {
            type: "nucleus-zoom",
            description: "عرض تفصيلي للنيوترونات"
        },
        contextText: "النيوترونات هي جسيمات متعادلة توجد في النواة. تساعد في استقرار النواة."
    },
    
    {
        id: 5,
        word: "نواة",
        english: "Nucleus",
        definition: "مركز الذرة الكثيف الذي يحتوي على البروتونات والنيوترونات.",
        category: "atomic",
        difficulty: "beginner",
        visualization: {
            type: "atom-cross-section",
            description: "مقطع عرضي للنواة"
        },
        contextText: "النواة هي القلب الكثيف في مركز الذرة، وتحتوي على معظم كتلة الذرة."
    },
    
    {
        id: 6,
        word: "مدار",
        english: "Orbital",
        definition: "منطقة حول النواة يحتمل وجود الإلكترون فيها.",
        category: "atomic",
        difficulty: "intermediate",
        visualization: {
            type: "electron-cloud",
            description: "سحابة احتمالية للإلكترون"
        },
        contextText: "الإلكترونات توجد في مناطق تسمى المدارات، وهي تحدد احتمال وجود الإلكترون في مكان ما."
    },
    
    {
        id: 7,
        word: "غلاف",
        english: "Shell",
        definition: "مستوى طاقة رئيسي تدور فيه الإلكترونات.",
        category: "atomic",
        difficulty: "intermediate",
        visualization: {
            type: "energy-levels",
            description: "مستويات الطاقة"
        },
        contextText: "أغلفة الإلكترون هي مستويات طاقة حول النواة. يحدد ترتيب الإلكترونات فيها خصائص العنصر."
    },
    
    {
        id: 8,
        word: "تكافؤ",
        english: "Valence",
        definition: "الإلكترونات الخارجية المسؤولة عن الروابط الكيميائية.",
        category: "atomic",
        difficulty: "intermediate",
        visualization: {
            type: "bonding-demo",
            description: "عرض لروابط التكافؤ"
        },
        contextText: "إلكترونات التكافؤ هي الموجودة في الغلاف الخارجي وتحدد كيف تتفاعل الذرة مع غيرها."
    },

    // Electrical Properties
    {
        id: 9,
        word: "توصيل",
        english: "Conduction",
        definition: "انتقال الكهرباء أو الحرارة عبر المادة.",
        category: "electrical",
        difficulty: "intermediate",
        visualization: {
            type: "electron-flow",
            description: "حركة الإلكترونات في موصل"
        },
        contextText: "التوصيل هو حركة الإلكترونات عبر المادة عند تطبيق جهد كهربائي."
    },
    
    {
        id: 10,
        word: "فجوة الطاقة",
        english: "Band Gap",
        definition: "فرق الطاقة الذي يحدد قدرة المادة على التوصيل.",
        category: "electrical",
        difficulty: "advanced",
        visualization: {
            type: "band-diagram",
            description: "مخطط فجوة الطاقة"
        },
        contextText: "فجوة الطاقة تحدد إن كانت المادة موصلة أو عازلة أو شبه موصلة."
    },
    
    {
        id: 11,
        word: "توصيلية",
        english: "Conductivity",
        definition: "قدرة المادة على تمرير التيار الكهربائي.",
        category: "electrical",
        difficulty: "intermediate",
        visualization: {
            type: "material-comparison",
            description: "مقارنة التوصيل"
        },
        contextText: "التوصيلية تقيس مدى سهولة حركة الكهرباء في المادة. المعادن موصلة جيدة."
    },
    
    {
        id: 12,
        word: "مقاومة",
        english: "Resistance",
        definition: "ممانعة المادة لمرور التيار الكهربائي.",
        category: "electrical",
        difficulty: "intermediate",
        visualization: {
            type: "resistor-demo",
            description: "تجربة المقاومة"
        },
        contextText: "المقاومة هي إعاقة تدفق التيار، وتقاس بالأوم."
    },
    
    {
        id: 13,
        word: "شبه موصل",
        english: "Semiconductor",
        definition: "مادة توصيلها بين الموصل والعازل، مثل السيليكون.",
        category: "electrical",
        difficulty: "intermediate",
        visualization: {
            type: "doping-demo",
            description: "شبه الموصلات"
        },
        contextText: "أشباه الموصلات أساس الإلكترونيات، يمكن التحكم في توصيلها."
    },
    
    {
        id: 14,
        word: "عازل",
        english: "Insulator",
        definition: "مادة لا تسمح بمرور الكهرباء بسهولة.",
        category: "electrical",
        difficulty: "beginner",
        visualization: {
            type: "electron-blockade",
            description: "منع تدفق الإلكترونات"
        },
        contextText: "العوازل تمنع مرور التيار الكهربائي وتحمينا من الصدمات."
    },
    
    {
        id: 15,
        word: "موصل",
        english: "Conductor",
        definition: "مادة تسمح بمرور الكهرباء بسهولة، مثل النحاس.",
        category: "electrical",
        difficulty: "beginner",
        visualization: {
            type: "electron-highway",
            description: "طريق سريع للإلكترونات"
        },
        contextText: "الموصلات تسمح للإلكترونات بالحركة الحرة ونقل الطاقة."
    },
    
    {
        id: 16,
        word: "مستوى طاقة",
        english: "Energy Level",
        definition: "كمية محددة من الطاقة يمتلكها الإلكترون.",
        category: "electrical",
        difficulty: "intermediate",
        visualization: {
            type: "quantum-steps",
            description: "درجات الطاقة"
        },
        contextText: "الإلكترونات توجد فقط في مستويات طاقة محددة."
    },

    // Thermal Concepts
    {
        id: 17,
        word: "اتزان حراري",
        english: "Thermal Equilibrium",
        definition: "تساوي درجة الحرارة بين جسمين متلامسين.",
        category: "thermal",
        difficulty: "intermediate",
        visualization: {
            type: "heat-transfer",
            description: "انتقال الحرارة"
        },
        contextText: "الاتزان الحراري يحدث عندما تتوقف الحرارة عن الانتقال بين جسمين."
    },
    
    {
        id: 18,
        word: "درجة حرارة",
        english: "Temperature",
        definition: "مقياس لسخونة أو برودة الجسم.",
        category: "thermal",
        difficulty: "beginner",
        visualization: {
            type: "particle-motion",
            description: "حركة الجسيمات"
        },
        contextText: "درجة الحرارة تعبر عن سرعة حركة الجسيمات في المادة."
    },
    
    {
        id: 19,
        word: "طاقة حركية",
        english: "Kinetic Energy",
        definition: "الطاقة الناتجة عن حركة الجسم.",
        category: "thermal",
        difficulty: "intermediate",
        visualization: {
            type: "motion-energy",
            description: "طاقة الحركة"
        },
        contextText: "كل جسم متحرك يمتلك طاقة حركية."
    },
    
    {
        id: 20,
        word: "انتقال حرارة",
        english: "Heat Transfer",
        definition: "حركة الطاقة الحرارية من الساخن للبارد.",
        category: "thermal",
        difficulty: "intermediate",
        visualization: {
            type: "transfer-modes",
            description: "طرق انتقال الحرارة"
        },
        contextText: "تنتقل الحرارة بالتوصيل والحمل والإشعاع."
    },
    
    {
        id: 21,
        word: "تأين",
        english: "Ionization",
        definition: "عملية فقد أو اكتساب الذرة للإلكترونات.",
        category: "thermal",
        difficulty: "advanced",
        visualization: {
            type: "electron-removal",
            description: "إزالة الإلكترون"
        },
        contextText: "التأين يحول الذرة إلى أيون مشحون كهربائياً."
    },
    
    {
        id: 22,
        word: "إثارة",
        english: "Excitation",
        definition: "انتقال الإلكترون لمستوى طاقة أعلى.",
        category: "thermal",
        difficulty: "intermediate",
        visualization: {
            type: "energy-absorption",
            description: "امتصاص الطاقة"
        },
        contextText: "الإثارة تحدث عندما تمتص الذرة طاقة ويقفز الإلكترون لأعلى."
    },
    
    {
        id: 23,
        word: "فوتون",
        english: "Photon",
        definition: "جسيم ضوئي يحمل طاقة.",
        category: "thermal",
        difficulty: "intermediate",
        visualization: {
            type: "light-particle",
            description: "جسيم الضوء"
        },
        contextText: "الفوتون هو وحدة الضوء الأساسية."
    },

    // Quantum Physics
    {
        id: 24,
        word: "طول موجة",
        english: "Wavelength",
        definition: "المسافة بين قمتين متتاليتين للموجة.",
        category: "quantum",
        difficulty: "intermediate",
        visualization: {
            type: "wave-spectrum",
            description: "الطيف الموجي"
        },
        contextText: "طول الموجة يحدد نوع ولون الضوء."
    },
    
    {
        id: 25,
        word: "تردد",
        english: "Frequency",
        definition: "عدد الموجات في الثانية الواحدة.",
        category: "quantum",
        difficulty: "intermediate",
        visualization: {
            type: "wave-frequency",
            description: "تردد الموجات"
        },
        contextText: "التردد الأعلى يعني طاقة أكبر للموجة."
    },
    
    {
        id: 26,
        word: "قفزة كمية",
        english: "Quantum Leap",
        definition: "انتقال مفاجئ للإلكترون بين مستويات الطاقة.",
        category: "quantum",
        difficulty: "advanced",
        visualization: {
            type: "electron-transition",
            description: "انتقال الإلكترون"
        },
        contextText: "القفزة الكمية هي انتقال فوري للإلكترون داخل الذرة."
    },
    
    {
        id: 27,
        word: "حالة كمية",
        english: "Quantum State",
        definition: "وصف كامل لخصائص الجسيم.",
        category: "quantum",
        difficulty: "advanced",
        visualization: {
            type: "probability-cloud",
            description: "سحابة الاحتمالات"
        },
        contextText: "الحالة الكمية تصف احتمالات وجود الجسيم وخصائصه."
    },
    
    {
        id: 28,
        word: "سحابة إلكترونية",
        english: "Electron Cloud",
        definition: "المنطقة التي يحتمل وجود الإلكترون فيها حول النواة.",
        category: "quantum",
        difficulty: "intermediate",
        visualization: {
            type: "cloud-density",
            description: "كثافة السحابة"
        },
        contextText: "الإلكترونات تشكل سحابة حول النواة بدلاً من مدارات محددة."
    },
    
    {
        id: 29,
        word: "تكميم الطاقة",
        english: "Energy Quantization",
        definition: "الطاقة تأتي في كميات محددة فقط.",
        category: "quantum",
        difficulty: "advanced",
        visualization: {
            type: "discrete-steps",
            description: "درجات منفصلة"
        },
        contextText: "الطاقة ليست مستمرة بل تأتي في حزم محددة."
    },
    
    {
        id: 30,
        word: "تأثير كهروضوئي",
        english: "Photoelectric Effect",
        definition: "انبعاث الإلكترونات عند سقوط الضوء على المادة.",
        category: "quantum",
        difficulty: "advanced",
        visualization: {
            type: "electron-ejection",
            description: "انبعاث الإلكترون"
        },
        contextText: "الضوء يمكنه طرد الإلكترونات من المعدن."
    }
];

// Helper functions for data management
const wordCategories = {
    atomic: { name: "التركيب الذري", color: "#3b82f6" },
    electrical: { name: "الخواص الكهربائية", color: "#10b981" },
    thermal: { name: "المفاهيم الحرارية", color: "#f59e0b" },
    quantum: { name: "الفيزياء الكمية", color: "#8b5cf6" }
};

const departments = {
    atomic: {
        title: "التركيب الذري",
        description: "يدرس هذا القسم بنية الذرة والجسيمات المكونة لها، وأساليب تمثيل الذرة، والتفاعلات الذرية.",
        colleges: ["كلية العلوم", "كلية الهندسة الكيميائية", "كلية الفيزياء التطبيقية"]
    },
    electrical: {
        title: "الخواص الكهربائية",
        description: "يتناول هذا القسم الكهرباء والمغناطيسية، التوصيل، المقاومة، الدوائر، والمكونات الإلكترونية.",
        colleges: ["كلية الهندسة الكهربائية", "كلية الإلكترونيات", "كلية تقنية الطاقة"]
    },
    thermal: {
        title: "المفاهيم الحرارية",
        description: "يركز هذا القسم على الحرارة والطاقة، قوانين الديناميكا الحرارية، وطرق انتقال الحرارة.",
        colleges: ["كلية الهندسة الميكانيكية", "كلية علوم البيئة", "كلية الطاقة المتجددة"]
    },
    quantum: {
        title: "الفيزياء الكمية",
        description: "يتعامل هذا القسم مع الظواهر على المستوى الذري ودون الذري، مثل حالات الطاقة والموجات والجسيمات.",
        colleges: ["كلية الفيزياء النظرية", "كلية علوم الحاسب (الفيزياء الحاسوبية)", "كلية العلوم الدقيقة"]
    }
};

function getWordById(id) {
    return physicsVocabulary.find(word => word.id === id);
}

function getWordsByCategory(category) {
    return physicsVocabulary.filter(word => word.category === category);
}

function getWordsByDifficulty(difficulty) {
    return physicsVocabulary.filter(word => word.difficulty === difficulty);
}

function searchWords(query) {
    const q = query.toLowerCase();
    return physicsVocabulary.filter(word => 
        word.word.includes(q) || 
        word.english.toLowerCase().includes(q) ||
        word.definition.includes(q)
    );
}

function getRandomWords(count = 10) {
    const shuffled = [...physicsVocabulary].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        physicsVocabulary,
        wordCategories,
        departments,
        getWordById,
        getWordsByCategory,
        getWordsByDifficulty,
        searchWords,
        getRandomWords
    };
}
