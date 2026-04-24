const questions = {
  1: [
    {
      question: "Šta je veštačka inteligencija?",
      options: ["Vrsta robota koji hoda", "Sposobnost mašine da uči i rešava probleme", "Brži internet", "Novi programski jezik"],
      correct: 1,
      explanation: "AI je grana računarstva koja se bavi razvojem sistema sposobnih da obavljaju zadatke koji zahtevaju ljudsku inteligenciju."
    },
    {
      question: "Koja godina se smatra početkom AI kao naučne oblasti?",
      options: ["1936", "1956", "1969", "1984"],
      correct: 1,
      explanation: "Na Dartmouth konferenciji 1956. godine, John McCarthy je skovao termin 'veštačka inteligencija'."
    },
    {
      question: "Šta je Turingov test?",
      options: ["Test brzine procesora", "Test da li mašina može da se ponaša nerazlučivo od čoveka", "Test programerskog znanja", "Test sigurnosti sistema"],
      correct: 1,
      explanation: "Alan Turing predložio je 1950. test kojim se proverava može li mašina pokazati inteligentno ponašanje ekvivalentno čovekovom."
    },
    {
      question: "Koja od sledećih aplikacija NIJE primer AI?",
      options: ["Prepoznavanje govora", "Preporuka filmova na Netflixu", "Kalkulator koji sabira brojeve", "Detekcija prevara u banci"],
      correct: 2,
      explanation: "Kalkulator izvršava unapred definisane operacije bez učenja — to nije AI. Ostale tri aplikacije koriste AI algoritme."
    },
    {
      question: "Šta znači skraćenica AI?",
      options: ["Automated Internet", "Advanced Interface", "Artificial Intelligence", "Applied Innovation"],
      correct: 2,
      explanation: "AI = Artificial Intelligence = Veštačka inteligencija — sposobnost mašine da simulira aspekte ljudske inteligencije."
    }
  ],
  2: [
    {
      question: "Šta je algoritam?",
      options: ["Vrsta baze podataka", "Precizno definisan niz koraka za rešavanje problema", "Programski jezik", "Vrsta procesora"],
      correct: 1,
      explanation: "Algoritam je skup jasnih, izvršivih instrukcija koje vode ka rešenju problema."
    },
    {
      question: "Koji pristup AI sistema se zasniva na sistemu 'ako-onda' pravila?",
      options: ["Mašinsko učenje", "Ekspertni sistemi zasnovani na pravilima", "Neuronske mreže", "Duboko učenje"],
      correct: 1,
      explanation: "Ekspertni sistemi koriste bazu znanja i pravila zaključivanja u obliku 'ako uslov, onda akcija'."
    },
    {
      question: "Šta je pretraga u prostoru stanja?",
      options: ["Pretraga interneta", "Sistematično istraživanje mogućih rešenja problema", "Pretraga baze podataka", "Pretraga fajlova"],
      correct: 1,
      explanation: "Pretraga prostora stanja je osnovna tehnika u AI kojom sistem istražuje moguće akcije i stanja da bi pronašao cilj."
    },
    {
      question: "Kako Deep Blue (IBM) pobedio Kasparova 1997?",
      options: ["Kopiranjem njegovih poteza", "Slučajnim odabirom poteza", "Analizom miliona pozicija po sekundi", "Učenjem od prethodnih šampiona"],
      correct: 2,
      explanation: "Deep Blue je mogao da analizira 200 miliona pozicija u sekundi koristeći minimax algoritam sa alfa-beta odsecanjem."
    },
    {
      question: "Šta je heuristika u AI?",
      options: ["Vrsta greške u kodu", "Praktično pravilo koje ubrzava pronalaženje rešenja", "Matematička formula", "Vrsta baze podataka"],
      correct: 1,
      explanation: "Heuristika su prečice i praktična pravila koja pomažu u pronalaženju dovoljno dobrog rešenja kada je optimalno rešenje skupo."
    }
  ],
  3: [
    {
      question: "Šta je osnovna ideja mašinskog učenja?",
      options: ["Ručno programirati svako pravilo", "Sistemi koji uče iz podataka bez eksplicitnog programiranja", "Brže izvršavanje koda", "Bolje grafičko korisničko sučelje"],
      correct: 1,
      explanation: "ML omogućava računarima da uče iz iskustva i poboljšavaju performanse bez eksplicitnog programiranja."
    },
    {
      question: "Koji tip mašinskog učenja koristi označene podatke?",
      options: ["Nenadgledano učenje", "Reinforcement learning", "Nadgledano učenje", "Transfer learning"],
      correct: 2,
      explanation: "Nadgledano učenje (supervised learning) koristi skup podataka gde svaki primer ima oznaku (label) koja govori modelu šta je tačan odgovor."
    },
    {
      question: "Šta je klasifikacija u ML?",
      options: ["Razvrstavanje podataka u unapred definisane kategorije", "Predviđanje kontinualne vrednosti", "Grupisanje sličnih podataka", "Smanjenje dimenzionalnosti"],
      correct: 0,
      explanation: "Klasifikacija je zadatak dodeljivanja ulaznih podataka jednoj od unapred definisanih kategorija, npr. spam/nije spam."
    },
    {
      question: "Šta je overfitting?",
      options: ["Model je previše jednostavan", "Model previše dobro pamti trening podatke i loše generalizuje", "Premalo podataka za treniranje", "Greška u algoritmu"],
      correct: 1,
      explanation: "Overfitting nastaje kada model uči specifičnosti trening skupa umesto opštih obrazaca, pa loše radi na novim podacima."
    },
    {
      question: "Čemu služi test skup podataka (test set)?",
      options: ["Za treniranje modela", "Za podešavanje hiperparametara", "Za procenu performansi modela na neviđenim podacima", "Za vizualizaciju podataka"],
      correct: 2,
      explanation: "Test skup se koristi isključivo za finalnu procenu modela i simulira kako će model raditi u stvarnosti."
    }
  ],
  4: [
    {
      question: "Čime su inspirirane neuronske mreže?",
      options: ["Električnim kolima", "Strukturom i funkcionisanjem biološkog mozga", "Internet mrežama", "Matematičkim matricama"],
      correct: 1,
      explanation: "Veštačke neuronske mreže su inspirisane biološkim neuronima i sinapsama u ljudskom mozgu."
    },
    {
      question: "Šta je uloga aktivacijske funkcije u neuronskoj mreži?",
      options: ["Ubrzava treniranje", "Uvodi nelinearnost, omogućavajući mreži da uči kompleksne obrasce", "Smanjuje veličinu mreže", "Čuva podatke"],
      correct: 1,
      explanation: "Bez aktivacijskih funkcija, neuronska mreža bi bila samo linearna transformacija. Aktivacijske funkcije omogućavaju učenje nelinearnih obrazaca."
    },
    {
      question: "Šta označava 'duboko' u dubokom učenju (deep learning)?",
      options: ["Duboko razumevanje podataka", "Mnoštvo slojeva u neuronskoj mreži", "Veliku količinu podataka", "Dugo vreme treniranja"],
      correct: 1,
      explanation: "Duboko učenje se odnosi na neuronske mreže sa mnogo skrivenih slojeva, što im omogućava učenje hijerarhijskih reprezentacija."
    },
    {
      question: "Koji tip neuronske mreže se najčešće koristi za obradu slika?",
      options: ["Rekurentne neuronske mreže (RNN)", "Konvolucione neuronske mreže (CNN)", "Generativne suparničke mreže (GAN)", "Autoenkoderi"],
      correct: 1,
      explanation: "CNN mreže su specijalizovane za obradu mrežnih podataka poput slika, koristeći konvolucione filtere za detekciju karakteristika."
    },
    {
      question: "Šta je backpropagation?",
      options: ["Tehnika za povećanje brzine mreže", "Algoritam koji propagira grešku unazad kroz mrežu da bi ažurirao težine", "Metoda za smanjenje mreže", "Tehnika za backup podataka"],
      correct: 1,
      explanation: "Backpropagation izračunava gradijent funkcije gubitka i ažurira težine mreže koristeći gradient descent."
    }
  ],
  5: [
    {
      question: "Koji od sledećih alata koristi AI za generisanje teksta?",
      options: ["Microsoft Word", "Adobe Photoshop", "ChatGPT", "Google Chrome"],
      correct: 2,
      explanation: "ChatGPT je large language model (LLM) koji koristi AI za razumevanje i generisanje prirodnog jezika."
    },
    {
      question: "Šta je preporučiteljski sistem (recommender system)?",
      options: ["Sistem koji preporučuje lekove", "AI sistem koji predlaže sadržaj na osnovu korisničkih preferencija", "Sistem za pretragu interneta", "Antivirus program"],
      correct: 1,
      explanation: "Netflix, Spotify i Amazon koriste preporučiteljske sisteme da personalizuju iskustvo svakog korisnika."
    },
    {
      question: "Koja je primena AI u zdravstvu?",
      options: ["Samo administracija", "Dijagnoza bolesti, analiza medicinskih slika i razvoj lekova", "Samo istraživanje", "Samo naručivanje lekova"],
      correct: 1,
      explanation: "AI pomaže radiolozima u analizi snimaka, predviđa rizik od bolesti i ubrzava razvoj novih lekova."
    },
    {
      question: "Šta je autonomno vozilo?",
      options: ["Vozilo na električni pogon", "Vozilo koje se kreće bez vozača koristeći AI", "Vozilo sa automatskim menjačem", "Vozilo na solarni pogon"],
      correct: 1,
      explanation: "Autonomna vozila koriste kombinaciju senzora, računarskog vida i AI da bi se bezbedno kretala bez vozača."
    },
    {
      question: "Kako AI pomaže u personalizovanom obrazovanju?",
      options: ["Zamenjuje nastavnike potpuno", "Prilagođava tempo, sadržaj i stil učenja svakom učeniku", "Samo ocenjuje testove", "Pravi raspored"],
      correct: 1,
      explanation: "Adaptivni sistemi učenja prate napredak, identifikuju slabe tačke i prilagođavaju materijal potrebama svakog učenika."
    }
  ],
  6: [
    {
      question: "Šta je algoritmijska pristrasnost (bias)?",
      options: ["Greška u programskom kodu", "Sistematska nepravičnost u AI odlukama zbog pristrasnih podataka", "Spor algoritam", "Previše podataka"],
      correct: 1,
      explanation: "Bias nastaje kada trening podaci odražavaju istorijske nejednakosti, što AI sistem usvaja i reprodukuje u odlukama."
    },
    {
      question: "Koji je princip 'objašnjive AI' (Explainable AI)?",
      options: ["AI koja piše objašnjenja tekstova", "AI čije odluke mogu da se razumeju i objasne ljudima", "AI sa glasovnim objašnjenjima", "AI za edukaciju"],
      correct: 1,
      explanation: "XAI (Explainable AI) osigurava da korisnici mogu razumeti zašto je AI donela određenu odluku, što je ključno za poverenje."
    },
    {
      question: "Šta reguliše EU AI Act (Zakon o AI)?",
      options: ["Cene AI proizvoda", "Razvoj i primenu AI sistema prema nivoima rizika", "Obrazovanje o AI", "Poreze na AI kompanije"],
      correct: 1,
      explanation: "EU AI Act klasifikuje AI sisteme prema riziku (minimalni, ograničeni, visoki, neprihvatljivi) i propisuje obaveze za svaki nivo."
    },
    {
      question: "Šta je deepfake?",
      options: ["Vrsta hakerskog napada", "Lažni video/audio sadržaj generisan AI tehnologijom", "Deepweb stranica", "AI igra"],
      correct: 1,
      explanation: "Deepfake koristi generativne neuronske mreže da kreira uvjerljive lažne snimke koji mogu biti zloupotrebljeni za dezinformacije."
    },
    {
      question: "Koji je etički problem u AI prepoznavanju lica?",
      options: ["Previše je skupo", "Može biti pristrasno i kršiti privatnost", "Previše je sporo", "Ne radi na telefonima"],
      correct: 1,
      explanation: "Sistemi za prepoznavanje lica pokazuju veću stopu grešaka za određene demografske grupe i mogu biti zloupotrebljeni za masovni nadzor."
    }
  ],
  7: [
    {
      question: "Koji poslovi su NAJOTPORNIJI na automatizaciju veštačkom inteligencijom?",
      options: ["Unos podataka", "Poslovi koji zahtevaju empatiju, kreativnost i socijalne veštine", "Vožnja kamiona", "Pregled dokumenata"],
      correct: 1,
      explanation: "Poslovi koji kombinuju empatiju, kompleksno rasuđivanje i socijalne veštine teže se automatizuju jer AI još uvek ne može da ih replicira."
    },
    {
      question: "Šta je 'AI zima' (AI winter)?",
      options: ["AI koja simulira zimu", "Period smanjenog interesovanja i finansiranja AI istraživanja", "Energetska efikasnost AI", "AI u meteorologiji"],
      correct: 1,
      explanation: "Bilo je više 'AI zima' u istoriji — periodi kada su visoka očekivanja bila razbijen, što je dovelo do drastičnog smanjenja ulaganja."
    },
    {
      question: "Šta je AGI (Artificial General Intelligence)?",
      options: ["Napredni gaming AI", "Hipotetička AI koja može obavljati bilo koji intelektualni zadatak kao čovek", "Vladina AI agencija", "AI za grafički dizajn"],
      correct: 1,
      explanation: "AGI je AI sposobna za generalnu inteligenciju — za razliku od narrow AI koja je specijalizovana za jedan zadatak."
    },
    {
      question: "Koliko električne energije troši obuka velikih AI modela?",
      options: ["Zanemarljivo malo", "Ekvivalentno stotinama ili hiljadama domaćinstava godišnje", "Isto kao mobilni telefon", "Manje od laptopa"],
      correct: 1,
      explanation: "Obuka modela poput GPT-4 troši ogromne količine energije i ima značajan ugljični otisak, što je rastući ekološki problem."
    },
    {
      question: "Šta je najvažniji uslov za odgovoran razvoj AI?",
      options: ["Što brži razvoj bez ograničenja", "Međunarodna saradnja, regulativa i etički principi", "Tajnost istraživanja", "Monopol jedne kompanije"],
      correct: 1,
      explanation: "Odgovoran AI razvoj zahteva transparentnost, međunarodne standarde, etički nadzor i inkluzivno učešće svih zainteresovanih strana."
    }
  ]
};

module.exports = { questions };
