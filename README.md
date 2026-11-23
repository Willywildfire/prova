## V11 — mode clar/fosc i contrast dels formularis

Fitxer actual: `PRIMER-v11-obre-aquest.html`, també adjunt com `PRIMER.html`.

- Botó Fosc / Clar a la capçalera de totes les pantalles principals i al resum final. Canvia tota l’aparença sense recarregar ni perdre formularis. La preferència es desa al navegador dins la còpia JSON i es restaura a l’inici.
- Paleta fosca per a les superfícies, textos, controls, diàlegs, taules i etiquetes de les gràfiques. Les fases d’execució mantenen els seus colors funcionals, adaptats per la paleta quan correspon.
- Correcció del blanc sobre blanc a «Repeticions fetes»: el camp heretava l’estil dels antics controls de la pantalla d’execució. Ara els formularis tenen text, fons, cursor, placeholder i text-fill explícits segons el tema, també a l’edició de sessions.
- Proves: 32 tests unitaris i suites UI anteriors contra V11; nova suite de temes a 320/390/768/1440 px, persistència després de recàrrega i contrast mínim 4,5:1 del text del camp de repeticions en ambdós modes. No equival a una auditoria completa WCAG ni a proves en maquinari real.

Abans d’actualitzar exporta la còpia JSON de la versió anterior i importa-la si el navegador no conserva el registre. La versió continua funcionant offline com un únic HTML, sense instal·lació.

---

## V10 — resultat després de «He acabat»

Fitxer actual: `PRIMER-v10-obre-aquest.html`, també lliurat com `PRIMER.html`.

En prémer He acabat a cada sèrie / costat, s’atura el temps de treball i es pregunta quantes repeticions s’han fet. Amb manuelles o gripper també es pot confirmar el pes/resistència. Desar i continuar registra la resposta; Passar deixa les reps desconegudes i conserva el pes configurat. No hi ha RIR ni qüestionari d’esforç. Els exercicis per temps desen automàticament els segons, sense preguntar repeticions.

La pregunta substitueix el desplegable opcional durant el treball. També apareix quan s’acaba abans d’hora i es tria desar la sèrie actual. Tornar a la sèrie o Escape reprèn el cronòmetre sense afegir-hi el temps del diàleg; una recàrrega restaura el diàleg i els valors escrits. El descans/canvi de costat comença després de Desar o Passar.

Validat: 32 tests unitaris i suites UI anteriors, més pausa temporal del diàleg, recàrrega, resposta, passar, reprendre, flexions, exercicis per temps i registre unilateral amb pes.

Abans d’actualitzar, exporta Còpia JSON de la versió anterior i importa-la al fitxer nou si el navegador no manté les dades.

---

## V9 — eliminar sessions i gràfiques de flexions sense reps

Fitxer actual: `PRIMER-v9-obre-aquest.html` (autònom, també distribuït com `PRIMER.html`).

- Registre → Eliminar, o detall de sessió / historial d’exercici → Eliminar sessió: confirmació explícita, cancel·lació enfocada per defecte. Elimina la sessió completa, no la rutina programada. No es pot desfer.
- Les dades desapareixen del registre principal, les exportacions futures i els agregats que en depenen; es netegen també workouts, sets i outbox d’IndexedDB. Les còpies JSON antigues externes no canvien. La rutina A/B i les referències de pes aplicades anteriorment no es reverteixen.
- Flexions: la vista inicial mostra el temps treballat encara que les repeticions no s’hagin anotat. També hi ha gràfica de sèries/costats. No s’inventen reps ni volum corporal.
- Editar sessió permet corregir reps i kg després, si es coneixen; buits = desconeguts. Conserva temps, costat i sèrie interrompuda; els canvis actualitzen les gràfiques i propostes sense aplicar automàticament cap progressió. El volum corporal utilitza la càrrega estimada històrica, no el pes corporal actual.
- Validat en HTML file:// amb sessions sense reps, edició a 12 flexions → 483,6 kg·reps estimats, cancel·lació, eliminació, recàrrega i neteja d’IndexedDB, a 320/390/1440 px. Suites anteriors també provades contra V9.

Abans d’actualitzar, exporta Còpia JSON des del fitxer anterior. Importa-la al nou si el navegador no conserva les dades i comprova el registre abans d’eliminar l’anterior.

---

## V8 — gràfiques generals al Registre

Obre `PRIMER-v8-obre-aquest.html` directament, sense instal·lació ni connexió.

