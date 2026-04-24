const questions = {
  1: [
    {
      question: "Koja od sledećih je primer uske (slabe) AI?",
      options: ["AI koja razume sve ljudske emocije", "Preporuke na Spotify", "Superinteligencija iz filma", "AI koja rešava sve zadatke kao čovek"],
      correct: 1,
      explanation: "Uska AI obavlja jedan konkretan zadatak. Preporuke na Spotify su klasičan primer uske AI."
    },
    {
      question: "Šta je 'model' u kontekstu AI?",
      options: ["3D model za štampu", "'Mozak' AI sistema koji uči iz podataka", "Fizički robot", "Programski jezik"],
      correct: 1,
      explanation: "Model je 'mozak' AI sistema – matematička struktura koja je naučila obrasce iz trening podataka."
    },
    {
      question: "Koji od sledećih primera NIJE primena AI u svakodnevnom životu?",
      options: ["Google Maps koji predviđa gužve", "TikTok preporuke videa", "Lampica koja svetli kada pritisneš dugme", "Face ID na iPhoneu"],
      correct: 2,
      explanation: "Lampica koja svetli na pritisak dugmeta je jednostavna električna kola – ne koristi AI. Ostali primeri koriste AI algoritme."
    },
    {
      question: "Šta su 'trening podaci' u AI?",
      options: ["Podaci o fizičkom treningu", "Primeri koje dajemo AI da uči iz njih", "Rezultati testova", "Softverski kod"],
      correct: 1,
      explanation: "Trening podaci su primeri iz kojih AI uči – npr. milioni slika mačaka i pasa za učenje prepoznavanja."
    },
    {
      question: "Šta je 'opšta (jaka) AI'?",
      options: ["AI koja brže procesira podatke", "AI koja razume i rešava širi spektar zadataka kao čovek – i još ne postoji", "AI koja koristi više podataka", "AI koja ima internet konekciju"],
      correct: 1,
      explanation: "Opšta AI bi mogla da obavlja bilo koji intelektualni zadatak kao čovek. Za razliku od uske AI, ona još uvek ne postoji."
    }
  ],
  2: [
    {
      question: "Šta je 'heuristika' u kontekstu AI pretrage?",
      options: ["Vrsta greške u kodu", "Pravilo koje pomaže AI da brže proceni i odabere bolju opciju", "Matematička formula za tačne rezultate", "Vrsta baze podataka"],
      correct: 1,
      explanation: "Heuristike su praktična pravila koja pomažu AI da brže pronađe dovoljno dobro rešenje, npr. 'idi ka tački koja je fizički najbliža cilju'."
    },
    {
      question: "Šta je 'minimax' algoritam?",
      options: ["Algoritam za kompresiju podataka", "Algoritam za igre koji bira potez koji minimizuje maksimalnu štetu", "Metoda za sortiranje podataka", "Tehnika za ubrzanje interneta"],
      correct: 1,
      explanation: "Minimax algoritam se koristi u igrama – AI pretpostavlja da protivnik igra savršeno i bira potez koji minimizuje njen maksimalni mogući gubitak."
    },
    {
      question: "Koja su tri elementa koje AI agent mora znati da bi rešio problem?",
      options: ["Boju, veličinu i oblik", "Početno stanje, ciljno stanje i dozvoljene akcije", "Brzinu, memoriju i procesor", "Jezik, bazu podataka i interfejs"],
      correct: 1,
      explanation: "AI agent mora znati gde se nalazi (početno stanje), gde treba da stigne (ciljno stanje) i šta sme da uradi (akcije)."
    },
    {
      question: "Koje godine je Deep Blue pobedio svetskog šampiona u šahu Garija Kasparova?",
      options: ["1985", "1997", "2005", "2011"],
      correct: 1,
      explanation: "1997. godine IBM-ov Deep Blue pobedio je Garija Kasparova – to je bio istorijski prvi put da je mašina nadigrala svetskog šampiona u šahu."
    },
    {
      question: "Šta je 'reinforcement learning'?",
      options: ["Učenje iz označenih podataka", "Učenje kroz nagradu i kaznu iz sopstvenog iskustva", "Kopiranje tuđih rešenja", "Učenje bez ikakvih podataka"],
      correct: 1,
      explanation: "U reinforcement learning-u, AI dobija 'nagradu' za dobre poteze i 'kaznu' za loše – i tako uči optimalnu strategiju kroz iskustvo."
    }
  ],
  3: [
    {
      question: "U nadgledanom učenju, AI dobija:",
      options: ["Samo ulazne podatke bez objašnjenja", "Ulazne podatke i tačne oznake (labele) za svaki primer", "Samo ciljni rezultat bez primera", "Nasumične podatke"],
      correct: 1,
      explanation: "Nadgledano učenje koristi označene podatke – AI uči da poveže ulaze sa tačnim oznakama, npr. sliku mačke sa oznakom 'mačka'."
    },
    {
      question: "Gmail spam filter je primer kog tipa mašinskog učenja?",
      options: ["Nenadgledano učenje", "Reinforcement learning", "Nadgledano učenje – klasifikacija", "Duboko učenje bez podataka"],
      correct: 2,
      explanation: "Gmail spam filter je primer nadgledanog učenja (klasifikacija) – naučen je na milionima označenih mejlova (spam/nije spam)."
    },
    {
      question: "Šta je 'overfitting' u mašinskom učenju?",
      options: ["Model je premali za podatke", "Model previše upamti trening podatke i loše radi na novim podacima", "Model uči prebrzo", "Model koristi previše memorije"],
      correct: 1,
      explanation: "Overfitting nastaje kada model uči specifičnosti trening skupa umesto opštih obrazaca – kao student koji pamti odgovore napamet ali ne razume gradivo."
    },
    {
      question: "Šta je razlika između klasifikacije i regresije?",
      options: ["Nema razlike", "Klasifikacija razvrstava u kategorije, regresija predviđa numeričke vrednosti", "Regresija je tačnija od klasifikacije", "Klasifikacija koristi više podataka"],
      correct: 1,
      explanation: "Klasifikacija odgovara 'kojoj kategoriji ovo pripada?' (spam/nije spam), dok regresija odgovara 'koja vrednost?' (koliko košta kuća)."
    },
    {
      question: "Kolaborativno filtriranje na Netflixu znači:",
      options: ["Netflix filtrira neprikladne sadržaje", "Preporuka zasnovana na sličnosti sa ponašanjem drugih korisnika", "AI bira filmove nasumično", "Netflix blokira određene korisnike"],
      correct: 1,
      explanation: "Kolaborativno filtriranje preporučuje sadržaj na osnovu ponašanja sličnih korisnika – 'korisnici koji su gledali X, gledali su i Y'."
    }
  ],
  4: [
    {
      question: "Šta određuje 'težina' (weight) u neuronskoj mreži?",
      options: ["Fizičku veličinu mreže", "Jačinu veze između neurona", "Brzinu procesiranja", "Količinu podataka"],
      correct: 1,
      explanation: "Težine su brojevi koji određuju koliko je jaka veza između neurona – tokom treniranja, mreža podešava težine da smanji grešku."
    },
    {
      question: "Zašto se zove 'duboko' učenje?",
      options: ["Jer duboko razume podatke", "Jer ima mnogo slojeva u neuronskoj mreži", "Jer koristi duboke baze podataka", "Jer traje dugo"],
      correct: 1,
      explanation: "Duboko učenje se zove tako jer koristi neuronske mreže sa mnogo skrivenih slojeva – svaki sloj uči složenije karakteristike podataka."
    },
    {
      question: "Šta je 'backpropagation'?",
      options: ["Čuvanje backup kopije mreže", "Algoritam koji propagira grešku unazad kroz mrežu i ažurira težine", "Povratak na prethodnu verziju modela", "Smanjivanje veličine mreže"],
      correct: 1,
      explanation: "Backpropagation izračunava kako svaka težina doprinosi grešci i ažurira je – analogno tome kako učimo iz grešaka."
    },
    {
      question: "CNN (Konvoluciona neuronska mreža) je specijalizovana za:",
      options: ["Obradu teksta i jezika", "Obradu slika i video sadržaja", "Igranje igrica", "Analizu finansijskih podataka"],
      correct: 1,
      explanation: "CNN mreže su dizajnirane za obradu mrežnih podataka poput slika – koriste konvolucione filtere da detektuju ivice, oblike i objekte."
    },
    {
      question: "Transformer arhitektura je osnova:",
      options: ["Robotike", "Svih modernih jezičkih modela kao što su ChatGPT i Claude", "Autonomnih vozila", "Medicinskih uređaja"],
      correct: 1,
      explanation: "Transformer sa mehanizmom 'pažnje' (attention) je arhitektura koja stoji iza ChatGPT, Claude, Gemini i svih modernih jezičkih modela."
    }
  ],
  5: [
    {
      question: "Šta znači 'hallucination' u kontekstu jezičkih modela?",
      options: ["AI ima vizuelne efekte", "AI daje uverljiv ali netačan odgovor", "AI prestaje da radi", "AI govori previše brzo"],
      correct: 1,
      explanation: "Halucinacija je kada AI daje uverljivo formulisan ali faktički netačan odgovor – zato je važno uvek proveravati informacije koje AI daje."
    },
    {
      question: "Šta je 'prompt engineering'?",
      options: ["Programiranje AI sistema", "Veština pisanja efikasnih upita za AI modele", "Dizajn interfejsa", "Testiranje softvera"],
      correct: 1,
      explanation: "Prompt engineering je veština formulisanja upita AI modelima na način koji daje najkorisnije i najpreciznije odgovore."
    },
    {
      question: "Koji AI alat je posebno koristan za sumarizaciju dugih dokumenata?",
      options: ["Photoshop", "Google Maps", "Claude ili ChatGPT", "Microsoft Excel"],
      correct: 2,
      explanation: "Jezički modeli poput Claude i ChatGPT su odlični za sumarizaciju – mogu da sumiraju 20-straničan izveštaj za nekoliko sekundi."
    },
    {
      question: "Šta je 'adaptivno učenje' u obrazovanju?",
      options: ["Učenje u različitim vremenskim zonama", "Sistem koji prilagođava sadržaj prema napretku i greškama učenika", "Učenje na različitim uređajima", "Brzo učenje novih tema"],
      correct: 1,
      explanation: "Adaptivno učenje personalizuje obrazovni sadržaj – npr. Duolingo prati gde grešiš i prilagođava lekcije tvom tempu."
    },
    {
      question: "Koji je ključni nedostatak AI asistenata koji treba imati na umu?",
      options: ["Previše su skupi", "Mogu halucinirati i imati zastarele informacije", "Rade samo na engleskom", "Rade samo na kompjuterima"],
      correct: 1,
      explanation: "AI asistenti mogu halucinirati (izmišljati činjenice), imati zastarele podatke i ne razumeti tvoj lični kontekst – uvek proveravaj važne informacije."
    }
  ],
  6: [
    {
      question: "Zašto je Amazon ugasio svoj AI alat za regrutaciju?",
      options: ["Bio je preskup", "Diskriminisao je žene jer je naučen na istorijskim podacima gde su muškarci dominirali u IT", "Bio je presporao", "Nije radio na mobilnim uređajima"],
      correct: 1,
      explanation: "Amazon-ov AI za regrutaciju naučio je da preferira muške kandidate jer su trening podaci odražavali istorijsku dominaciju muškaraca u IT industriji."
    },
    {
      question: "Šta je 'deepfake'?",
      options: ["Vrsta hakerskog napada na server", "AI-generisani lažni video ili audio koji imitira stvarnu osobu", "Lažni profil na društvenim mrežama", "Virus koji briše podatke"],
      correct: 1,
      explanation: "Deepfake koristi generativne neuronske mreže da kreira hyperrealistične lažne snimke osoba – može biti zloupotrebljeno za dezinformacije."
    },
    {
      question: "Šta reguliše GDPR?",
      options: ["Cene digitalnih proizvoda", "Kako se lični podaci korisnika EU prikupljaju i koriste", "Brzinu interneta", "Poreze na tehnološke kompanije"],
      correct: 1,
      explanation: "GDPR (General Data Protection Regulation) je evropski zakon koji štiti lične podatke građana EU i daje im kontrolu nad tim kako se koriste."
    },
    {
      question: "Ko je odgovoran kada AI sistem donese pogrešnu medicinsku dijagnozu?",
      options: ["Samo programer koji ga je napravio", "Niko – AI nije odgovoran", "Odgovornost je kolektivna: programeri, bolnica koja ga koristi i lekari koji se oslanjaju na njega", "Samo pacijent koji je dao pristanak"],
      correct: 2,
      explanation: "Odgovornost za AI greške je kolektivna – programeri, institucije koje implementiraju AI i korisnici koji ga nekritički primenjuju dele odgovornost."
    },
    {
      question: "Koji je princip 'objašnjive AI' (Explainable AI)?",
      options: ["AI koja piše duga objašnjenja", "AI čije odluke mogu da se razumeju i objasne ljudima", "AI koja govori naglas", "AI sa video uputstvima"],
      correct: 1,
      explanation: "Objašnjiva AI (XAI) osigurava da korisnici mogu razumeti zašto je AI donela određenu odluku – ključno za poverenje i odgovornost."
    }
  ],
  7: [
    {
      question: "Koje veštine AI teže imitira i koje ostaju vredne?",
      options: ["Unos podataka i izrada izveštaja", "Kritičko mišljenje, empatija i etičko rasuđivanje", "Prevođenje i analiza teksta", "Pretraživanje i organizacija informacija"],
      correct: 1,
      explanation: "AI teško imitira empatiju, kreativnost, etičko rasuđivanje i interpersonalne veštine – ove kompetencije ostaju izrazito vredne u budućnosti rada."
    },
    {
      question: "Šta je 'AGI' (Artificial General Intelligence)?",
      options: ["Napredni gaming AI", "Hipotetička AI sposobna za bilo koji intelektualni zadatak kao čovek", "Vladina AI agencija", "AI za grafički dizajn"],
      correct: 1,
      explanation: "AGI bi bila AI koja može obavljati bilo koji intelektualni zadatak kao čovek ili bolje – za razliku od današnje uske AI specijalizovane za jedan zadatak."
    },
    {
      question: "Šta je EU AI Act i kada je stupio na snagu?",
      options: ["Američki zakon o AI iz 2020.", "Evropski zakon koji klasifikuje AI po riziku, stupio na snagu 2024.", "Međunarodni sporazum o zabrani AI", "EU poreski zakon za AI kompanije"],
      correct: 1,
      explanation: "EU AI Act stupio je na snagu 2024. godine i klasifikuje AI sisteme prema riziku (neprihvatljiv, visok, ograničen, minimalan) sa odgovarajućim obavezama."
    },
    {
      question: "Šta je AlphaFold i zašto je značajan?",
      options: ["AI za igranje šaha", "DeepMind AI koji je rešio problem savijanja proteina koji je mučio naučnike 50 godina", "AI za generisanje muzike", "AI asistent za programiranje"],
      correct: 1,
      explanation: "AlphaFold je DeepMind-ov AI koji je rešio problem predviđanja 3D strukture proteina – revolucionarna dostignuće za biologiju i razvoj lekova."
    },
    {
      question: "Ko su tri ključna globalna igrača u AI trci?",
      options: ["Rusija, Brazil i Indija", "SAD, Kina i EU", "Japan, Koreja i Australija", "UK, Kanada i Izrael"],
      correct: 1,
      explanation: "SAD dominira fundamentalnim istraživanjem (OpenAI, Google), Kina ima ogromne podatke i državnu podršku, a EU vodi u regulaciji (EU AI Act)."
    }
  ]
};

module.exports = { questions };
