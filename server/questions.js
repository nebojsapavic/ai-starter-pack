const questions = {
  1: [
    { question: "Šta je veštačka inteligencija?", options: ["Vrsta robota", "Sposobnost mašine da uči i rešava probleme", "Internet mreža", "Programski jezik"], correct: 1, explanation: "AI je sposobnost mašine da simulira ljudsku inteligenciju." },
    { question: "Ko se smatra ocem AI?", options: ["Bill Gates", "Alan Turing", "Elon Musk", "Steve Jobs"], correct: 1, explanation: "Alan Turing postavio je temelje AI kroz Turingov test." },
    { question: "Šta je Turingov test?", options: ["Test brzine računara", "Test da li mašina može misliti kao čovek", "Test programiranja", "Test memorije"], correct: 1, explanation: "Turingov test proverava može li mašina pokazati inteligentno ponašanje." },
    { question: "Koja od sledećih je primena AI?", options: ["Kalkulator", "Prepoznavanje lica", "Štampač", "Monitor"], correct: 1, explanation: "Prepoznavanje lica koristi AI algoritme." },
    { question: "Šta znači skraćenica AI?", options: ["Automated Internet", "Artificial Intelligence", "Advanced Interface", "Applied Innovation"], correct: 1, explanation: "AI = Artificial Intelligence = Veštačka inteligencija." }
  ],
  2: [
    { question: "Šta je algoritam?", options: ["Vrsta računara", "Niz koraka za rešavanje problema", "Programski jezik", "Baza podataka"], correct: 1, explanation: "Algoritam je precizno definisan niz koraka." },
    { question: "Šta je optimizacija u AI?", options: ["Brisanje podataka", "Nalaženje najboljeg rešenja", "Kopiranje podataka", "Štampanje izveštaja"], correct: 1, explanation: "Optimizacija traži najbolje rešenje u prostoru mogućnosti." },
    { question: "Šta su pravila u AI sistemima?", options: ["Zakoni fizike", "Unapred definisane instrukcije", "Matematičke formule", "Programski kodovi"], correct: 1, explanation: "Pravila su eksplicitne instrukcije kako sistem treba da se ponaša." },
    { question: "Šta je pretraga stabla odlučivanja?", options: ["Pretraga interneta", "Metod pronalaženja optimalnog puta kroz moguće odluke", "Sortiranje podataka", "Kompresija fajlova"], correct: 1, explanation: "Stablo odlučivanja mapira sve moguće ishode." },
    { question: "Kako AI igra šah?", options: ["Nasumično bira poteze", "Procenjuje milione mogućih poteza", "Kopira ljudske poteze", "Koristi internet"], correct: 1, explanation: "AI šahovski programi analiziraju ogromne prostore mogućih poteza." }
  ],
  3: [
    { question: "Šta je mašinsko učenje?", options: ["Učenje programiranja", "Sposobnost sistema da uči iz podataka", "Učenje matematike", "Robotika"], correct: 1, explanation: "ML omogućava sistemima da uče bez eksplicitnog programiranja." },
    { question: "Šta su trening podaci?", options: ["Podaci o treningu", "Podaci kojima učimo AI model", "Sportski podaci", "Testni podaci"], correct: 1, explanation: "Trening podaci se koriste da nauče model." },
    { question: "Šta je nadgledano učenje?", options: ["Učenje sa nastavnikom", "Učenje iz označenih podataka", "Učenje bez podataka", "Učenje iz interneta"], correct: 1, explanation: "Supervised learning koristi označene primere za učenje." },
    { question: "Šta je model u ML?", options: ["3D model", "Matematička reprezentacija naučenih obrazaca", "Model automobila", "Model odeće"], correct: 1, explanation: "ML model je matematička funkcija naučena iz podataka." },
    { question: "Šta je overfitting?", options: ["Prebrzo učenje", "Previše prilagođavanje trening podacima", "Premalo podataka", "Greška u kodu"], correct: 1, explanation: "Overfitting znači model previše pamti trening podatke." }
  ],
  4: [
    { question: "Šta je neuronska mreža?", options: ["Nervni sistem", "Sistem inspirisan mozgom za obradu podataka", "Internet mreža", "Električna mreža"], correct: 1, explanation: "Neuronske mreže su inspirisane strukturom biološkog mozga." },
    { question: "Šta je neuron u NN?", options: ["Biološka ćelija", "Osnovna jedinica za obradu podataka", "Memorijska jedinica", "Procesor"], correct: 1, explanation: "Veštački neuron prima ulaze, obrađuje ih i daje izlaz." },
    { question: "Šta je duboko učenje?", options: ["Jako teško učenje", "Neuronske mreže sa mnogo slojeva", "Učenje pod vodom", "Sporo učenje"], correct: 1, explanation: "Deep learning koristi duboke neuronske mreže sa više slojeva." },
    { question: "Čemu služi aktivacijska funkcija?", options: ["Aktiviranju računara", "Uvođenju nelinearnosti u mrežu", "Pokretanju programa", "Merenju energije"], correct: 1, explanation: "Aktivacijska funkcija odlučuje da li neuron šalje signal." },
    { question: "Šta je backpropagation?", options: ["Povratak na početak", "Algoritam za učenje kroz ispravljanje grešaka", "Backup podataka", "Reverzni inženjering"], correct: 1, explanation: "Backpropagation propagira grešku unazad kroz mrežu." }
  ],
  5: [
    { question: "Koji AI alat se koristi za generisanje teksta?", options: ["Photoshop", "ChatGPT", "Excel", "Word"], correct: 1, explanation: "ChatGPT je AI alat za generisanje i razgovor na prirodnom jeziku." },
    { question: "Šta je AI asistent?", options: ["Čovek koji pomaže", "AI sistem koji pomaže u zadacima", "Robot", "Program za crtanje"], correct: 1, explanation: "AI asistenti pomažu u svakodnevnim zadacima." },
    { question: "Kako AI može pomoći u obrazovanju?", options: ["Ne može", "Personalizovanim učenjem i tutorima", "Samo testiranjem", "Pisanjem zadaća"], correct: 1, explanation: "AI omogućava personalizovano učenje prilagođeno svakom učeniku." },
    { question: "Šta je automatizacija radnih mesta?", options: ["Zapošljavanje robota", "Zamena manuelnih zadataka AI sistemima", "Otpuštanje radnika", "Računovodstvo"], correct: 1, explanation: "Automatizacija koristi AI da preuzme repetitivne zadatke." },
    { question: "Koji sektor najviše koristi AI danas?", options: ["Poljoprivreda", "Zdravstvo, finansije i tehnologija", "Turizam", "Umetnost"], correct: 1, explanation: "Zdravstvo, finansije i tech su lideri u primeni AI." }
  ],
  6: [
    { question: "Šta je bias u AI?", options: ["Greška u kodu", "Sistematska nepravičnost u AI odlukama", "Virus", "Spor algoritam"], correct: 1, explanation: "AI bias nastaje kada sistem donosi nepravične odluke." },
    { question: "Šta je odgovorna AI?", options: ["AI sa osećanjima", "AI razvijena etički i transparentno", "AI za odrasle", "AI bez grešaka"], correct: 1, explanation: "Odgovorna AI prati etičke principe u razvoju." },
    { question: "Šta je GDPR?", options: ["Programski jezik", "Evropska regulativa o zaštiti podataka", "AI algoritam", "Internet protokol"], correct: 1, explanation: "GDPR štiti lične podatke građana EU." },
    { question: "Zašto je transparentnost AI važna?", options: ["Nije važna", "Da bi korisnici razumeli kako AI donosi odluke", "Zbog estetike", "Zbog brzine"], correct: 1, explanation: "Transparentnost gradi poverenje i omogućava kontrolu." },
    { question: "Šta je deepfake?", options: ["Lažiranje video/audio sadržaja pomoću AI", "Vrsta hakovanja", "AI igra", "Deepweb"], correct: 0, explanation: "Deepfake koristi AI za lažiranje video i audio sadržaja." }
  ],
  7: [
    { question: "Kako AI utiče na tržište rada?", options: ["Nema uticaja", "Menja prirodu poslova i stvara nove", "Ukida sve poslove", "Povećava plate"], correct: 1, explanation: "AI transformiše poslove ali i stvara nove kategorije zanimanja." },
    { question: "Šta je singularnost u AI?", options: ["Jedan AI sistem", "Hipotetička tačka kada AI nadmaši ljudsku inteligenciju", "Kraj interneta", "Jedan računar"], correct: 1, explanation: "Tehnološka singularnost je spekulativni budući scenario." },
    { question: "Koji je najveći rizik od AI?", options: ["AI je presporao", "Zloupotreba i nedostatak kontrole", "AI je preskup", "AI ne radi"], correct: 1, explanation: "Zloupotreba i nedostatak etičke kontrole su ključni rizici." },
    { question: "Šta je AI regulativa?", options: ["AI program", "Zakoni i pravila o razvoju i primeni AI", "AI test", "AI kompanija"], correct: 1, explanation: "AI regulativa osigurava sigurnu i etičku primenu." },
    { question: "Kakva je budućnost AI?", options: ["AI će nestati", "AI će biti deo svakodnevnog života", "AI je samo trend", "AI je završen"], correct: 1, explanation: "AI je fundamentalna tehnologija koja menja sve aspekte života." }
  ]
};

module.exports = { questions };