- Sessions per setmana (o per mes en períodes llargs), distingint rutina i ràpida.
- Minuts de treball, sense descansos, i distribució dels 8 exercicis amb més temps.
- Volum extern **anotat**, només amb repeticions reals i kg; exclou flexions estimades i grippers. La cobertura mostra les sèries calculables; el volum incomplet no representa tot el treball.
- Targetes de sessions/dies actius, temps, sèries/costats i volum, amb comparació amb el període anterior de la mateixa durada. Cap comparació arbitrària a tot l’historial.
- Filtres 4/12 setmanes, 365 dies o historial complet i totes/rutines/ràpides; la llista de sessions segueix els filtres. Calendari i exportacions continuen sent globals.
- Detall tàctil o amb teclat i taules alternatives per a les gràfiques temporals. Estats buits sense dades d’exemple.
- Els períodes es delimiten per data local i inclouen avui. Les agrupacions dels extrems poden ser parcials; les sessions d’un mateix dia no dupliquen els dies actius.

Per traslladar dades d’un HTML anterior, exporta primer la còpia JSON i importa-la a la nova versió: el navegador pot separar l’emmagatzematge segons el fitxer. Conserva la còpia anterior fins a verificar la importació.

Validació V8: 32 proves unitàries, suites de mòbil/execució/exercicis i nova suite de gràfiques buides/amb dades/filtres/teclat, de 320 a 1440 px. La versió portable supera el límit original de 65 KB; no s’afirma complir-lo.

---

# Primer v7 · Sessions lliures, càrregues i progressió

PWA en català, HTML/CSS/JavaScript natius. Sense dependències de producció ni peticions al núvol.

## Versió 7: funcionament actual

### Acabar quan vulguis

A la pantalla d’entrenament hi ha sempre **Acabar sessió** (també en preparació, descans o pausa). Pots:

- Guardar només les sèries / costats acabats.
- Si estàs fent una sèrie, guardar també l’interval actual: queda marcat com a **interromput**, no com una sèrie completa.
- Continuar entrenant sense perdre l’estat; el temps del diàleg no es compta.

Les sessions curtes apareixen al registre, al mapa i a l’historial dels exercicis. Si no hi ha cap sèrie guardada ni decideixes incloure la que feies, l’app surt sense fabricar una sessió buida.

### Fer un exercici solt

Pestanya **Exercicis** → selecciona un exercici → configura sèries i kg → **Començar aquest exercici**. Serveix a qualsevol hora i no mou el cicle A/B. Els exercicis unilaterals inclouen els dos costats; una sèrie de curls normal equival a esquerra + dreta, amb el canvi guiat. Si pares després d’un costat, només s’haurà registrat aquell costat.

També pots entrar a cada fitxa tocant el nom de l’exercici a Entrenament o «Registre, gràfica i progressió» a Rutina.

### Pes i repeticions sense qüestionaris

**He acabat** continua sent suficient. El calaix **Anotar pes i repeticions · opcional** permet anotar dades mentre fas la sèrie, sense cap pregunta ni RIR. Si deixes les reps buides, es desa `actual: null`. No s’inventa volum ni es dona per assolit l’objectiu. El pes seleccionat s’utilitza com a càrrega de la sèrie; el pots corregir al calaix. Suggereix el mateix pes per a les sèries següents i els dos dies de rutina que comparteixen exercici.

A **Rutina** hi ha ara un camp de kg per exercici amb manuella / resistència per al gripper. En moviments bilaterals pots indicar una o dues manuelles alhora. En un moviment unilateral el volum de cada costat utilitza una sola manuella: no es duplica el recompte.

### Fitxa i gràfiques per exercici

- Pes màxim registrat en una sèrie acabada (no un 1RM estimat).
- Volum extern per sessió i millor volum d’una sèrie quan es coneixen pes i reps.
- Repeticions registrades, historial detallat i identificació de sessions ràpides / acabades abans.
- Punts daurats quan s’assoleix un nou màxim; toca un punt per veure’n data i valor. Navegables amb teclat.
- Les sèries sense reps encara tenen registre de temps i pes, però no generen un volum fictici. Un pes extern no indicat (0) tampoc genera un volum fals de zero.
- CSV conserva la unió de columnes en barrejar registres antics i nous.

**Convenció del volum:** 12 reps amb una manuella de 8 kg = **96 kg·reps**, no una repetició de 96 kg ni treball físic en joules. En curls unilaterals cada costat és una entrada separada. En un exercici amb dues manuelles simultànies de 8 kg i 12 reps, el volum extern és 192 kg·reps. El gripper es tracta com a resistència nominal, no com a massa externa aixecada.

