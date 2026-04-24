const MODULES = [
  {
    id: 1, emoji: '🟣',
    title: 'Šta je veštačka inteligencija?',
    goal: 'Razumevanje osnovnih pojmova i razvoja AI.',
    desc: 'Nauči osnovne pojmove, razliku između AI i mašinskog učenja, i otkrij koliko AI već koristiš svakog dana.',
    lessons: [
      {
        id: 1,
        title: 'Šta je zapravo veštačka inteligencija?',
        intro: 'Možda zamišljaš robote iz filmova koji preuzimaju svet. Ali u stvarnosti, veštačka inteligencija je mnogo jednostavnija – i mnogo bliža tebi nego što misliš. Već je koristiš – svaki dan.',
        sections: [
          {
            heading: 'Definicija AI',
            content: 'Veštačka inteligencija je oblast računarskih nauka koja razvija sisteme sposobne da obavljaju zadatke koji zahtevaju ljudsku inteligenciju. To znači da mašina, računar ili softver može da "razmišlja" – do određene mere.\n\nZadaci koje AI može da izvršava uključuju:\n• Prepoznavanje glasa (kao Alexa ili Siri)\n• Razumevanje i prevođenje jezika (kao Google Translate)\n• Prepoznavanje slika (kao otključavanje telefona licem)\n• Donošenje odluka na osnovu podataka (kao preporuke na Netflixu)\n• Pisanje tekstova (kao što to radi ChatGPT)'
          },
          {
            heading: 'Vrste AI po "snazi"',
            content: 'Uska (slaba) AI – Obavlja jedan konkretan zadatak. Primer: preporuke na Spotify, filter spama.\n\nOpšta (jaka) AI – Razume i rešava širi spektar zadataka, kao čovek. Još ne postoji.\n\nSuperinteligencija – Inteligencija iznad ljudske. Zamišljena u filmovima, kao u "Her" ili "Ex Machina".\n\nU praksi, sve što koristiš danas spada u usku AI. I to je sasvim dovoljno da ti pomogne i olakša život.'
          },
          {
            heading: 'Gde već koristiš AI?',
            content: '• Telefoni: prepoznavanje glasa, kamera koja prilagođava boje\n• Internet: Google pretraga, automatsko dovršavanje rečenica\n• Kupovina: reklame koje ti "čitaju misli"\n• Društvene mreže: TikTok, Instagram i YouTube preporuke\n• Banke: AI koji proverava transakcije radi zaštite od prevare\n• Navigacija: Google Maps koji predviđa gužve'
          },
        ],
        keyTerms: [
          { term: 'Algoritam', def: 'Skup uputstava koje mašina sledi da reši problem' },
          { term: 'Model', def: '"Mozak" AI sistema koji uči iz podataka' },
          { term: 'Trening podaci', def: 'Primeri koje dajemo AI da uči' },
          { term: 'Predikcija', def: 'Ono što AI "pretpostavlja" na osnovu naučenog' },
        ],
        task: 'Razmisli i zapiši 5 stvari koje koristiš svakodnevno a u sebi sadrže AI. Primer: otključavanje telefona licem, TikTok feed, Gmail predlozi, YouTube preporuke, chatbot podrška.'
      },
      {
        id: 2,
        title: 'AI, mašinsko učenje i duboko učenje – razlike',
        intro: 'Kada se priča o veštačkoj inteligenciji, često se koriste izrazi AI, mašinsko učenje (ML) i duboko učenje (DL) — kao da znače isto. Ali nisu isto. Zapravo, oni funkcionišu kao ruske babuške – svaki naredni pojam je deo onog većeg.',
        sections: [
          {
            heading: 'Šta je AI?',
            content: 'Veštačka inteligencija je "kišobran" pojam koji obuhvata sve što se zove "pametna tehnologija". AI ne znači da mašina mora biti svemoguća – dovoljno je da ima deo sposobnosti koje poseduje čovek.\n\nPrimer: Navigacija koja predlaže bržu rutu na osnovu saobraćaja — koristi AI da "razmisli" umesto tebe.'
          },
          {
            heading: 'Šta je mašinsko učenje (ML)?',
            content: 'Mašinsko učenje je metod učenja pomoću koga AI samostalno uči iz podataka, bez da joj eksplicitno kažeš kako da radi. Umesto da mašini daješ precizna pravila, ti joj daješ primere i pustiš je da sama zaključi obrasce.\n\nMašinsko učenje je svuda:\n• Gmail filteri za spam\n• Preporuke na YouTube-u\n• Personalizovane reklame\n• Detekcija prevare u banci\n\nAI bez ML je "glupa" – izvršava samo ono što joj kažeš. AI sa ML – uči i prilagođava se.'
          },
          {
            heading: 'Šta je duboko učenje (DL)?',
            content: 'Duboko učenje je poseban oblik mašinskog učenja koji koristi neuronske mreže – softverske modele koji imitiraju kako funkcioniše ljudski mozak. Zove se "duboko" jer sadrži više slojeva (layera) "neurona".\n\nDL omogućava:\n• Prepoznavanje lica na telefonu\n• Generisanje slika (npr. DALL·E)\n• Prepoznavanje glasa (npr. Google Assistant)\n• AI koji može da piše tekstove (kao ChatGPT)\n\nDuboko učenje zahteva mnogo više podataka i snažnije računare, ali daje najpreciznije rezultate.'
          },
        ],
        keyTerms: [
          { term: 'AI', def: 'Svaki sistem koji imitira ljudsku inteligenciju' },
          { term: 'ML', def: 'AI koji uči iz podataka bez eksplicitnih pravila' },
          { term: 'DL', def: 'Napredno ML koje koristi neuronske mreže' },
          { term: 'Neuronska mreža', def: 'Mreža "digitalnih neurona" koja omogućava duboko učenje' },
        ],
        task: 'Pogledaj 5 aplikacija koje koristiš svakog dana. Pokušaj da zaključiš da li koriste AI (opšti nivo), Mašinsko učenje, ili Duboko učenje. Primer: Face unlock = Duboko učenje, Gmail spam = Mašinsko učenje.'
      },
      {
        id: 3,
        title: 'Gde koristiš AI a da to ne znaš?',
        intro: 'AI nije ni skupa, ni daleka, ni mistična. Ona je nevidljiva, a moćna. Prisutna je u svemu što koristiš: od aplikacija koje te zabavljaju, preko alata koji ti pomažu da učiš, do stvari koje te štite.',
        sections: [
          {
            heading: 'AI u navigaciji i putovanjima',
            content: 'Google Maps i Waze koriste AI da:\n• Prikupe informacije o saobraćaju u realnom vremenu\n• Predvide kada će biti gužva i da li ćeš zakasniti\n• Automatski predlože alternativne rute\n\nAplikacije kao što su Bolt i Uber koriste AI da izračunaju vreme vožnje, odrede optimalnu cenu i predvide kada ćeš tražiti vožnju.'
          },
          {
            heading: 'AI u fotografiji i obrazovanju',
            content: 'AI u mobilnim kamerama:\n• Automatski prepoznaje da li je dan ili noć\n• Prepoznaje osobe, hranu, pejzaže, tekst\n• Aktivira portret mod kada vidi lice\n• AI čak "pegla" tvoje lice u realnom vremenu\n\nAI u obrazovanju:\n• Duolingo koristi AI da ti predloži ponavljanje lekcija koje ti ne idu\n• Khan Academy koristi AI asistenta za pomoć u rešavanju zadataka\n• Sistemi za testiranje automatski prepoznaju gde najviše grešiš'
          },
          {
            heading: 'AI kod kuće i u javnim servisima',
            content: 'AI u kućnim uređajima:\n• Televizori preporučuju ti filmove\n• Pametni usisivači prave mapu stana i uče gde ima više prljavštine\n• Pametni termostati uče tvoj ritam\n\nAI u zdravstvenim sistemima:\n• Pomaže lekarima da analiziraju laboratorijske nalaze\n• Sistemi za trijažu koriste AI upitnike za početnu procenu rizika'
          },
        ],
        keyTerms: [
          { term: 'Prediktivna AI', def: 'AI koja predviđa buduće događaje na osnovu obrazaca iz prošlosti' },
          { term: 'Personalizacija', def: 'Prilagođavanje sadržaja konkretnom korisniku na osnovu njegovih navika' },
          { term: 'Računarska vizija', def: 'Sposobnost AI da "vidi" i interpretira slike i video' },
          { term: 'Preporuka', def: 'AI sistem koji predlaže sadržaj na osnovu prethodnog ponašanja' },
        ],
        task: 'Zamisli da objašnjavaš prijatelju "šta koristiš svaki dan što ima AI u sebi". Napiši 5 konkretnih primera koje nikad nisi svesno povezivao sa veštačkom inteligencijom.'
      },
    ]
  },
  {
    id: 2, emoji: '🔵',
    title: 'Kako AI rešava probleme?',
    goal: 'Upoznavanje sa osnovnim tehnikama rešavanja problema u AI.',
    desc: 'Zaviri u logiku, algoritme i strategije koje AI koristi da donosi odluke i rešava zadatke – čak i u igrama.',
    lessons: [
      {
        id: 1,
        title: 'Šta su problemi za AI i kako ih rešava?',
        intro: 'Za AI, sve što radimo može se opisati kao problem – ne u negativnom smislu, već kao zadatak koji ima početak, kraj i niz mogućih rešenja između.',
        sections: [
          { heading: 'Kako izgleda problem u očima AI?', content: 'AI ne zna da je nešto važno, komplikovano ili hitno – ona zna samo da ima početnu tačku, cilj, i skup pravila koja joj govore šta sme da uradi.\n\nAko robot želi da iz kuhinje dođe do dnevne sobe, on mora znati:\n• Gde se trenutno nalazi (početno stanje)\n• Gde treba da stigne (ciljno stanje)\n• Koje pokrete može da koristi (akcije)\n• Koje prepreke postoje (pravila okruženja)' },
          { heading: 'Primer iz stvarnog života', content: 'Zamisli aplikaciju koja planira dostavu hrane:\n• Početak: vozač je kod restorana\n• Cilj: korisnik je na adresi\n• Pravila: vozi samo po putevima, izbegava radove\n• Akcije: skreni levo, idi pravo, uspori, ubrzaj\n• Procena: izračunaj koja ruta je najkraća\n\nAplikacija ne zna ništa o korisniku ni o samoj hrani – ona zna samo brojke: koordinate, brzinu, udaljenost.' },
          { heading: 'AI rešava probleme svuda', content: '• Kada Google Maps predloži rutu – rešava problem pretrage\n• Kada roboti u Amazon magacinu sortiraju proizvode – rešavaju problem organizacije\n• Kada Netflix bira šta da ti predloži – rešava problem odlučivanja\n\nU svakom slučaju, mašina ne zna šta ti želiš – ali zna kako da dođe do rešenja koje izgleda verovatno korisno.' },
        ],
        keyTerms: [
          { term: 'Početno stanje', def: 'Gde se AI (ili agent) nalazi na početku zadatka' },
          { term: 'Ciljno stanje', def: 'Željeni ishod koji AI treba da postigne' },
          { term: 'Prostor stanja', def: 'Skup svih mogućih situacija kroz koje AI može proći' },
          { term: 'Algoritam pretrage', def: 'Skup pravila za pronalaženje puta od početka do cilja' },
        ],
        task: 'Zamisli da praviš jednostavnu AI za robota koji treba da dođe do frižidera. Odgovori: Gde se robot nalazi? Šta je njegov cilj? Šta sme a šta ne sme da uradi? Kako zna da je stigao?'
      },
      {
        id: 2,
        title: 'Logika, pretraga i donošenje odluka',
        intro: 'Zamisli da sediš u kafiću i razmišljaš da li da naručiš čaj ili kafu. Ovaj svakodnevni proces u tvom mozgu — AI pokušava da oponaša uz pomoć logike i algoritama pretrage.',
        sections: [
          { heading: 'Logika u AI', content: 'U najosnovnijem smislu, logika u AI je veština izvođenja zaključaka na osnovu poznatih činjenica.\n\nAko zna: "Svi ljudi su smrtni" i "Sokrat je čovek" → AI može zaključiti: "Sokrat je smrtan."\n\nOvakvi logički sistemi su temelj najranijih AI sistema.' },
          { heading: 'Pretraga i heuristike', content: 'Kada AI rešava problem, mora da istražuje mogućnosti:\n• Idi redom – proveravaj sve puteve (pretraga u širinu)\n• Zaroni što dublje u jedan pravac (pretraga u dubinu)\n• Kombinuj logiku i intuiciju koristeći A* algoritam\n\nHeuristike su pravila koja pomažu AI da brže donese odluku. Primer: "Idi ka tački koja je fizički najbliža cilju." To je pametno skraćivanje pretrage.' },
          { heading: 'Donošenje odluka', content: 'AI ne bira nasumično. Da bi odlučila, koristi funkciju evaluacije – alat kojim procenjuje koliko je neko rešenje "dobro".\n\nAI bira između tri rute i upoređuje:\n• Dužinu puta\n• Broj prepreka\n• Očekivano vreme\n• I na osnovu toga bira "najboljу"\n\nU šahu, AI razmatra više poteza unapred i bira onaj koji daje najveće šanse za pobedu.' },
        ],
        keyTerms: [
          { term: 'Heuristika', def: 'Pravilo koje pomaže AI da brže proceni i odabere bolju opciju' },
          { term: 'Minimax', def: 'Algoritam za igre – bira potez koji minimizuje maksimalnu štetu' },
          { term: 'Funkcija evaluacije', def: 'Alat kojim AI meri koliko je neko rešenje "dobro"' },
          { term: 'Pretraga u širinu', def: 'Algoritam koji istražuje sve susedne opcije pre nego što ode dublje' },
        ],
        task: 'Zamisli da AI treba da pomogne korisniku da izabere film. Koje informacije AI može koristiti? Kako bi izgledala njena pretraga? Koju heuristiku bi koristila?'
      },
      {
        id: 3,
        title: 'Kako AI "igra" i donosi odluke u simulacijama?',
        intro: 'Igranje za AI nije samo zabava – to je ozbiljno polje istraživanja, jer igre i simulacije predstavljaju savršen prostor za učenje, testiranje i donošenje odluka.',
        sections: [
          { heading: 'AI u igrama kroz istoriju', content: 'Još 1997. godine, kompjuter Deep Blue pobedio je svetskog šampiona u šahu Garija Kasparova. Bilo je to istorijski prvi put da je mašina nadigrala čoveka u "intelektualnoj" igri.\n\nDanas AI:\n• Uči sama da igra od nule\n• Igra protiv sebe kako bi se usavršila\n• Donosi odluke brže i preciznije nego što bi čovek mogao' },
          { heading: 'Tehnike koje AI koristi u igrama', content: 'Minimax algoritam: AI analizira poteze i pretpostavlja da protivnik igra savršeno. Bira potez koji minimizuje njen maksimalni mogući gubitak.\n\nMonte Carlo Tree Search: AI nasumično "simulira" mnogo različitih partija i beleži koje opcije najčešće vode do pobede.\n\nReinforcement Learning: AI igra protiv sebe, dobija "nagradu" za dobre poteze i "kaznu" za loše – i tako uči strategiju.' },
          { heading: 'Izvan igara – u stvarnom svetu', content: 'Sve ove tehnike se primenjuju van sveta igara:\n• Autonomna vozila testiraju se u simulacijama pre nego što izađu na put\n• Roboti uče da hodaju u virtuelnim okruženjima\n• Medicinski AI trenira na simuliranim operacijama\n• Vojni i logistički sistemi testiraju scenarije u simulatorima' },
        ],
        keyTerms: [
          { term: 'Reinforcement Learning', def: 'Učenje kroz nagradu i kaznu – AI uči iz sopstvenog iskustva' },
          { term: 'Simulacija', def: 'Virtuelno okruženje za bezbedno testiranje AI sistema' },
          { term: 'AlphaGo', def: 'AI koji je pobedio svetskog šampiona u igri Go – složenijoj od šaha' },
          { term: 'Agent', def: 'AI entitet koji deluje u okruženju i donosi odluke' },
        ],
        task: 'Zamisli AI koja treba da nauči da vozi bicikl samo kroz simulaciju. Opiši: šta su nagrade (dobri potezi), šta su kazne (loši potezi), i kako AI postaje bolja kroz vreme.'
      },
    ]
  },
  {
    id: 3, emoji: '🟢',
    title: 'Uvod u mašinsko učenje',
    goal: 'Razumevanje kako AI uči na osnovu podataka.',
    desc: 'Razumi kako AI "uči" iz podataka i primenjuje naučeno kroz klasifikaciju, regresiju i prepoznavanje obrazaca.',
    lessons: [
      {
        id: 1,
        title: 'Nadgledano i nenadgledano učenje',
        intro: 'Zamisli da učiš dete da prepoznaje životinje. Ako mu pokazuješ slike i kažeš "ovo je pas, ovo je mačka" – to je nadgledano učenje. Ako mu daš slike bez objašnjenja i on sam pronađe obrasce – to je nenadgledano.',
        sections: [
          { heading: 'Nadgledano učenje', content: 'U nadgledanom učenju, AI dobija:\n• Ulazne podatke (slike, tekstove, brojeve)\n• Tačne oznake (etikete) za svaki primer\n\nAI uči da poveže ulaze sa oznakama i zatim predviđa oznake za nove, neviđene podatke.\n\nPrimeri:\n• Email klasifikacija (spam / nije spam)\n• Prepoznavanje slika (pas / mačka)\n• Predikcija cena nekretnina\n• Medicinsko dijagnostikovanje' },
          { heading: 'Nenadgledano učenje', content: 'U nenadgledanom učenju, AI dobija samo ulazne podatke – bez oznaka. Mora sama da pronađe strukturu i obrasce.\n\nPrimeri:\n• Grupisanje kupaca po ponašanju (klasterizacija)\n• Otkrivanje anomalija u bankarskim transakcijama\n• Kompresija podataka\n• Preporučivanje sadržaja\n\nOva tehnika se koristi kada nemamo jasne oznake ili kada tražimo skrivene obrasce u podacima.' },
          { heading: 'Poludgledano i učenje pojačanjem', content: 'Poludgledano učenje: kombinuje malo označenih i mnogo neoznačenih podataka – korisno kada je označavanje skupo.\n\nUčenje pojačanjem (Reinforcement Learning): AI uči kroz interakciju sa okruženjem, dobijajući nagrade za dobre i kazne za loše odluke. Koristi se za igre, robote i autonomna vozila.' },
        ],
        keyTerms: [
          { term: 'Klasifikacija', def: 'Razvrstavanje podataka u unapred definisane kategorije' },
          { term: 'Klasterizacija', def: 'Grupisanje podataka po sličnosti bez unapred definisanih kategorija' },
          { term: 'Trening skup', def: 'Podaci koji se koriste za obučavanje modela' },
          { term: 'Test skup', def: 'Podaci koji se koriste za proveru performansi modela' },
        ],
        task: 'Za svaki od sledećih primera, odredi da li je reč o nadgledanom ili nenadgledanom učenju: 1. Gmail spam filter, 2. Grupiranje kupaca u marketing segmente, 3. Prepoznavanje tumora na rendgenskom snimku, 4. Preporuka muzike na Spotify.'
      },
      {
        id: 2,
        title: 'Klasifikacija, regresija i predikcija',
        intro: 'Kada AI "uči", ona u suštini radi jednu od dve stvari: razvrstava podatke u kategorije (klasifikacija) ili predviđa numeričke vrednosti (regresija). Ove dve tehnike su temelj ogromnog broja AI aplikacija.',
        sections: [
          { heading: 'Klasifikacija', content: 'Klasifikacija odgovara na pitanje: "Kojoj kategoriji ovo pripada?"\n\nPrimeri:\n• Da li je ova email poruka spam?\n• Da li na ovoj slici ima mačka ili pas?\n• Da li će ovaj korisnik napustiti platformu?\n• Da li je ova transakcija lažna?\n\nAI uči granice između kategorija iz primera i zatim primenjuje te granice na nove podatke.' },
          { heading: 'Regresija', content: 'Regresija odgovara na pitanje: "Koja vrednost odgovara ovim podacima?"\n\nPrimeri:\n• Kolika će biti cena ove kuće?\n• Koliko prodaja se može očekivati sledeće nedelje?\n• Koliko sati će trajati ovaj let?\n\nRegresija pronalazi matematičku vezu između ulaznih podataka i izlazne vrednosti.' },
          { heading: 'Kako AI meri uspeh?', content: 'AI model se ocenjuje metrima:\n• Tačnost (Accuracy): procenat tačnih predikcija\n• Preciznost: od svih koje je AI rekla da su "pozitivne", koliko zaista jeste\n• Odziv: od svih pravih pozitivnih, koliko je AI pronašla\n\nNajbolja tačnost nije uvek cilj – bitno je koja metrika je važna za konkretan problem.' },
        ],
        keyTerms: [
          { term: 'Klasifikacija', def: 'Razvrstavanje u kategorije (npr. spam / nije spam)' },
          { term: 'Regresija', def: 'Predikcija numeričke vrednosti (npr. cena kuće)' },
          { term: 'Overfitting', def: 'Kada model previše "upamti" trening podatke i loše radi na novim' },
          { term: 'Feature', def: 'Ulazna promenljiva koja se koristi za predikciju' },
        ],
        task: 'Za svaki primer, odredi da li je reč o klasifikaciji ili regresiji: 1. Predviđanje temperature sutra, 2. Da li će pacijent dobiti dijabetes, 3. Koliko će novca potrošiti kupac, 4. Da li je recenzija pozitivna ili negativna.'
      },
      {
        id: 3,
        title: 'Praktični primeri iz svakodnevnog života',
        intro: 'Mašinsko učenje nije apstraktna nauka – ono je ono zbog čega tvoj telefon zna da deblokiruješ licem, YouTube zna šta ćeš gledati, i Gmail zna koji su mejlovi spam.',
        sections: [
          { heading: 'ML u komunikaciji', content: 'Gmail spam filter:\nSvaki mejl koji primiš prolazi kroz ML model koji analizira stotine karakteristika: od adrese pošiljaoca, do reči u naslovu i telu. Model je naučen na milionima označenih mejlova.\n\nGoogle Translate:\nKoristi duboko učenje na milijardama parova rečenica na različitim jezicima. Svaki put kad ga koristiš, sistem postaje malo bolji.' },
          { heading: 'ML u zabavi i kupovini', content: 'Netflix i YouTube preporuke:\n• Prate šta gledaš, koliko dugo, kada pauziruješ\n• Porede te sa korisnicima sličnih navika\n• Predlažu sadržaj koji će te verovatno zadržati\n\nAmazon i online kupovina:\n• "Kupci koji su kupili ovo kupili su i..." – to je ML klasterizacija\n• Dinamično formiranje cena na osnovu potražnje i ponašanja korisnika' },
          { heading: 'ML u bezbednosti i zdravlju', content: 'Bankovna zaštita od prevare:\n• Svaka transakcija se u realnom vremenu poredi sa tvojim tipičnim obrascima\n• Neobična transakcija (drugi grad, neobično vreme, veliki iznos) se automatski blokira\n\nMedijska dijagnostika:\n• AI modeli treniraju na hiljadama medicinskih snimaka\n• Pomažu lekarima da detektuju tumore, prelome ili anomalije koje bi mogle biti propuštene' },
        ],
        keyTerms: [
          { term: 'Filtriranje', def: 'Razvrstavanje stavki po pravilima naučenim iz podataka' },
          { term: 'Kolaborativno filtriranje', def: 'Preporuka zasnovana na sličnosti sa drugim korisnicima' },
          { term: 'Anomalija', def: 'Podaci koji se značajno razlikuju od normalnog obrasca' },
          { term: 'Real-time ML', def: 'ML model koji donosi odluke u trenutku, dok se akcija odvija' },
        ],
        task: 'Otvori bilo koju streaming platformu (Netflix, YouTube, Spotify) i poglej preporučeni sadržaj. Razmisli: koje podatke o tebi je platforma prikupila i kako ih koristi za preporuke?'
      },
    ]
  },
  {
    id: 4, emoji: '🔴',
    title: 'Neuronske mreže – digitalni mozak',
    goal: 'Osnove rada neuronskih mreža i kako AI uči kao čovek.',
    desc: 'Otkrij kako funkcionišu neuronske mreže, kako prepoznaju slike i tekst, i zašto AI može da uči "kao čovek".',
    lessons: [
      {
        id: 1, title: 'Kako izgleda neuronska mreža?',
        intro: 'Neuronska mreža je softverski model inspirisan načinom na koji funkcionišu neuroni u ljudskom mozgu. Tvoj mozak ima oko 86 milijardi neurona. Neuronska mreža ima daleko manje – ali isti princip.',
        sections: [
          { heading: 'Struktura neuronske mreže', content: 'Neuronska mreža se sastoji od slojeva:\n• Ulazni sloj: prima podatke (piksele slike, reči, brojeve)\n• Skriveni slojevi: obrađuju informacije, svaki sloj uči složenije osobine\n• Izlazni sloj: daje rezultat (npr. "ovo je mačka")\n\nSvaki neuron je povezan sa neuronima sledećeg sloja. Te veze imaju "težine" – brojeve koji određuju koliko je jaka svaka veza.' },
          { heading: 'Kako neuron donosi odluku?', content: 'Svaki neuron:\n1. Prima signale od prethodnih neurona\n2. Množi svaki signal sa odgovarajućom težinom\n3. Sabira sve rezultate\n4. Primenjuje aktivacionu funkciju – koja odlučuje da li "pali" signal\n5. Šalje rezultat sledećem sloju\n\nZbog ovih aktivacionih funkcija, mreža može da nauči i nelinearne odnose – kao što to čini i ljudski mozak.' },
          { heading: 'Zašto "duboko" učenje?', content: 'Plitke mreže imaju 1-2 skrivena sloja. Duboke mreže imaju 10, 50, pa i 1000+ slojeva.\n\nSvaki sloj uči drugačije osobine:\n• Sloj 1: detektuje ivice i kontraste\n• Sloj 2: prepoznaje oblike (krugovi, linije)\n• Sloj 3: kombinuje oblike u delove (oko, uho)\n• Sloj 4: prepoznaje ceo objekat (lice, pas)\n\nOvo je zašto duboke mreže mogu prepoznati slike s tačnošću višom od čoveka u nekim zadacima.' },
        ],
        keyTerms: [
          { term: 'Neuron', def: 'Osnovna jedinica neuronske mreže koja prima, obrađuje i prosleđuje signal' },
          { term: 'Težina (weight)', def: 'Broj koji određuje koliko je jaka veza između neurona' },
          { term: 'Sloj (layer)', def: 'Grupa neurona koji obrađuju isti nivo apstrakcije podataka' },
          { term: 'Aktivaciona funkcija', def: 'Matematička funkcija koja odlučuje da li neuron "pali" signal' },
        ],
        task: 'Zamisli neuronsku mrežu koja prepoznaje da li je na slici pas ili mačka. Opiši šta bi svaki sloj "video": ulazni sloj, srednji slojevi, izlazni sloj.'
      },
      {
        id: 2, title: 'Feedforward i backpropagation',
        intro: 'Kada AI gleda sliku i pogreši – kako zna šta da popravi? Odgovor je u elegantnom procesu zvanom backpropagation, koji je temelj modernog dubokog učenja.',
        sections: [
          { heading: 'Feedforward – put napred', content: 'Feedforward je osnovna operacija neuronske mreže:\n1. Podaci ulaze u mrežu\n2. Prolaze sloj po sloj, svaki sloj transformiše podatke\n3. Na kraju izlazi predikcija\n\nTokom ovog prolaza, mreža ne uči – ona samo primenjuje ono što zna. Učenje se dešava tek u sledećem koraku.' },
          { heading: 'Backpropagation – učenje iz grešaka', content: 'Kada mreža da pogrešan odgovor:\n1. Izračunava se greška (razlika između predviđenog i tačnog odgovora)\n2. Greška se "propagira unazad" kroz mrežu\n3. Svaka težina se malo prilagodi kako bi smanjila grešku\n4. Ovaj proces se ponavlja milionima puta\n\nOvo je analogno kako i mi učimo: pokušaj, pogreši, shvati grešku, popravi se.' },
          { heading: 'Gradijentni spust – traženje minimuma', content: 'AI traži kombinaciju težina koja minimizuje grešku. Ovaj proces se zove gradijentni spust.\n\nZamisli brdo sa dolinom. AI stoji na vrhu i traži najniže mesto (minimum greške). Svaki korak ide u smeru pada – ka nižoj grešci.\n\nSa dovoljno koraka (epoha treninga), AI pronađe dobre vrednosti težina.' },
        ],
        keyTerms: [
          { term: 'Feedforward', def: 'Prolaz podataka kroz mrežu od ulaza do izlaza' },
          { term: 'Backpropagation', def: 'Algoritam koji propagira grešku unazad i ažurira težine' },
          { term: 'Gradijentni spust', def: 'Metoda optimizacije koja postepeno smanjuje grešku modela' },
          { term: 'Epoha', def: 'Jedan kompletan prolaz kroz sve trening podatke' },
        ],
        task: 'Zamislii da treniraš AI da prepozna slova. AI gleda slovo "A" i kaže da je "H". Opiši korak po korak šta se dešava u backpropagation procesu.'
      },
      {
        id: 3, title: 'Kako AI prepoznaje slike i tekst?',
        intro: 'Iza svake aplikacije koja prepoznaje tvoje lice, prevodi jezik ili piše tekstove stoje specijalizovane arhitekture neuronskih mreža. Upoznaj ih.',
        sections: [
          { heading: 'Konvolucione mreže (CNN) – za slike', content: 'CNN je arhitektura specijalizovana za obradu slika.\n\nKako radi:\n1. Konvolucioni slojevi "skeniraju" sliku malim filterima (npr. 3x3 piksele)\n2. Svaki filter traži specifičan obrazac (ivica, boja, tekstura)\n3. Pooling slojevi komprimuju informacije, zadržavajući ono važno\n4. Finansijsko (fully connected) slojevi donose finalnu odluku\n\nCNN aplikacije:\n• Face ID na iPhoneu\n• Google Photos pretraga\n• Medicinska dijagnostika\n• Autonomna vozila' },
          { heading: 'Transformeri – za tekst i jezik', content: 'Transformer je arhitektura koja revolucionisala obradu prirodnog jezika.\n\nKljučna inovacija – "pažnja" (attention): model može da se fokusira na najvažnije reči u rečenici, bez obzira na njihovu poziciju.\n\nPrimer: U rečenici "Banka je bila pored reke koja se prelila" – model zna da "banka" znači obalu, ne finansijsku instituciju, jer "pažnja" vidi vezu sa "rekom".\n\nChatGPT, Claude, Gemini i svi moderni jezički modeli su bazirani na transformer arhitekturi.' },
          { heading: 'Generativni AI – kreiranje sadržaja', content: 'Generativne mreže ne samo da prepoznaju – one i kreiraju:\n\nGAN (Generative Adversarial Network):\n• Generator pravi lažne slike\n• Diskriminator pokušava da otkrije da su lažne\n• Međusobno se nadmeću i postaju sve bolji\n• Rezultat: hyperrealistične slike koje nikad nisu postojale\n\nDiffusion modeli (DALL·E, Stable Diffusion):\n• Počinju od šuma i postepeno "čiste" sliku\n• Mogu generisati slike iz opisa na prirodnom jeziku' },
        ],
        keyTerms: [
          { term: 'CNN', def: 'Konvoluciona neuronska mreža – specijalizovana za obradu slika' },
          { term: 'Transformer', def: 'Arhitektura sa mehanizmom pažnje, temelj modernih jezičkih modela' },
          { term: 'GAN', def: 'Generativna suparničarka mreža – dve mreže koje se nadmeću' },
          { term: 'Token', def: 'Osnovna jedinica teksta (reč ili deo reči) kojom jezički modeli rade' },
        ],
        task: 'Isprobaj besplatan AI alat za generisanje slika (npr. Bing Image Creator ili Adobe Firefly). Unesi opis scene i pogledaj rezultat. Pokušaj sa različitim stilovima i opiši šta si primetio.'
      },
    ]
  },
  {
    id: 5, emoji: '🧩',
    title: 'AI u učenju, poslu i svakodnevici',
    goal: 'Naučiti kako da koristiš AI za ličnu produktivnost i razvoj.',
    desc: 'Nauči kako da koristiš AI za brže učenje, organizaciju, pisanje i analize – i primeni to odmah.',
    lessons: [
      {
        id: 1, title: 'Brže učenje uz pomoć AI alata',
        intro: 'AI ne uči umesto tebe – ali može da ti pomogne da učiš pametnije, brže i efikasnije. Od personalizovanih objašnjenja do adaptivnih kvizova, AI transformiše obrazovanje.',
        sections: [
          { heading: 'Personalizovano učenje', content: 'Tradicionalno obrazovanje daje svima isti sadržaj istim tempom. AI menja to:\n\n• Duolingo prati gde grešiš i prilagođava lekcije\n• Khan Academy ima Khanmigo – AI tutora koji objašnjava zadatke\n• Anki i slične aplikacije koriste ML da predlože ponavljanje pre nego što zaboraviš\n• Sistemi za e-učenje prate vreme čitanja, klikove i rezultate – i prilagođavaju se' },
          { heading: 'ChatGPT i Claude kao tutori', content: 'Jezički modeli mogu biti moćni alati za učenje:\n\nŠta možeš da radiš:\n• "Objasni mi kvantnu fiziku kao da imam 10 godina"\n• "Napravi mi kviz od ove lekcije"\n• "Gdje grešim u ovom zadatku iz matematike?"\n• "Daj mi 5 primera primene ovog koncepta u praksi"\n• "Prevedi ovo na jednostavniji srpski"\n\nVažno: Uvek proveravaj informacije, jer AI može grešiti u činjenicama.' },
          { heading: 'Praktični saveti za AI-podržano učenje', content: 'Da bi AI bio dobar tutor:\n• Budi specifičan u pitanjima: "Objasni backpropagation koristeći analogiju kuhinje"\n• Traži različite perspektive: "Na koji drugi način mogu da razumem ovo?"\n• Koristi AI za samoproveru: "Evo mog odgovora – šta je tačno, a šta nije?"\n• Kombikuji sa pravim izvorima – AI je polazna tačka, ne jedini izvor' },
        ],
        keyTerms: [
          { term: 'Adaptivno učenje', def: 'Sistem koji prilagođava sadržaj prema napretku i greškama učenika' },
          { term: 'Spaced repetition', def: 'Tehnika ponavljanja gradiva u optimalnim intervalima za dugoročno pamćenje' },
          { term: 'Prompt', def: 'Upit ili instrukcija koja se daje jezičkom modelu' },
          { term: 'Hallucination', def: 'Kada AI daje uverljiv ali netačan odgovor' },
        ],
        task: 'Izaberi jednu temu iz ovog kursa koja ti nije bila jasna. Pitaj ChatGPT ili Claude da ti objasni na 3 različita načina: jednom jednostavno, jednom tehničko, jednom kroz analogiju iz svakodnevnog života.'
      },
      {
        id: 2, title: 'AI kao lični mentor i asistent',
        intro: 'Zamislii da imaš asistenta koji nikad ne spava, zna sve o temama koje te zanimaju, uvek je raspoložen da ti pomogne – i potpuno besplatan. To je ono što jezički modeli mogu biti za tebe.',
        sections: [
          { heading: 'AI za pisanje i komunikaciju', content: 'AI alati za pisanje mogu pomoći sa:\n• Ispravljanjem gramatike i stila\n• Prepisom teksta u profesionalniji ton\n• Generisanjem nacrta eseja ili emaila\n• Sažimanjem dugih dokumenata\n• Prevođenjem sa zadržavanjem konteksta\n\nAlati: ChatGPT, Claude, Grammarly, DeepL, Notion AI' },
          { heading: 'AI za analizu i istraživanje', content: 'AI može ubrzati istraživanje:\n• Sumiraj 20-straničan izveštaj za 10 sekundi\n• Pronađi ključne argumente u dugom tekstu\n• Napravi tabelu poređenja opcija\n• Generiši pitanja za intervju\n• Analiziraj podatke i napiši zaključke\n\nAlati: Perplexity AI (pretraživanje), Claude (analiza), NotebookLM (rad sa dokumentima)' },
          { heading: 'Granice i etika korišćenja', content: 'AI asistent nije savršen:\n• Može halucinirati (izmišljati činjenice)\n• Znanje može biti zastarelo\n• Nema pristup realnom vremenu (bez web pretrage)\n• Ne razume tvoj lični kontekst\n\nOdgovorna upotreba:\n• Uvek proveravaj važne informacije\n• Ne koristiti AI za plagijarizam\n• Buди transparentan kada koristiš AI u profesionalnom kontekstu\n• AI je alat koji pomaže – odluke su tvoje' },
        ],
        keyTerms: [
          { term: 'Prompt engineering', def: 'Veština pisanja efikasnih upita za AI modele' },
          { term: 'Kontekst', def: 'Informacije koje daješ AI da bi dobio relevantniji odgovor' },
          { term: 'Iteracija', def: 'Postepeno poboljšavanje rezultata kroz više pokušaja' },
          { term: 'Zero-shot', def: 'Kada AI rešava zadatak bez primera, samo na osnovu opisa' },
        ],
        task: 'Napiši email svom profesoru kojim tražiš produžetak roka za predaju rada. Prvo napiši sâm, zatim zamoli AI da ga poboljša. Upoređujući dve verzije, šta je AI promenio i zašto?'
      },
      {
        id: 3, title: 'Organizacija dana i zadataka pomoću AI',
        intro: 'Moderni AI alati mogu preuzeti rutinske organizacijske zadatke i osloboditi ti vreme i mentalnu energiju za ono što je zaista važno.',
        sections: [
          { heading: 'AI za upravljanje vremenom', content: 'Notion AI: unutar Notion beleški može automatski kreirati task liste, sumizirajući beleške sa sastanaka.\n\nGoogle Calendar + AI: Gemini može analizirati tvoj kalendar i predlagati optimalne termine za fokusirani rad.\n\nCopilot u Outlooku: automatski kreira sažetke email konverzacija, predlaže odgovore i kreira zadatke iz emailova.\n\nReclaim.ai: automatski blokira vreme za dubinski rad i prilagođava raspored kada se nešto promeni.' },
          { heading: 'AI za produktivnost u poslu', content: 'AI u poslovnom okruženju:\n• Automatsko kreiranje zapisnika sa sastanaka (Otter.ai, Fireflies)\n• Generisanje PowerPoint prezentacija iz buleta (Gamma, Tome)\n• Analiza Excel podataka prirodnim jezikom (Microsoft Copilot)\n• Automatizacija repetitivnih zadataka (Zapier AI, Make)\n\nU prodaji: AI analizira emaile i sugeriše sledeći korak\nU HR: AI pre-filtrira prijave\nU IT: AI generiše i debuguje kod' },
          { heading: 'Balans: AI i lična odgovornost', content: 'Dok AI može preuzeti mnogo rutinskih zadataka, važno je zapamtiti:\n\n• Kreativnost ostaje tvoja: AI može generisati ideje, ali vizija je tvoja\n• Kritičko mišljenje ne delegiraj: AI ne razume nuanse tvog posla\n• Relationship management: ljude zanima ko si ti, ne ko je tvoj AI\n• Greške su tvoja odgovornost: ako AI napravi grešku u tvom imenu, ti snosaš posledice' },
        ],
        keyTerms: [
          { term: 'Automatizacija', def: 'Korišćenje AI da izvršava repetitivne zadatke bez ljudske intervencije' },
          { term: 'Workflow', def: 'Niz koraka u procesu koji se mogu optimizovati uz pomoć AI' },
          { term: 'AI-augmentacija', def: 'Proširivanje ljudskih sposobnosti uz pomoć AI, ne zamena' },
          { term: 'Delegacija', def: 'Prenošenje zadataka AI-u dok zadržavaš kontrolu i odgovornost' },
        ],
        task: 'Isplaniraj sutrašnji dan uz pomoć AI. Napiši ChatGPT-u ili Claudeu listu svojih obaveza za sutra i zamoli ga da napravi optimalan raspored sa vremenskim blokovima, pauzama i prioritetima.'
      },
    ]
  },
  {
    id: 6, emoji: '⚖️',
    title: 'Odgovorno korišćenje AI',
    goal: 'Kritičko promišljanje o AI i razumevanje njegovih posledica.',
    desc: 'Razmišljaj kritički: kako da koristiš AI bezbedno, etički i svesno – i kako da prepoznaš rizike.',
    lessons: [
      {
        id: 1, title: 'Pristrasnost, privatnost i sigurnost',
        intro: 'Mašine ne misle loše – ali mogu da greše opasno. Veštačka inteligencija nije neutralna. Ona ne donosi odluke na osnovu vrednosti – već na osnovu podataka. A ako su podaci nepravedni, biće i odluke.',
        sections: [
          { heading: 'Pristrasnost u AI', content: 'AI ne zna šta znači biti pristrasan. Ali ako ga nahraniš istorijskim podacima u kojima su žene ređe dobijale pozicije u IT – on će naučiti da je "muškarac + programer" češći obrazac.\n\nAmazon je morao da ugasi AI alat za regrutaciju jer je diskriminisao žene – ne jer je neko to hteo, već jer AI uči ono što mu pokažemo.\n\nPristrasnost se može pojaviti u:\n• Odabiru kandidata za posao\n• Sistemima za prepoznavanje lica (lošija tačnost za tamnoputije osobe)\n• Policijskim algoritmima za predikciju kriminala\n• Medicinskim dijagnozama' },
          { heading: 'Privatnost i podaci', content: 'Kada koristiš AI alat, često unosiš lične informacije. Da li znaš gde ti podaci idu?\n\nVažna pitanja:\n• Kome daješ dozvolu za korišćenje podataka?\n• Kako se tvoji podaci koriste za treniranje modela?\n• Da li ih je moguće obrisati?\n\nGDPR u Evropi štiti korisnike – ali tehnologija se razvija brže nego zakon. Tvoja privatnost mora biti tvoja odgovornost.' },
          { heading: 'Sigurnost i zloupotrebe', content: 'AI može da piše tekstove, generiše slike, imitira glas. To otvara vrata zloupotrebama:\n\n• Deepfake: AI imitira glas ili lice neke osobe\n• Phishing: AI generiše uverljive lažne emailove\n• Dezinformacije: AI masovno kreira lažne vesti\n• Sajber napadi: AI automatizuje provalu u sisteme\n\nSigurna upotreba AI znači:\n• Korišćenje proverenih alata\n• Zaštita ličnih podataka\n• Razumevanje mogućih zloupotreba' },
        ],
        keyTerms: [
          { term: 'Pristrasnost (bias)', def: 'Sistematska greška u AI koja favorizuje određene grupe' },
          { term: 'Deepfake', def: 'AI-generisani lažni video ili audio koji imitira stvarnu osobu' },
          { term: 'GDPR', def: 'Evropski zakon o zaštiti podataka koji reguliše kako se podaci prikupljaju i koriste' },
          { term: 'Transparency', def: 'Sposobnost da se razume kako AI donosi odluke' },
        ],
        task: 'Pronađi jedan primer iz stvarnog sveta gde je AI sistem pokazao pristrasnost (možeš guglati "AI bias examples"). Opiši: ko je bio oštećen, koji su podaci bili problem, i kako se moglo sprečiti.'
      },
      {
        id: 2, title: 'Ko snosi odgovornost za odluke AI sistema?',
        intro: 'Kada pogreši čovek – znamo koga da pitamo. A kada pogreši algoritam? U doba kada AI donosi sve više odluka koje direktno utiču na ljudske živote, pitanje odgovornosti postaje jedno od najvažnijih.',
        sections: [
          { heading: 'Zašto AI ne može biti odgovoran', content: 'Zakon poznaje ljude, ne algoritme. AI sistem, čak i kada donese pogrešnu odluku, ne može biti krivično ili pravno odgovoran. Nema volju. Nema nameru. Nema svest.\n\nOdgovornost mora pasti na ljude – ali koje?\n\nZamislimo: pacijentu je pogrešno postavljena dijagnoza jer je AI sistem pogrešno interpretirao podatke. Niko od lekara nije proverio – svi su se oslonili na algoritam. Ko je kriv?\n• Programer koji je napravio sistem?\n• Bolnica koja ga koristi?\n• Menadžer koji je kupio softver?' },
          { heading: 'Raspodela odgovornosti', content: 'Programeri i inženjeri:\nSnose deo odgovornosti – posebno ako znaju da sistem može doneti opasne odluke, ali nisu ugradili zaštitne mehanizme.\n\nKompanije i institucije:\nNajveća odgovornost leži na onima koji AI ugrađuju u realne procese. Moraju znati kako sistem funkcioniše i biti spremni da reaguju kada pogreši.\n\nKorisnici:\nNedostatak znanja ne oslobađa odgovornosti – korišćenje tehnologije bez razumevanja njenih ograničenja može imati ozbiljne posledice.' },
          { heading: 'Kolektivna odgovornost: novi model', content: 'Odgovornost u AI svetu mora biti kolektivna:\n• Programeri moraju ugrađivati etičke standarde\n• Kompanije moraju znati za šta koriste AI i gde su mu granice\n• Korisnici moraju učiti kako AI funkcioniše\n• Zakonodavci moraju stvarati jasne okvire\n\nJer kada odgovornost nije jasno podeljena – ona nestaje. A kad odgovornost nestane, poverenje u AI se urušava.' },
        ],
        keyTerms: [
          { term: 'Odgovornost (accountability)', def: 'Obaveza da se odgovori za posledice AI odluka' },
          { term: 'Crna kutija (black box)', def: 'AI sistem čiji se proces donošenja odluka ne može razumeti' },
          { term: 'Objašnjivost', def: 'Sposobnost AI sistema da objasni zašto je doneo određenu odluku' },
          { term: 'AI regulacija', def: 'Zakoni i propisi koji regulišu razvoj i upotrebu AI' },
        ],
        task: 'AI sistem automatski bira kandidate za stipendiju. Otkrije se da je odbijao sve kandidate iz jednog regiona. Ko je odgovoran? Da li sistem treba ugasiti ili unaprediti? Da li je bilo moguće ovo predvideti?'
      },
      {
        id: 3, title: 'Etika u doba veštačke inteligencije',
        intro: 'AI ne postavi moralna pitanja. Ali ti i ja – da. I upravo zato, u svetu koji sve više prepušta odluke algoritmima, etičko razmišljanje postaje jedna od najvažnijih veština.',
        sections: [
          { heading: 'Ključni etički principi za AI', content: '1. Pravednost (Fairness): AI ne bi trebalo da diskriminiše.\n2. Transparentnost: korisnici treba da znaju kada komuniciraju sa AI.\n3. Privatnost: podaci moraju biti zaštićeni i korišćeni samo u dogovorene svrhe.\n4. Bezbednost: AI ne bi trebalo da može biti zloupotrebljeno ili da prouzrokuje štetu.\n5. Odgovornost: uvek mora postojati čovek koji odgovara za AI odluke.\n6. Humana kontrola: u kritičnim situacijama, čovek mora imati pravo veta.' },
          { heading: 'Teška etička pitanja', content: 'Autonomna vozila: ako kočnice ne mogu zaustaviti auto – da li da udari pedestrijane ili putnike? Ko odlučuje?\n\nAI u pravosuđu: da li AI treba da određuje zatvorske kazne? Uslove za uslovnu slobodu?\n\nAI u ratu: da li autonomni dronovi smeju da donose odluke o ubistvu bez ljudskog odobrenja?\n\nNema lakih odgovora – ali kritičko razmišljanje je prva odbrana od grešnih odluka.' },
          { heading: 'Šta možeš ti da uradiš?', content: 'Na individualnom nivou:\n• Informiši se o AI alatima koje koristiš\n• Čitaj politiku privatnosti (bar glavne tačke)\n• Prijavi pristrasnost ili nepravdu kada je vidiš\n• Podrži etičke kompanije i inicijative\n• Razgovaraj o ovim temama sa prijateljima i porodicom\n\nJedna od najmoćnijih stvari koje možeš da uradiš je da budeš informisan korisnik. AI kompanije reaguju na javni pritisak.' },
        ],
        keyTerms: [
          { term: 'AI etika', def: 'Skup principa koji usmeravaju odgovoran razvoj i upotrebu AI' },
          { term: 'Autonomija', def: 'Pravo da donosiš sopstvene odluke, bez manipulacije od strane AI' },
          { term: 'Blagostanje', def: 'AI treba da doprinosi dobrobiti pojedinca i društva' },
          { term: 'EU AI Act', def: 'Evropski zakon o veštačkoj inteligenciji koji klasifikuje AI po riziku' },
        ],
        task: 'Scenario: Bolnica planira da implementuje AI koji predlaže tretmane. Napravi listu od 5 etičkih pitanja koja bi trebalo da se postave pre puštanja sistema u rad.'
      },
    ]
  },
  {
    id: 7, emoji: '🌐',
    title: 'AI i društvo – uticaji, izazovi i budućnost',
    goal: 'Razumevanje uloge AI u ekonomiji, obrazovanju i geopolitici.',
    desc: 'Pogledaj širu sliku: kako AI menja tržište rada, obrazovanje i geopolitiku. Zamisli svoj svet 2030. uz AI.',
    lessons: [
      {
        id: 1, title: 'Tržište rada i veštine budućnosti',
        intro: 'Da li će AI ukrasti tvoj posao? Ovo je najčešće pitanje koje se postavlja. Odgovor je složeniji od da ili ne – i mnogo je važniji.',
        sections: [
          { heading: 'Koje poslove AI menja?', content: 'AI menja poslove u talasima:\n\nPrvi talas (već se dešava):\n• Repetitivni kancelarijski poslovi (unos podataka, basic izveštaji)\n• Neke vrste korisničke podrške\n• Jednostavna analiza podataka\n• Prevodilački poslovi (basic level)\n\nSledeći talas:\n• Radiolozi (AI već dostiže njihovu tačnost u dijagnozi)\n• Pravni istraživači\n• Neki programeri (za rutinski kod)' },
          { heading: 'Koje veštine ostaju vredne?', content: 'Veštine koje AI teško imitira:\n• Kritičko i kreativno mišljenje\n• Empatija i interpersonalne veštine\n• Etičko rasuđivanje\n• Leadership i motivacija\n• Fizičke veštine u nepredvidivim okruženjima\n• Strategijsko planiranje\n\nVeštine koje postaju vredniji:\n• AI literacy (razumevanje AI)\n• Prompt engineering\n• AI-augmented domain expertise\n• Interdisciplinarno razmišljanje' },
          { heading: 'Nova zanimanja i prilike', content: 'AI kreira nova zanimanja:\n• AI trainer / RLHF specialist\n• Prompt engineer\n• AI ethics officer\n• AI product manager\n• Human-AI interaction designer\n• AI safety researcher\n\nHistorijski, tehnološke revolucije su dugoročno kreirale više poslova nego što su uklonile. Ali tranzicija može biti bolna za one koji nisu pripremljeni.' },
        ],
        keyTerms: [
          { term: 'AI literacy', def: 'Sposobnost razumevanja, korišćenja i kritičke evaluacije AI sistema' },
          { term: 'Augmentacija', def: 'Proširivanje ljudskih sposobnosti AI alatima, ne zamena' },
          { term: 'Reskilling', def: 'Učenje novih veština za prilagođavanje promenama na tržištu rada' },
          { term: 'Future of Work', def: 'Istraživanje kako će AI i automatizacija transformisati radno okruženje' },
        ],
        task: 'Istraži jedno zanimanje koje te zanima. Proceni: koje aspekte tog posla AI već može da obavi, koje ne može, i koje nove veštine bi bile vredne za nekoga ko želi da se bavi tim zanimanjem u 2030. godini.'
      },
      {
        id: 2, title: 'AI u obrazovanju, zdravstvu, umetnosti i medijima',
        intro: 'AI ne transformiše samo tehnološke industrije – ona menja svaki sektor, od učionice do operacione sale, od galerije umetnosti do newsrooma.',
        sections: [
          { heading: 'AI u obrazovanju', content: 'Personalizovano učenje na skali:\n• Adaptive learning platforme prilagođavaju gradivo svakom učeniku\n• AI tutori dostupni 24/7 za podršku\n• Automatsko ocenjivanje eseja\n• Prevođenje materijala za globalni pristup\n\nIzazovi:\n• Digitalna nejednakost (ne svi imaju pristup)\n• Akademski integritet (plagijat i varanje)\n• Gubitak kritičnog mišljenja ako se previše oslanjamo na AI' },
          { heading: 'AI u zdravstvu', content: 'Dijagnostika:\n• AI postiže tačnost radiologa u detekciji raka dojke i pluća\n• Analiza EKG-a i detekcija aritmija\n• Predikcija sepse u bolnicama\n\nIstraživanje:\n• AlphaFold (DeepMind) je rešio problem savijanja proteina koji je mučio naučnike 50 godina\n• Ubrzavanje razvoja lekova od 10+ godina na 2-3 godine\n\nMentalnog zdravlje:\n• AI chatbotovi za podršku (Woebot)\n• Detekcija depresije iz govora i pisanja' },
          { heading: 'AI u umetnosti i medijima', content: 'Kreativna AI:\n• Generisanje muzike (Suno, Udio)\n• Generisanje slika (DALL·E, Midjourney)\n• Video sinteza i deepfake\n• AI pisanje (GPT-4, Claude)\n\nPitanja autorskih prava:\nDa li AI-generisani sadržaj može biti zaštićen autorskim pravima? Ko je vlasnik – AI, kompanija, ili korisnik? Ova pitanja se aktivno rešavaju u sudovima.\n\nDezinformacije:\nAI može da generiše uverljive lažne vesti masovnog obima. Medijska pismenost postaje kritična veština.' },
        ],
        keyTerms: [
          { term: 'AlphaFold', def: 'DeepMind AI koji je rešio problem savijanja proteina, revolucionišući biologiju' },
          { term: 'Generativna AI', def: 'AI koja kreira novi sadržaj: tekst, slike, muziku, video' },
          { term: 'Medijska pismenost', def: 'Sposobnost kritičke evaluacije medijskog sadržaja, uključujući AI-generisani' },
          { term: 'Digital divide', def: 'Jaz između onih koji imaju i onih koji nemaju pristup digitalnim tehnologijama' },
        ],
        task: 'Isprobaj jedan AI alat za kreativnost: napravi sliku (Bing Image Creator), pesmu (Suno) ili kratku priču (ChatGPT). Potom razmisli: da li to što si napravio smatraš umetnošću? Ko je autor?'
      },
      {
        id: 3, title: 'Geopolitika AI i svet sa AGI',
        intro: 'AI nije samo tehnologija – ona je geopolitičko oružje, ekonomska sila i civilizacijska promena. Ko kontroliše AI, kontroliše budućnost.',
        sections: [
          { heading: 'Globalna AI trka', content: 'Tri ključna igrača:\n\nSAD: OpenAI, Anthropic, Google DeepMind, Meta AI – dominiraju u fundamentalnom istraživanju i komercijalnoj primeni\n\nKina: Baidu, Alibaba, Huawei – ogromna količina podataka, državna podrška, ali ograničen pristup čipovima zbog američkih sankcija\n\nEU: lider u regulaciji (EU AI Act), ali zaostaje u razvoju sopstvenih modela\n\nOstalo: UAE, UK, Japan, Kanada – jaki u specifičnim domenima' },
          { heading: 'EU AI Act – globalna regulacija', content: 'EU AI Act (stupio na snagu 2024) klasifikuje AI po riziku:\n\n• Neprihvatljiv rizik (zabranjeno): socijalni bodovi, manipulacija, biometrija u realnom vremenu\n• Visok rizik (strogi zahtevi): medicinski uređaji, kriticna infrastruktura, obrazovanje\n• Ograničen rizik (transparentnost): chatbotovi moraju reći da su AI\n• Minimalan rizik (slobodna upotreba): spam filteri, igrice\n\nOvo je prvi sveobuhvatni AI zakon na svetu i će uticati na globalne standarde.' },
          { heading: 'Šta je AGI i kada dolazi?', content: 'AGI (Artificial General Intelligence) bi bila AI koja može obavljati bilo koji intelektualni zadatak kao čovek – ili bolje.\n\nZa razliku od današnje uske AI:\n• Razumela bi kontekst i nijanse\n• Učila bi nove zadatke bez re-treniranja\n• Rešavala bi probleme iz potpuno novih oblasti\n\nKada? Mišljenja se razlikuju:\n• Optimisti (neki u OpenAI): 2-5 godina\n• Realisti: 10-20 godina\n• Skeptici: možda nikad, jer se uvek pomeraju "stubovi"\n\nŠta bi AGI značio za čovečanstvo? Ovo je možda najvažnije pitanje 21. veka.' },
        ],
        keyTerms: [
          { term: 'AGI', def: 'Artificial General Intelligence – AI sposobna za bilo koji intelektualni zadatak' },
          { term: 'EU AI Act', def: 'Evropski zakon o AI koji reguliše upotrebu prema stepenu rizika' },
          { term: 'AI Safety', def: 'Istraživačko polje koje se bavi bezbednošću i poravnanjem AI sistema' },
          { term: 'Semiconductor', def: 'Čipovi koji pokreću AI – centralni resurs u geopolitičkoj AI trci' },
        ],
        task: 'Napravi svoj scenario za 2030. godinu: Kako će izgledati tvoj tipičan dan? Koji AI alati ćeš koristiti? Kako će izgledati tvoj posao, obrazovanje, zdravlje? Budi specifičan i razmisli o i pozitivnim i negativnim stranama.'
      },
    ]
  },
];

if (typeof module !== 'undefined') module.exports = { modules };
