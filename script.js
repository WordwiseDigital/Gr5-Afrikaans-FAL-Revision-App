document.addEventListener('DOMContentLoaded', () => {
    const topicSelection = document.getElementById('topic-selection');
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const feedback = document.getElementById('feedback');
    const nextButton = document.getElementById('next-button');
    const scoreSpan = document.getElementById('score');

    let score = 0;
    let currentTopic = '';
    let currentQuestionIndex = 0;
    let questions = [];

    const gameData = {
        'Voornaamwoorde': [
            { question: "Kies die korrekte voornaamwoord: '___ het die boek gelees.'", options: ["Ek", "My", "Myne"], answer: "Ek" },
            { question: "Kies die korrekte voornaamwoord: 'Die hond behoort aan ___.'", options: ["sy", "haar", "hom"], answer: "hom" },
            { question: "Die boek is myne, nie ___ nie.", options: ["joune", "jy", "jou"], answer: "joune" },
            { question: "___ gaan saam met ons.", options: ["Hulle", "Hul", "Hulle s'n"], answer: "Hulle" },
            { question: "Jan het die bal. Gee dit vir ___.", options: ["hy", "hom", "syne"], answer: "hom" },
            { question: "Die present is vir ___.", options: ["jy", "jou", "joune"], answer: "jou" },
            { question: "Ons het ___ huis geverf.", options: ["ons", "ons s'n", "onse"], answer: "ons" },
            { question: "Die rooi motor is ___.", options: ["my", "myne", "ek"], answer: "myne" },
            { question: "Wie se pen is dit? Dit is ___.", options: ["sy", "syne", "hom"], answer: "syne" },
            { question: "Die hond het ___ stert geswaai.", options: ["sy", "hom", "dit"], answer: "sy" },
            { question: "___ is my beste vriend.", options: ["Hy", "Hom", "Syne"], answer: "Hy" },
            { question: "Ek het ___ in die winkel gesien.", options: ["sy", "haar", "hare"], answer: "haar" },
            { question: "Die kinders speel in die tuin. ___ is baie gelukkig.", options: ["Hulle", "Hul", "Hulle s'n"], answer: "Hulle" },
            { question: "Die blomme is vir my ma. Ek gee ___ vir haar.", options: ["dit", "hulle", "haar"], answer: "hulle" },
            { question: "Die seun wat daar loop, is ___ broer.", options: ["my", "myne", "ek"], answer: "my" },
            { question: "Die hond lek ___ pote.", options: ["sy", "syne", "hom"], answer: "sy" },
            { question: "Kan ___ my asseblief help?", options: ["jy", "jou", "joune"], answer: "jy" },
            { question: "Die koek is vir almal. Almal kan 'n stukkie van ___ kry.", options: ["dit", "hom", "hulle"], answer: "dit" },
            { question: "Die fietse in die motorhuis is ___.", options: ["ons", "ons s'n", "onse"], answer: "ons s'n" },
            { question: "Die storie wat ___ vertel het, was baie interessant.", options: ["hy", "hom", "syne"], answer: "hy" }
        ],
        'Voorsetsels': [
            { question: "Kies die korrekte voorsetsel: 'Die kat slaap ___ die bed.'", options: ["op", "in", "onder"], answer: "op" },
            { question: "Kies die korrekte voorsetsel: 'Hy gaan ___ die skool.'", options: ["na", "van", "met"], answer: "na" },
            { question: "Die boek lê ___ die tafel.", options: ["op", "oor", "deur"], answer: "op" },
            { question: "Ons ry ___ die brug.", options: ["onder", "oor", "langs"], answer: "oor" },
            { question: "Die kinders speel ___ die huis.", options: ["agter", "op", "in"], answer: "agter" },
            { question: "Hy sit ___ die stoel.", options: ["in", "op", "langs"], answer: "op" },
            { question: "Die voël vlieg ___ die wolke.", options: ["bo", "onder", "tussen"], answer: "bo" },
            { question: "Die motor is ___ die motorhuis.", options: ["in", "op", "by"], answer: "in" },
            { question: "Sy stap ___ die straat.", options: ["in", "oor", "op"], answer: "oor" },
            { question: "Die son skyn ___ die dag.", options: ["gedurende", "na", "voor"], answer: "gedurende" },
            { question: "Hy is bang ___ die donker.", options: ["vir", "van", "met"], answer: "vir" },
            { question: "Ons wag ___ die bus.", options: ["vir", "op", "by"], answer: "vir" },
            { question: "Die hond hardloop ___ die kat.", options: ["agter", "voor", "langs"], answer: "agter" },
            { question: "Sy is ___ die telefoon.", options: ["op", "in", "aan"], answer: "op" },
            { question: "Die sleutels is ___ my sak.", options: ["in", "op", "onder"], answer: "in" },
            { question: "Hy kom ___ Suid-Afrika.", options: ["van", "uit", "in"], answer: "van" },
            { question: "Die prent hang ___ die muur.", options: ["teen", "op", "in"], answer: "teen" },
            { question: "Ons gaan ___ vakansie.", options: ["op", "met", "in"], answer: "op" },
            { question: "Die kat spring ___ die muur.", options: ["oor", "op", "onder"], answer: "oor" },
            { question: "Die kinders is ___ die skool.", options: ["by", "in", "op"], answer: "by" }
        ],
        'Byvoeglike Naamwoorde': [
            { question: "Kies die korrekte byvoeglike naamwoord: 'Die ___ motor ry vinnig.'", options: ["rooi", "sing", "hard"], answer: "rooi" },
            { question: "Identifiseer die byvoeglike naamwoord in die sin: 'Die pragtige blom ruik lekker.'", options: ["pragtige", "blom", "ruik"], answer: "pragtige" },
            { question: "Die ___ son skyn helder.", options: ["warm", "koue", "nat"], answer: "warm" },
            { question: "Die meisie het 'n ___ rok aan.", options: ["mooi", "lelike", "groot"], answer: "mooi" },
            { question: "Die ___ hond blaf hard.", options: ["groot", "klein", "stil"], answer: "groot" },
            { question: "Die ___ man stap stadig.", options: ["ou", "jong", "vinnige"], answer: "ou" },
            { question: "Die baba het ___ handjies.", options: ["klein", "groot", "lang"], answer: "klein" },
            { question: "Die ___ boom het baie blare.", options: ["groen", "kaal", "kort"], answer: "groen" },
            { question: "Die ___ water is verfrissend.", options: ["koel", "warm", "vuil"], answer: "koel" },
            { question: "Die storie was baie ___.", options: ["interessant", "vervelig", "lank"], answer: "interessant" },
            { question: "Die ___ seun het die wedloop gewen.", options: ["vinnige", "stadige", "kort"], answer: "vinnige" },
            { question: "Die ___ kat slaap heeldag.", options: ["lui", "besige", "speelse"], answer: "lui" },
            { question: "Die ___ meisie is baie slim.", options: [" intelligente", "dom", "sterk"], answer: "intelligente" },
            { question: "Die ___ sjokolade smaak heerlik.", options: ["soet", "suur", "sout"], answer: "soet" },
            { question: "Die ___ gebou is baie hoog.", options: ["hoë", "lae", "klein"], answer: "hoë" },
            { question: "Die ___ hond is baie lojaal.", options: ["getroue", "vals", "wilde"], answer: "getroue" },
            { question: "Die ___ dag was lank en vermoeiend.", options: ["besige", "rustige", "kort"], answer: "besige" },
            { question: "Die ___ see is kalm vandag.", options: ["blou", "groen", "grys"], answer: "blou" },
            { question: "Die ___ man het 'n grys baard.", options: ["wyse", "dwase", "jong"], answer: "wyse" },
            { question: "Die ___ kos is baie geurig.", options: ["smaaklike", "smaaklose", "slegte"], answer: "smaaklike" }
        ],
        'Selfstandige Naamwoorde': [
            { question: "Wat is die selfstandige naamwoord in die sin: 'Die seun skop die bal.'?", options: ["seun", "skop", "die"], answer: "seun" },
            { question: "Kies die selfstandige naamwoord.", options: ["hardloop", "huis", "gelukkig"], answer: "huis" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die meisie lees 'n boek.'", options: ["meisie", "lees", "'n"], answer: "meisie" },
            { question: "Watter woord is 'n selfstandige naamwoord?", options: ["motor", "ry", "vinnig"], answer: "motor" },
            { question: "Kies die selfstandige naamwoord in die sin: 'Die hond blaf vir die kat.'", options: ["hond", "blaf", "vir"], answer: "hond" },
            { question: "Wat is die selfstandige naamwoord?", options: ["appel", "eet", "rooi"], answer: "appel" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die onderwyser skryf op die bord.'", options: ["onderwyser", "skryf", "op"], answer: "onderwyser" },
            { question: "Kies die selfstandige naamwoord.", options: ["stoel", "sit", "gemaklik"], answer: "stoel" },
            { question: "Watter woord is 'n selfstandige naamwoord?", options: ["blom", "groei", "mooi"], answer: "blom" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die baba drink melk.'", options: ["baba", "drink", "die"], answer: "baba" },
            { question: "Kies die selfstandige naamwoord in die sin: 'Die vliegtuig vlieg hoog.'", options: ["vliegtuig", "vlieg", "hoog"], answer: "vliegtuig" },
            { question: "Wat is die selfstandige naamwoord?", options: ["son", "skyn", "helder"], answer: "son" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die boom het groen blare.'", options: ["boom", "het", "groen"], answer: "boom" },
            { question: "Kies die selfstandige naamwoord.", options: ["skip", "seil", "groot"], answer: "skip" },
            { question: "Watter woord is 'n selfstandige naamwoord?", options: ["telefoon", "lui", "hard"], answer: "telefoon" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die dokter help die pasiënt.'", options: ["dokter", "help", "die"], answer: "dokter" },
            { question: "Kies die selfstandige naamwoord in die sin: 'Die kinders speel in die park.'", options: ["kinders", "speel", "in"], answer: "kinders" },
            { question: "Wat is die selfstandige naamwoord?", options: ["maan", "skyn", "helder"], answer: "maan" },
            { question: "Identifiseer die selfstandige naamwoord: 'Die boer werk op die plaas.'", options: ["boer", "werk", "op"], answer: "boer" },
            { question: "Kies die selfstandige naamwoord.", options: ["rivier", "vloei", "vinnig"], answer: "rivier" }
        ],
        'Werkwoorde': [
            { question: "Wat is die werkwoord in die sin: 'Die voël sing in die boom.'?", options: ["sing", "voël", "boom"], answer: "sing" },
            { question: "Kies die werkwoord.", options: ["eet", "stoel", "groot"], answer: "eet" },
            { question: "Identifiseer die werkwoord: 'Die seun skop die bal.'", options: ["skop", "seun", "bal"], answer: "skop" },
            { question: "Watter woord is 'n werkwoord?", options: ["hardloop", "vinnig", "pad"], answer: "hardloop" },
            { question: "Kies die werkwoord in die sin: 'Die meisie lees 'n boek.'", options: ["lees", "meisie", "boek"], answer: "lees" },
            { question: "Wat is die werkwoord?", options: ["slaap", "bed", "sag"], answer: "slaap" },
            { question: "Identifiseer die werkwoord: 'Die hond blaf vir die kat.'", options: ["blaf", "hond", "kat"], answer: "blaf" },
            { question: "Kies die werkwoord.", options: ["skryf", "brief", "lank"], answer: "skryf" },
            { question: "Watter woord is 'n werkwoord?", options: ["swem", "water", "koud"], answer: "swem" },
            { question: "Identifiseer die werkwoord: 'Die baba drink melk.'", options: ["drink", "baba", "melk"], answer: "drink" },
            { question: "Kies die werkwoord in die sin: 'Die vliegtuig vlieg hoog.'", options: ["vlieg", "vliegtuig", "hoog"], answer: "vlieg" },
            { question: "Wat is die werkwoord?", options: ["dans", "musiek", "vrolik"], answer: "dans" },
            { question: "Identifiseer die werkwoord: 'Die onderwyser praat met die klas.'", options: ["praat", "onderwyser", "klas"], answer: "praat" },
            { question: "Kies die werkwoord.", options: ["bou", "huis", "groot"], answer: "bou" },
            { question: "Watter woord is 'n werkwoord?", options: ["sing", "liedjie", "mooi"], answer: "sing" },
            { question: "Identifiseer die werkwoord: 'Die kat jaag die muis.'", options: ["jaag", "kat", "muis"], answer: "jaag" },
            { question: "Kies die werkwoord in die sin: 'Die kinders speel buite.'", options: ["speel", "kinders", "buite"], answer: "speel" },
            { question: "Wat is die werkwoord?", options: ["help", "ma", "kosmaak"], answer: "help" },
            { question: "Identifiseer die werkwoord: 'Die son sak in die weste.'", options: ["sak", "son", "weste"], answer: "sak" },
            { question: "Kies die werkwoord.", options: ["ry", "fiets", "vinnig"], answer: "ry" }
        ],
        'Sinonieme': [
            { question: "Wat is 'n sinoniem vir 'bly'?", options: ["gelukkig", "hartseer", "kwaad"], answer: "gelukkig" },
            { question: "Wat is 'n sinoniem vir 'praat'?", options: ["gesels", "luister", "skryf"], answer: "gesels" },
            { question: "Wat is 'n sinoniem vir 'mooi'?", options: ["pragtig", "lelik", "groot"], answer: "pragtig" },
            { question: "Wat is 'n sinoniem vir 'groot'?", options: ["enorm", "klein", "min"], answer: "enorm" },
            { question: "Wat is 'n sinoniem vir 'vinnig'?", options: ["gou", "stadig", "lank"], answer: "gou" },
            { question: "Wat is 'n sinoniem vir 'koud'?", options: ["yskoud", "warm", "lou"], answer: "yskoud" },
            { question: "Wat is 'n sinoniem vir 'maklik'?", options: ["eenvoudig", "moeilik", "ingewikkeld"], answer: "eenvoudig" },
            { question: "Wat is 'n sinoniem vir 'present'?", options: ["geskenk", "rekening", "brief"], answer: "geskenk" },
            { question: "Wat is 'n sinoniem vir 'pad'?", options: ["weg", "huis", "motor"], answer: "weg" },
            { question: "Wat is 'n sinoniem vir 'kwaad'?", options: ["woedend", "bly", "kalm"], answer: "woedend" },
            { question: "Wat is 'n sinoniem vir 'ou'?", options: ["bejaard", "jonk", "nuut"], answer: "bejaard" },
            { question: "Wat is 'n sinoniem vir 'kos'?", options: ["voedsel", "drank", "klere"], answer: "voedsel" },
            { question: "Wat is 'n sinoniem vir 'huis'?", options: ["woning", "skool", "winkel"], answer: "woning" },
            { question: "Wat is 'n sinoniem vir 'lag'?", options: ["giggel", "huil", "skree"], answer: "giggel" },
            { question: "Wat is 'n sinoniem vir 'spring'?", options: ["hop", "sit", "lê"], answer: "hop" },
            { question: "Wat is 'n sinoniem vir 'dink'?", options: ["peins", "praat", "doen"], answer: "peins" },
            { question: "Wat is 'n sinoniem vir 'kar'?", options: ["motor", "fiets", "trein"], answer: "motor" },
            { question: "Wat is 'n sinoniem vir 'seer'?", options: ["pyn", "plesier", "vreugde"], answer: "pyn" },
            { question: "Wat is 'n sinoniem vir 'slim'?", options: ["intelligent", "dom", "dapper"], answer: "intelligent" },
            { question: "Wat is 'n sinoniem vir 'storie'?", options: ["verhaal", "gedig", "lied"], answer: "verhaal" }
        ],
        'Antonieme': [
            { question: "Wat is die antoniem van 'groot'?", options: ["klein", "lank", "wyd"], answer: "klein" },
            { question: "Wat is die antoniem van 'warm'?", options: ["koud", "hitte", "son"], answer: "koud" },
            { question: "Wat is die antoniem van 'dag'?", options: ["nag", "oggend", "middag"], answer: "nag" },
            { question: "Wat is die antoniem van 'bly'?", options: ["hartseer", "gelukkig", "kwaad"], answer: "hartseer" },
            { question: "Wat is die antoniem van 'vinnig'?", options: ["stadig", "gou", "vroeg"], answer: "stadig" },
            { question: "Wat is die antoniem van 'mooi'?", options: ["lelik", "pragtig", "skoon"], answer: "lelik" },
            { question: "Wat is die antoniem van 'maklik'?", options: ["moeilik", "eenvoudig", "lig"], answer: "moeilik" },
            { question: "Wat is die antoniem van 'jonk'?", options: ["oud", "nuut", "vars"], answer: "oud" },
            { question: "Wat is die antoniem van 'baie'?", options: ["min", "meeste", "alles"], answer: "min" },
            { question: "Wat is die antoniem van 'lag'?", options: ["huil", "glimlag", "sing"], answer: "huil" },
            { question: "Wat is die antoniem van 'bo'?", options: ["onder", "op", "langs"], answer: "onder" },
            { question: "Wat is die antoniem van 'vriend'?", options: ["vyand", "maat", "broer"], answer: "vyand" },
            { question: "Wat is die antoniem van 'begin'?", options: ["eindig", "start", "gaan"], answer: "eindig" },
            { question: "Wat is die antoniem van 'soet'?", options: ["suur", "sout", "bitter"], answer: "suur" },
            { question: "Wat is die antoniem van 'vol'?", options: ["leeg", "besig", "groot"], answer: "leeg" },
            { question: "Wat is die antoniem van 'hard'?", options: ["sag", "sterk", "luid"], answer: "sag" },
            { question: "Wat is die antoniem van 'skoon'?", options: ["vuil", "netjies", "wit"], answer: "vuil" },
            { question: "Wat is die antoniem van 'liefde'?", options: ["haat", "vreugde", "vriendskap"], answer: "haat" },
            { question: "Wat is die antoniem van 'altyd'?", options: ["nooit", "soms", "dikwels"], answer: "nooit" },
            { question: "Wat is die antoniem van 'donker'?", options: ["lig", "swart", "nag"], answer: "lig" }
        ],
        'Meervoude': [
            { question: "Wat is die meervoud van 'hond'?", options: ["honde", "hondde", "honds"], answer: "honde" },
            { question: "Wat is die meervoud van 'boek'?", options: ["boeke", "boeks", "boeken"], answer: "boeke" },
            { question: "Wat is die meervoud van 'kat'?", options: ["katte", "kats", "katten"], answer: "katte" },
            { question: "Wat is die meervoud van 'stoel'?", options: ["stoele", "stoels", "stoelen"], answer: "stoele" },
            { question: "Wat is die meervoud van 'tafel'?", options: ["tafels", "tafele", "tafelen"], answer: "tafels" },
            { question: "Wat is die meervoud van 'man'?", options: ["mans", "manne", "manen"], answer: "manne" },
            { question: "Wat is die meervoud van 'vrou'?", options: ["vroue", "vrous", "vrouen"], answer: "vroue" },
            { question: "Wat is die meervoud van 'kind'?", options: ["kinders", "kinde", "kinden"], answer: "kinders" },
            { question: "Wat is die meervoud van 'voet'?", options: ["voete", "voets", "voeten"], answer: "voete" },
            { question: "Wat is die meervoud van 'oog'?", options: ["oë", "oëe", "oëns"], answer: "oë" },
            { question: "Wat is die meervoud van 'dag'?", options: ["dae", "dags", "dagen"], answer: "dae" },
            { question: "Wat is die meervoud van 'pad'?", options: ["paaie", "pads", "paden"], answer: "paaie" },
            { question: "Wat is die meervoud van 'skip'?", options: ["skepe", "skips", "skipen"], answer: "skepe" },
            { question: "Wat is die meervoud van 'stad'?", options: ["stede", "stads", "staden"], answer: "stede" },
            { question: "Wat is die meervoud van 'hemp'?", options: ["hemde", "hemps", "hempen"], answer: "hemde" },
            { question: "Wat is die meervoud van 'vriend'?", options: ["vriende", "vriends", "vrienden"], answer: "vriende" },
            { question: "Wat is die meervoud van 'kas'?", options: ["kaste", "kasse", "kasten"], answer: "kaste" },
            { question: "Wat is die meervoud van 'glas'?", options: ["glase", "glasse", "glasen"], answer: "glase" },
            { question: "Wat is die meervoud van 'plaas'?", options: ["plase", "plaase", "plasen"], answer: "plase" },
            { question: "Wat is die meervoud van 'brief'?", options: ["briewe", "briefs", "briefen"], answer: "briewe" }
        ],
        'Verkleining': [
            { question: "Wat is die verkleining van 'tafel'?", options: ["tafeltjie", "tafelie", "tafeltjie"], answer: "tafeltjie" },
            { question: "Wat is die verkleining van 'stoel'?", options: ["stoeltjie", "stoelie", "stoelpie"], answer: "stoeltjie" },
            { question: "Wat is die verkleining van 'hond'?", options: ["hondjie", "hondie", "hondjie"], answer: "hondjie" },
            { question: "Wat is die verkleining van 'kat'?", options: ["katjie", "kattie", "katjie"], answer: "katjie" },
            { question: "Wat is die verkleining van 'boek'?", options: ["boekie", "boekkie", "boekie"], answer: "boekie" },
            { question: "Wat is die verkleining van 'man'?", options: ["mannetjie", "manie", "mannetjie"], answer: "mannetjie" },
            { question: "Wat is die verkleining van 'vrou'?", options: ["vroutjie", "vrouie", "vroutjie"], answer: "vroutjie" },
            { question: "Wat is die verkleining van 'kind'?", options: ["kindjie", "kindie", "kindjie"], answer: "kindjie" },
            { question: "Wat is die verkleining van 'voet'?", options: ["voetjie", "voetie", "voetjie"], answer: "voetjie" },
            { question: "Wat is die verkleining van 'oog'?", options: ["ogie", "oogie", "ogie"], answer: "ogie" },
            { question: "Wat is die verkleining van 'dag'?", options: ["daggie", "dagie", "daggie"], answer: "daggie" },
            { question: "Wat is die verkleining van 'pad'?", options: ["paadjie", "padie", "paadjie"], answer: "paadjie" },
            { question: "Wat is die verkleining van 'skip'?", options: ["skipie", "skippie", "skipie"], answer: "skipie" },
            { question: "Wat is die verkleining van 'stad'?", options: ["stadie", "stadjie", "stadjie"], answer: "stadjie" },
            { question: "Wat is die verkleining van 'hemp'?", options: ["hempie", "hemppie", "hempie"], answer: "hempie" },
            { question: "Wat is die verkleining van 'vriend'?", options: ["vriendjie", "vriendie", "vriendjie"], answer: "vriendjie" },
            { question: "Wat is die verkleining van 'kas'?", options: ["kassie", "kassie", "kasie"], answer: "kassie" },
            { question: "Wat is die verkleining van 'glas'?", options: ["glasie", "glassie", "glasie"], answer: "glasie" },
            { question: "Wat is die verkleining van 'plaas'?", options: ["plasie", "plassie", "plasie"], answer: "plasie" },
            { question: "Wat is die verkleining van 'brief'?", options: ["briefie", "briefie", "briefpie"], answer: "briefie" }
        ]
    };

    function loadTopics() {
        for (const topic in gameData) {
            const button = document.createElement('button');
            button.className = 'topic-button';
            button.textContent = topic;
            button.addEventListener('click', () => selectTopic(topic, button));
            topicSelection.appendChild(button);
        }
    }

    function selectTopic(topic, button) {
        currentTopic = topic;
        const buttons = document.querySelectorAll('.topic-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startButton.addEventListener('click', () => {
        if (currentTopic) {
            questions = gameData[currentTopic];
            shuffle(questions);
            startScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            currentQuestionIndex = 0;
            score = 0;
            scoreSpan.textContent = score;
            loadQuestion();
        } else {
            alert('Kies asseblief eers n onderwerp!');
        }
    });

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            feedback.classList.add('hidden');
            nextButton.classList.add('hidden');
        } else {
            endGame();
        }
    });

    function loadQuestion() {
        const question = questions[currentQuestionIndex];
        questionText.textContent = question.question;
        answerOptions.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-button';
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(option, button));
            answerOptions.appendChild(button);
        });
    }

    function selectAnswer(selectedOption, button) {
        const question = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll('.answer-button');
        buttons.forEach(btn => btn.disabled = true);

        if (selectedOption === question.answer) {
            score++;
            scoreSpan.textContent = score;
            button.classList.add('correct');
            feedback.textContent = 'Reg!';
            feedback.style.color = '#28a745';
        } else {
            button.classList.add('incorrect');
            feedback.textContent = `Verkeerd. Die korrekte antwoord is ${question.answer}.`;
            feedback.style.color = '#dc3545';
        }

        feedback.classList.remove('hidden');
        nextButton.classList.remove('hidden');
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        alert(`Speletjie verby! Jou finale telling is ${score}/${questions.length}.`);
        currentTopic = '';
        const buttons = document.querySelectorAll('.topic-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
    }

    loadTopics();
});