### Els teus 62 kg i les flexions

Pes corporal inicial configurat a **62 kg**, editable a la fitxa de flexions. La gràfica prioritza repeticions; ofereix volum corporal estimat, separat del volum extern. Un factor orientatiu i editable de 0,65 dona un suport estimat de 40,3 kg, **no** equival a aixecar els 62 kg sencers. La postura i els punts de suport el modifiquen i l’app no ho mesura.

Cada sèrie nova de flexions desa el pes corporal, el factor i el suport estimat d’aquell moment. Canviar el teu pes més endavant no reescriu l’historial. Sense reps no es calcula volum estimat. No es reconstrueixen dades corporals absents als registres antics.

### Doble progressió, per exercici

1. Treballa amb un pes real indicat i registra les reps si vols rebre propostes.
2. Calen **dues últimes sessions comparables** amb totes les sèries programades de l’exercici al sostre del rang, al mateix pes i amb tots dos costats si és unilateral. Una sessió d’una sola sèrie no substitueix les tres sèries programades.
3. L’app proposa augmentar la càrrega; el canvi només s’aplica quan prems **Aplicar**. En pujar el pes, torna a la referència inferior de repeticions del patró.
4. Valors inicials: +0,5 kg per a laterals, curls i tríceps; +1 kg per a rem i press. Es poden adaptar al salt real de les teves manuelles des de la fitxa. També pots ajustar el sostre del rang.
5. Per a pes corporal es proposa progressar en reps o segons. La resistència del gripper es canvia manualment perquè les escales dels dispositius no són equivalents.

No s’infereix esforç. Falta de reps, una sessió recent incompleta o un costat absent impedeixen justificar l’augment. Una sèrie interrompuda no es fa servir com a sèrie completa. Si has completat totes les sèries d’un exercici i després acabes abans d’hora la resta de la rutina, aquell exercici sí que pot aportar dades vàlides. Aquestes regles són una ajuda de planificació, no una garantia mèdica ni d’absència de lesions.

El mapa muscular manté el seu model heurístic basat en temps observat: **el pes extern no s’ha incorporat a la fórmula de recuperació**. Els gràfics de força i volum són una analítica separada.

### Construcció i proves

```bash
npm run build:portable  # només Python estàndard; genera l’HTML únic de la versió actual
npm test               # proves del motor, força, volum, progressió i CSV
npm run test:ui        # Playwright: mòbil + fluxos de força
```

Comprovat en Chromium: sessió ràpida completa amb esquerra/dreta; sessió acabada abans incloent una sèrie interrompuda; 12+11 curls a 8 kg = 184 kg·reps; flexions a 62 kg amb volum estimat separat; pes sincronitzat entre dies de rutina; gràfic tàctil; proposta de 8 → 8,5 kg; versió modular offline amb Service Worker. Sis amplades de pantalla, de 320 a 1440 px, i entrenament en horitzontal. No s’han fet proves en maquinari Android/iOS real.

Exporta/importa un JSON per passar de l’HTML antic al nou si el navegador separa els fitxers locals. Aquesta actualització no reinicialitza el pla ni l’historial existents. Les dades de prova no s’inclouen al fitxer descarregable.

## Canvis anteriors (v6): sense valoracions d’esforç

Fes la sèrie i prem **He acabat**. No s’obre cap formulari, no es demana RIR, repeticions ni una valoració de dificultat. L’app desa l’interval de treball i passa al descans o al costat següent. El temps o les repeticions previstes són només referències: tampoc la planxa s’acaba automàticament quan arriba a l’objectiu. No s’utilitza bloqueig tàctil automàtic durant les sèries manuals, perquè el botó sempre estigui disponible. Es conserva un filtre de 1,2 s després de cada transició per evitar dobles tocs.

Les repeticions realitzades queden a `null` si no les has registrat, mai s’omplen amb l’objectiu previst. L’esforç queda a `null` i no s’infereix. Per als registres nous, el model muscular utilitza un factor neutre, amb la durada i els pesos musculars aproximats. L’historial antic es conserva, incloent dades que ja havies registrat; no apareixen valoracions a la interfície. No s’activa progressió automàtica a partir d’un esforç desconegut.

El resum mostra sèries, temps de treball observat i durada total. El temps observat és l’interval fins al teu toc, no una mesura directa de tensió muscular. La preparació, els descansos, els canvis de costat, la pausa i el desament local es mantenen. Les modalitats avançades del motor no imposen el final automàtic d’una fase de treball en aquest mode manual.

