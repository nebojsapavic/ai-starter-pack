const questions = {
  1: [
    {
      question: "Koja od sledećih tehnologija koristi veštačku inteligenciju?",
      options: ["Digitalni sat", "Kalkulator", "Prepoznavanje glasa u telefonu", "Rerna sa tajmerom"],
      correct: 2,
      explanation: "Prepoznavanje glasa koristi AI da razume ljudski govor, pretvara zvuk u tekst i reaguje na komande. Ostali uređaji samo izvršavaju zadate funkcije bez inteligentnog ponašanja."
    },
    {
      question: "Šta je osnovna karakteristika veštačke inteligencije?",
      options: ["Može da koristi bateriju duže od običnog telefona", "Može da obavlja zadatke koji zahtevaju ljudsku inteligenciju", "Ima metalno telo", "Radi samo kad ima internet"],
      correct: 1,
      explanation: "AI se koristi za obavljanje zadataka koje bi inače zahtevale ljudsku sposobnost razumevanja, odlučivanja i učenja."
    },
    {
      question: "Kako se zove skup uputstava koje AI koristi da bi rešila problem?",
      options: ["Generator", "Algoritam", "Automat", "Motor"],
      correct: 1,
      explanation: "Algoritam je niz precizno definisanih koraka koje mašina koristi za rešavanje problema. On je osnovna jedinica 'mišljenja' u AI sistemima."
    },
    {
      question: "Koji od sledećih primera je verovatno uska (slaba) veštačka inteligencija?",
      options: ["Robot koji razume sve oblasti života", "AI koji predlaže sledeću pesmu na Spotify-u", "Ljubimac robot koji sanja", "Šrafciger sa senzorom"],
      correct: 1,
      explanation: "Uska AI je specijalizovana za jedan zadatak – poput preporuke pesama. Ne razume kontekst, ne razmišlja globalno."
    },
    {
      question: "Šta AI koristi da nauči kako da prepoznaje obrasce i donosi odluke?",
      options: ["Emocije", "Podatke i primere", "Magnete", "Kompas"],
      correct: 1,
      explanation: "AI sistem uči iz velikog broja primera (podataka). Nema emocije, ne koristi fizičke alate – koristi podatke za donošenje zaključaka."
    }
  ],
  2: [
    {
      question: "Kako AI vidi 'problem' koji treba da reši?",
      options: ["Kao emociju koju treba prepoznati", "Kao slučajan niz podataka", "Kao niz stanja, pravila i ciljeva", "Kao listu reči koju treba prevesti"],
      correct: 2,
      explanation: "Za AI, svaki problem je formalizovan kao početno stanje, ciljno stanje, dozvoljene akcije i pravila – sve to zajedno čini prostor za rešavanje."
    },
    {
      question: "Koja je uloga algoritma pretrage u rešavanju problema?",
      options: ["Da unapred zna tačno rešenje", "Da pretvori problem u sliku", "Da pretraži moguće puteve od početka do cilja", "Da pošalje podatke korisniku"],
      correct: 2,
      explanation: "Algoritam pretrage omogućava AI sistemu da istraži sve potencijalne pravce i pronađe optimalan put do rešenja problema."
    },
    {
      question: "Šta je heuristika u kontekstu AI pretrage?",
      options: ["Vrsta greške u kodu", "Pravilo koje pomaže AI da brže proceni i odabere bolju opciju", "Matematička formula za tačne rezultate", "Vrsta baze podataka"],
      correct: 1,
      explanation: "Heuristike su praktična pravila koja pomažu AI da brže pronađe dovoljno dobro rešenje, npr. 'idi ka tački koja je fizički najbliža cilju'."
    },
    {
      question: "Za šta se koristi Minimax algoritam u igrama?",
      options: ["Za generisanje slučajnih poteza", "Za donošenje estetskih odluka u dizajnu", "Za biranje poteza koji minimizira maksimalni gubitak", "Za prikazivanje reklama tokom igre"],
      correct: 2,
      explanation: "Minimax algoritam se koristi u strategijskim igrama s protivnikom. AI pokušava da predvidi najgori mogući scenario i izabere potez koji ga čini najmanje lošim."
    },
    {
      question: "Šta je osnovna ideja učenja pojačanjem (reinforcement learning)?",
      options: ["Učenje pomoću glasovnih komandi", "Učenje pomoću ljudskih emocija", "AI uči gledajući druge AI sisteme", "AI uči iz nagrada i kazni kroz pokušaje i greške"],
      correct: 3,
      explanation: "Reinforcement learning funkcioniše kao proces pokušaja i grešaka, u kojem AI dobija nagradu za korisne akcije, što ga podstiče da te akcije ponavlja i unapređuje."
    }
  ],
  3: [
    {
      question: "Šta je karakteristično za nadgledano učenje?",
      options: ["AI analizira podatke bez ikakvih oznaka", "AI uči na osnovu podataka koji imaju poznate odgovore", "AI uči gledajući video snimke", "AI koristi logiku umesto primera"],
      correct: 1,
      explanation: "U nadgledanom učenju, svaki primer u obuci sadrži i ulazne podatke i očekivani izlaz, što omogućava AI da nauči pravilnu vezu između njih."
    },
    {
      question: "Koji od sledećih zadataka najverovatnije koristi nadgledano učenje?",
      options: ["Grupisanje korisnika po navikama", "Prepoznavanje da li je mejl spam ili nije", "Pronalazak neobičnih transakcija bez konteksta", "Organizacija fajlova po boji"],
      correct: 1,
      explanation: "Za zadatak klasifikacije kao što je prepoznavanje spama, AI mora da uči iz primera gde je svaki mejl unapred označen kao 'spam' ili 'nije spam'."
    },
    {
      question: "Koja tvrdnja najbolje opisuje klasifikaciju u mašinskom učenju?",
      options: ["Određivanje kojoj grupi podatak pripada", "Predviđanje tačne brojčane vrednosti", "Poređenje podataka između više modela", "Grupisanje podataka bez prethodnih oznaka"],
      correct: 0,
      explanation: "Klasifikacija podrazumeva da AI odlučuje kojoj unapred definisanoj kategoriji neki podatak pripada — npr. pas ili mačka, spam ili ne-spam."
    },
    {
      question: "Šta je cilj regresije u mašinskom učenju?",
      options: ["Odrediti najkraći put do cilja", "Grupisati podatke bez oznaka", "Predvideti kontinuiranu brojčanu vrednost", "Upoređivati slike i prepoznavati boje"],
      correct: 2,
      explanation: "Regresija se koristi kada AI treba da predvidi brojčanu vrednost, kao što je cena stana, broj posetilaca ili očekivani prihod."
    },
    {
      question: "Koja je osnovna razlika između nadgledanog i nenadgledanog učenja?",
      options: ["U vrsti algoritma", "U tome da li su podaci unapred obeleženi", "U jeziku programiranja", "U tome da li se koristi u mobilnim aplikacijama"],
      correct: 1,
      explanation: "Nadgledano učenje koristi podatke sa jasno definisanim ishodima, dok nenadgledano učenje koristi sirove podatke bez prethodnih oznaka."
    }
  ],
  4: [
    {
      question: "Zašto se neuronska mreža tako zove?",
      options: ["Zato što koristi električne impulse", "Zato što je inspirisana načinom rada ljudskog mozga", "Zato što se povezuje sa internetom", "Zato što je sastavljena od kablova"],
      correct: 1,
      explanation: "Neuronska mreža je dobila ime jer njena struktura i način funkcionisanja podsećaju na neuronske veze u mozgu – iako nije biološka, već matematička."
    },
    {
      question: "Šta opisuje proces feedforward u neuronskoj mreži?",
      options: ["Ažuriranje grešaka iz izlaza", "Prolazak informacije od ulaza do izlaza", "Prekid rada mreže", "Nasumično generisanje rezultata"],
      correct: 1,
      explanation: "Feedforward je smer u kojem podaci 'teku' kroz mrežu: od ulaznog sloja, kroz skrivene slojeve, do izlaza. Tu mreža daje prvu pretpostavku."
    },
    {
      question: "Koja je uloga backpropagation procesa?",
      options: ["Dodavanje novih neurona u mrežu", "Korekcija težina na osnovu greške", "Generisanje izlazne vrednosti", "Nasumično menjanje podataka"],
      correct: 1,
      explanation: "Backpropagation je proces kojim se greška 'šalje unazad' kroz mrežu i koristi za podešavanje težina veza – da bi mreža sledeći put bila preciznija."
    },
    {
      question: "Koji tip neuronske mreže se najčešće koristi za prepoznavanje slika?",
      options: ["Sekvencijalna mreža", "Konvolutivna neuronska mreža (CNN)", "Logička mreža", "Generativna mreža za tekst"],
      correct: 1,
      explanation: "Konvolutivne neuronske mreže (CNN) su specijalno dizajnirane za rad sa slikama. One prepoznaju vizuelne obrasce, oblike, ivice i strukture u vizuelnim podacima."
    },
    {
      question: "Šta neuronska mreža zna kada 'prepozna' mačku na slici?",
      options: ["Zna šta je mačka i da pravi mjauk", "Prepoznaje obrazac sličan onome što je ranije već videla", "Zna ime vlasnika mačke", "Pamti sve slike zauvek"],
      correct: 1,
      explanation: "AI ne zna značenje slike, ali prepoznaje vizuelne obrasce slične onima na kojima je trenirana – i na osnovu toga zaključuje šta je na slici."
    }
  ],
  5: [
    {
      question: "Koja je glavna prednost korišćenja AI u učenju?",
      options: ["AI može da uči umesto tebe", "AI uvek daje gotove odgovore za testove", "AI ti pomaže da brže razumeš i organizuješ gradivo", "AI automatski piše tvoje domaće zadatke"],
      correct: 2,
      explanation: "Cilj korišćenja AI u učenju nije prečica, već alat koji ti pomaže da efikasnije razumeš, vežbaš i sistematizuješ informacije."
    },
    {
      question: "Koja je glavna uloga AI kao ličnog asistenta?",
      options: ["Da obavlja tvoje zadatke umesto tebe", "Da ti pomogne da bolje razmišljaš, pišeš i donosiš odluke", "Da odlučuje umesto tebe", "Da zapamti tvoju lozinku i automatski šalje mejlove"],
      correct: 1,
      explanation: "AI ne preuzima odgovornost, već pomaže u organizaciji misli, strukturi zadataka i razumevanju složenih problema – uz tvoje vođstvo."
    },
    {
      question: "Koja je jedna od glavnih prednosti korišćenja AI za organizaciju dana?",
      options: ["AI garantuje da ćeš završiti sve obaveze", "AI ti pomaže da bolje rasporediš vreme i zadatke u skladu sa sobom", "AI zamenjuje potrebe za kalendarom", "AI preuzima kontrolu nad tvojim obavezama"],
      correct: 1,
      explanation: "AI ne preuzima tvoju odgovornost, već ti pomaže da razmisliš realno: koliko imaš vremena, koliko energije, i šta je zapravo važno tog dana."
    },
    {
      question: "Zašto se kaže da AI u učenju nije prečica, već saveznik?",
      options: ["Jer AI ne zna dovoljno", "Jer ti pomaže da razumeš, ali ne uči umesto tebe", "Jer ne radi stalno", "Jer se koristi samo na fakultetima"],
      correct: 1,
      explanation: "AI je podrška, ne zamena. On ubrzava razumevanje i pomaže da lakše organizuješ gradivo – ali ti si taj koji mora da uloži trud i zapamti sadržaj."
    },
    {
      question: "Koja je razlika između običnog kalendara i AI asistenta?",
      options: ["Kalendari su pametniji", "AI može da prilagođava planove u realnom vremenu i predlaže nove", "Kalendari bolje pamte zadatke", "AI se koristi samo za velike kompanije"],
      correct: 1,
      explanation: "AI ne samo da beleži – već razume promene, postavlja pitanja i nudi rešenja kada se planovi poremete. On reaguje, a ne samo prikazuje."
    }
  ],
  6: [
    {
      question: "Kako nastaje pristrasnost u veštačkoj inteligenciji?",
      options: ["AI je programiran da bude nepravedan", "AI automatski favorizuje moćne korisnike", "AI uči iz istorijskih podataka koji mogu sadržati nesvesne pristrasnosti", "Pristrasnost je posledica preopterećenja sistema"],
      correct: 2,
      explanation: "AI ne razume pravednost. Ako su istorijski podaci pristrasni (npr. žene su ređe bile zaposlene u IT sektoru), AI će te obrasce samo preneti – ne zna da ih preispita."
    },
    {
      question: "Koja je potencijalna opasnost od AI alata koji generišu slike i glas?",
      options: ["Usporavaju uređaje", "Mogu da se koriste za pravljenje lažnih sadržaja (deepfake) koji ugrožavaju reputaciju i sigurnost", "Koriste više RAM memorije", "Ne mogu da razumeju nijanse jezika"],
      correct: 1,
      explanation: "AI alati koji generišu slike ili glas mogu biti zloupotrebljeni za lažno predstavljanje, manipulaciju javnim mnjenjem, pa čak i za prevare (npr. imitirajući glas člana porodice)."
    },
    {
      question: "Zašto AI sistemi ne mogu sami snositi pravnu odgovornost?",
      options: ["Zato što su imuni na zakone", "Zato što se sve greške automatski brišu", "Zato što nisu pravna lica i nemaju svest ni nameru", "Zato što rade bez interneta"],
      correct: 2,
      explanation: "Veštačka inteligencija nije osoba niti pravni subjekt – ne poseduje svest, nameru ili odgovornost. Zato je odgovornost za odluke uvek na ljudima koji AI razvijaju, koriste ili upravljaju njime."
    },
    {
      question: "Može li AI samostalno donositi etičke odluke?",
      options: ["Može, ako je dovoljno treniran", "Da, ali samo u kontrolisanim uslovima", "Ne, jer ne poseduje svest, nameru ni empatiju", "Samo ako ga programira filozof"],
      correct: 2,
      explanation: "AI ne zna šta je moral. Može da simulira etičko ponašanje ako mu to eksplicitno zadamo, ali ne može da 'oseća' ni 'razume' kontekst kao čovek. Zato odgovornost ostaje na nama."
    },
    {
      question: "Kako korisnik može doprineti sigurnijoj upotrebi AI alata?",
      options: ["Koristeći ih samo noću", "Unoseći što više ličnih podataka", "Kritičkim razmišljanjem, postavljanjem pitanja i informisanjem o pravilima korišćenja", "Izbegavanjem svih digitalnih alata"],
      correct: 2,
      explanation: "Korisnik ima odgovornost da razume osnovne principe rada AI alata – kako se podaci koriste, gde završavaju i da li postoji opcija za ograničenje deljenja."
    }
  ],
  7: [
    {
      question: "Kako veštačka inteligencija najčešće menja radna mesta?",
      options: ["Tako što masovno otpušta ljude iz svih industrija", "Tako što automatski zamenjuje sve ljudske radnike", "Tako što preuzima rutinske zadatke unutar poslova, dok ljudi ostaju da rade složenije i kreativnije delove", "Tako što traži više fizičkog rada"],
      correct: 2,
      explanation: "AI najčešće ne ukida ceo posao, već zamenjuje ponavljajuće, rutinske aktivnosti – ostavljajući ljudima prostor za zadatke koji traže razmišljanje, empatiju i kreativnost."
    },
    {
      question: "Koja veština se smatra ključnom u svetu koji se brzo menja pod uticajem AI?",
      options: ["Igranje video igara", "Pisanje rukom", "Kritičko razmišljanje", "Održavanje štampača"],
      correct: 2,
      explanation: "Kritičko razmišljanje je veština koja pomaže ljudima da preispituju informacije, razumeju kontekst i donose složene odluke – nešto što AI još uvek ne ume."
    },
    {
      question: "Kako AI može doprineti obrazovanju?",
      options: ["Potpuno zamenjuje nastavnika u učionici", "Prilagođava sadržaj svakom učeniku na osnovu njegovog tempa i stila učenja", "Piše umesto učenika domaće zadatke", "Briše sve prethodno naučeno"],
      correct: 1,
      explanation: "AI može biti snažan alat za personalizaciju nastave i podršku učenicima, ali nikada ne može zameniti pedagoga, empatiju i interakciju koju pruža živi učitelj."
    },
    {
      question: "Šta je AGI (opšta veštačka inteligencija)?",
      options: ["Program za montažu video sadržaja", "Specijalizovani chatbot", "Sistem sposoban da obavlja bilo koji zadatak koji može i čovek", "Automatska kamera sa senzorom"],
      correct: 2,
      explanation: "AGI je sledeći nivo AI razvoja – univerzalan i autonoman sistem koji može da uči i rešava različite zadatke bez prethodnog programiranja za svaki od njih."
    },
    {
      question: "Koja bi bila najbezbednija strategija za razvoj AGI-ja?",
      options: ["Razvijati ga bez zaustavljanja", "Zadržati ga samo u jednoj državi", "Razvijati ga uz međunarodnu saradnju, nadzor i etička pravila", "Dati punu kontrolu kompanijama"],
      correct: 2,
      explanation: "AGI menja svet – zato mora biti razvijan globalno, odgovorno i transparentno. Razvoj AGI-a mora biti globalno koordinisan, otvoren i odgovoran, jer se njegove posledice tiču celog sveta."
    }
  ]
};

module.exports = { questions };