Les seccions inferiors documenten funcionalitats de versions anteriors: els formularis de valoració de v3–v5 ja no formen part del flux actual.

## Versió 5: optimització mòbil

- Navegació inferior amb quatre destinacions i àrees tàctils de més de 44 px. El botó d’inici queda per sobre de la navegació, sense superposicions.
- Respecte de les zones segures (`safe-area-inset-*`), alçada dinàmica (`dvh`) i teclat mitjançant VisualViewport quan està disponible. Navegació i inici s’amaguen temporalment mentre el teclat redueix la zona útil.
- Formulari de sèries com a panell inferior, limitat a l’alçada visible, amb scroll intern i botó de desament accessible. Botons +/− per registrar repeticions sense obrir el teclat.
- Inputs de 16 px o més per evitar zoom automàtic a iOS; teclats numèric/decimal segons el camp. No es desactiva el zoom manual del navegador.
- Editor amb etiquetes visibles i tres columnes per als valors; reordenació amb botons (arrossegar no és necessari al mòbil).
- Entrenament adaptat a pantalles curtes i paisatge; scroll vertical de seguretat si cal. Progrés de sessió i càrrega prevista visibles.
- Mapa frontal per defecte en iniciar a ≤720 px, silueta més compacta, selector natiu de grup muscular i botó per tornar al dibuix.
- Es conserva la posició de scroll en canviar de pestanya; notes amb desament automàtic durant l’escriptura.
- CSS reconstruït: aproximadament un 30% menys de bytes respecte de la v4. S’han eliminat les capes de redefinicions de les edicions anteriors.
- Actualització visual de sessió limitada a aproximadament 12 cops per segon; el motor temporal continua ancorat a timestamps i conserva les transicions i els sons. La corba de previsió reutilitza les contribucions del múscul en lloc de recalcular 18 grups per cada punt.

### Reproduir les proves de navegador

```bash
npm install
npx playwright install chromium
# En Linux poden caldre dependències del sistema:
# npx playwright install-deps chromium
npm test
npm run test:ui
```

Les proves unitàries no requereixen Playwright. Playwright és només una dependència de desenvolupament, no s’envia al navegador ni cal per obrir l’HTML.

Les proves UI comproven les quatre vistes en 320×568, 360×640, 390×844, 412×915, 768×1024 i 1440×900; també treball/registre/descans en mòbil vertical i 667×375 horitzontal, i una simulació de reducció de viewport amb el camp de pes enfocat. No s’ha validat el teclat real, les zones segures o el Wake Lock en maquinari Android/iOS. El Safari real pot diferir de Chromium.

Per conservar dades entre fitxers locals de versions diferents, exporta i importa una còpia JSON. Aquesta versió no reinicialitza la rutina ni l’historial guardats.

## Canvis anteriors (v4)

- Arial a tota la interfície: sense fonts serif ni monoespaiades als títols, números o textos de l’app. L’editor de codi DSL conserva una font de codi.
- Interfície convencional: fons gris clar, superfícies blanques, controls blaus, text més llegible i sense numeració editorial decorativa.
- Mapa vectorial refet, amb vistes davant/esquena, contorns musculars, selecció destacada i ampliació del grup seleccionat.
- Previsió Ara / 24 h / 48 h i gràfic de decaïment a 72 h. Sempre suposa absència d’entrenament addicional.
- Índex expressat sobre 100, no com a percentatge de fatiga fisiològica. Sense dades es mostra explícitament, sense inventar recuperació.
- Llista ordenada per càrrega estimada i filtre de grups amb dades.
- Detall de les sèries reals que alimenten el model: exercici, data, TUT, RIR i kg registrats. Registre de kg i notes de v3 conservat.
- Explicació desplegable del model i els seus límits. L’esquema no és una làmina anatòmica mèdica; els músculs profunds es representen de forma simplificada. El pes extern encara no modifica el càlcul muscular.
- Botó +15 s de descans, persistent i ancorat al mateix timestamp; es manté l’opció d’acabar el descans.
- Es conserva el focus de teclat en canviar vista, filtre, múscul o previsió.

13 proves unitàries superades. Provat amb Chromium: registre complet de sèries, ampliació de descans, gràfic amb dades reals de prova, previsió, filtres, Arial aplicada als títols i mòbil de 390 px sense desbordament. Les dades de prova no s’inclouen a l’app descarregable.

**Actualitzar sense perdre l’historial:** exporta una còpia JSON des de la versió antiga i importa-la des de Rutina a la nova. Els navegadors poden assignar emmagatzematges diferents a cada fitxer HTML local. Aquesta versió no reinicialitza un pla amb `planVersion: 2`.

## Obrir amb doble clic

Obre **PRIMER-v7-obre-aquest.html** (inclòs a l’arrel del ZIP). Té CSS i JavaScript integrats i funciona sense servidor. L’`index.html` modular requereix HTTP/HTTPS: no l’obris directament amb `file://`.

Les dades es desen en aquest navegador. El tractament de localStorage per fitxers locals varia: en canviar de nom, carpeta o navegador pots veure un historial buit. Exporta una còpia JSON des de la versió anterior i importa-la a «El meu pla» per conservar les dades. Després de restaurar una còpia antiga, recarrega l’app perquè s’apliqui la migració al nou pla; les rutines antigues es conserven al camp `previousRoutines` i l’historial no s’esborra. Si ja tens una sessió antiga en curs, acaba-la o avorta-la abans d’actualitzar.

## Pla inicial

| Dia | Sessió |
|---|---|
| Dilluns | A · Empenta |
| Dimarts | B · Tracció, braç i core |
| Dimecres | Descans |
| Dijous | A · Empenta |
| Divendres | B · Tracció, braç i core |
| Dissabte / Diumenge | Descans |

**A:** flexions; press d’espatlla unilateral; elevacions laterals; extensió de tríceps darrere el cap.

**B:** rem unilateral; curl normal; curl en T; hand gripper; planxa; Superman amb 2 segons de contracció a dalt.

- 3 sèries inicials quan el pla especifica 3–4: pots pujar a 4 a l’editor.
- Repeticions inicials al límit inferior del rang; planxa inicial de 45 s.
- Descans de 75 s quan el rang és 60–90 s. La resta respecta els descansos indicats.
- Les flexions es guien per **1–2 RIR**, sense objectiu fix obligatori.
- L’app demana les repeticions reals en acabar cada sèrie dinàmica, incloent-hi una fallada tècnica. El temps emprat per respondre no es compta al TUT.
- Exercicis «per braç/mà» executats seqüencialment amb canvi de costat de 5 s i descans després de tots dos costats.
- Els objectius del pla no augmenten automàticament fora dels rangs: ajust manual a l’editor.
- No hi ha penalitzacions per retard. Son reduït disminueix les sèries.
- El selector setmanal permet consultar o executar una altra sessió, sense marcar un descans com a entrenament.

## Mapa de recuperació renovat

- SVG frontal i posterior amb 18 grups: core, pectorals, dorsals, deltoides, bíceps, tríceps, avantbraços i trapezis, entre d’altres.
- Selecció amb ratolí, tacte o teclat. Detall amb últim estímul, nombre de sèries i contribucions recents.
- Gris = sense dades; verd = índex baix; groc = moderat; coral = elevat. Sense dades **no** equival a múscul recuperat.
- Càrrega de cada sèrie ponderada per TUT, RIR, nivell i pes muscular aproximat, amb decaïment exponencial.
- L’indicador visual s’atura a 100, però el càlcul de temps fins a <15 utilitza els valors sense limitar i resol la suma de corbes de semivida de 24/36 h.
- No genera dades de mostra. Les sèries s’incorporen al mapa quan s’acaba la sessió completa.
- Els exercicis d’aquesta rutina utilitzen la semivida genèrica de 24 h; 36 h queda reservat a registres marcats com a excèntrics intensos.
- No representa per separat esquerra i dreta. Agrupa el volum de tots dos costats.

**No és una mesura fisiològica:** el percentatge és un índex heurístic, no fatiga real ni capacitat disponible. No incorpora pes de les manuelles, dolor, son o entrenaments no registrats. No ha de decidir si pots entrenar amb dolor. Els dibuixos d’exercici són esquemes, no instruccions tècniques validades. «Curl en T» conserva el nom aportat, sense assumir que el dibuix defineixi una variant exacta; confirma la tècnica amb el teu professional.

## Altres funcions

Temporitzador per timestamps; pausa; recuperació després de recarregar; bloqueig tàctil; àudio generat amb Web Audio; vibració i Wake Lock si el navegador ho permet; editor visual i DSL; historial; còpies JSON; CSV de sessions/sèries; ACWR orientatiu; radar per patrons; calendari dels últims 182 dies.

LocalStorage conté l’estat i l’historial complet. IndexedDB conserva un mirall de sessions, sèries i una cua local. No hi ha sincronització remota; per a anys d’ús caldrà migrar la lectura de l’històric a IndexedDB. Fes còpies periòdiques.

## Executar la versió modular

```bash
npm start
# http://localhost:3000
npm test
```

Sense Node: `python3 -m http.server 3000 --bind 0.0.0.0`.

## Cloudflare Pages i instal·lació

Connecta el repositori → framework **None**, build buit, output **.**. Obre l’URL HTTPS al mòbil i instal·la des del menú de Chrome. Primera obertura amb xarxa; després queda disponible offline. La versió portable no registra Service Worker. La versió modular sí.

L’app no pot modificar alarmes, brillantor, volum, No Molesteu o filtre de pantalla. Aquestes accions requereixen Modes i Rutines de Samsung i depenen de One UI. Tampoc pot executar sons amb el navegador tancat. MediaSession està subjecte al suport del dispositiu i no s’ha validat amb un S22 real.

## GitHub `prova`

No s’ha publicat cap canvi remot. Per crear-lo amb GitHub CLI autenticat:

```bash
git init -b main
git add .
git commit -m "Add PRIMER v2 training PWA"
gh repo create prova --private --source=. --remote=origin --push
```

Si ja existeix, clona el repositori real, copia-hi aquests fitxers, revisa els canvis i fes commit/push. No facis force-push sobre contingut existent.

## Pendents de l’especificació original

Supabase/auth/RLS/reintents/LWW, DAG de graduacions, deload automàtic, comodins de ratxa, soroll rosa i control de pes de manuelles. La sobrecàrrega per repeticions de la primera versió es conserva al motor per exercicis personalitzats però no modifica aquest pla fix.

Les estadístiques de la v1 usaven 10 regions: es mantenen com a històric aproximat, no es reconstrueix informació muscular que no s’hagués registrat. El RIR final de la sessió queda per defecte; el selector d’esforç apareix durant descansos anteriors. Les marques per repeticions i segons no s’han de comparar en el Ghost Pacer com si fossin la mateixa unitat.

## Proves

10 proves unitàries: distribució A/B, DSL/rangs, supersèries, càrrega, progressió, absència de dades, decaïment i temps calculat amb càrrega sense limitar.

Proves de Chromium amb `file://`: mapa, canvi de vista, selecció muscular, dies de descans, sis exercicis de B, finalització d’una sessió de prova amb registre exacte de 14 reps, mapa alimentat per l’historial i vista mòbil 390 px sense desbordament ni errors JavaScript. No substitueixen proves de maquinari real.

## Edició 3 — Quadern d’entrenament

Obre **PRIMER-v3-obre-aquest.html** amb doble clic. És la versió més recent; substitueix la v2.

- Nou disseny de quadern: navegació superior, llista d’exercicis, menys targetes i textos descriptius sense lemes. Botó d’inici fix al mòbil.
- Pes per exercici en kg. El valor es conserva entre dies A/A o B/B amb el mateix exercici.
- Formulari propi al final de cada sèrie dinàmica: repeticions, pes i RIR; opció de pèrdua de tècnica. El temps del formulari queda exclòs del TUT.
- La correcció de pes s’aplica també a les sèries següents i al pes suggerit per a la propera sessió.
- Notes opcionals per sessió, visibles al detall del registre.
- Resum amb volum extern registrat (kg × reps). És una suma de les entrades; no multiplica per dos els exercicis bilaterals simultanis ni incorpora pes corporal. No s’ha d’interpretar com a treball mecànic.
- Botó per acabar un descans abans d’hora i control de so abans de començar.
- Comparació amb el registre anterior a la llista d’exercicis. El Ghost temporal s’oculta als exercicis per repeticions per no comparar segons amb reps.
- RIR del formulari guardat per sèrie. El selector del descans només corregeix l’última sèrie, no totes les anteriors.
- L’històric i la rutina existents es mantenen; no es canvia `planVersion`.
- El mapa continua sent un model basat en TUT/RIR: **el pes extern registrat encara no modifica l’estimació muscular**. El percentatge no és una mesura mèdica.

Provat en Chromium: persistència de kg entre dies, sessió amb 11 reps / 8 kg / RIR 3 i nota, consulta de pes al detall del registre, mapa, navegació i absència de desbordament a 390 px. Continuen passant les 10 proves unitàries del motor.
