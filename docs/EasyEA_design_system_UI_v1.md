# EasyEA — design-järjestelmä ja käyttöliittymä v1

7.10.2026 • Toteutuksen määrittely

## 1. Suunta ja lähtöaineisto

Uusi ilme: **selkeä, inhimillinen ja käytännönläheinen ensiapukouluttaja**. Ostajan on helppo ymmärtää tarjonta, tutustua kouluttajaan ja pyytää tarjous ryhmälleen.

Lähtöaineisto: *EasyEA_uusi_verkkosivucopy_SEO_v1.md* ja *EasyEA_yritysanalyysi_ja_audit_2026-10-07.md*. Sivurakenne, H1–H3-otsikot ja linkitykset seuraavat copypakettia. Määrittely koskee tavoitetilaa; nykyistä WordPress-sivustoa ei ole muutettu.

| Tutkimushavainto | Design-ratkaisu |
|---|---|
| Kurssin ostaminen ja tiedustelu sekoittuvat | Päätoiminto on tarjouspyyntö; yksityisen osallistujan kysymys erotetaan lomakkeessa. |
| Kouluttajan osaaminen jää alas | Jami näkyy jo herossa, ja kouluttajan esittely on ensimmäinen sisältöosio. |
| Kurssit ovat pitkiä tekstikappaleita | Etusivulla neljä lyhyttä korttia, kurssisivulla vertailu ja ankkuroitu sisältö. |
| Kokonaisuutta hallitsee tumma tausta | Lämmin vaalea pääpinta, tumma header ja rajattu loppunosto. |
| Keltaista käytetään paljon myös tekstissä | Keltainen varataan tärkeimpään toimintaan ja pieniin korostuksiin; leipäteksti on tummaa. |
| Lomakkeessa on kieli- ja kenttäongelmia | Suomenkieliset labelit, oikeat syötetyypit, selkeät tilat ja kohdennetut kentät. |

### Visuaaliset periaatteet

- Yksi täytetty pääpainike samassa toimintoryhmässä. “Pyydä tarjous ryhmällesi” toistuu yläreunassa, herossa ja lopussa, mutta kilpailevia päätoimintoja ei lisätä.
- Logo säilyy nykyisenä. Pulssiviivasta ei tehdä uutta logoa tai hallitsevaa taustakuviota.
- Keltaiset elementit ovat pieniä suhteessa sivupintaan. Tavoitesuhde vaalea 75 %, tumma 20 %, korostus 5 % on sommittelun ohje, ei mitattava julkaisukriteeri.
- Sisältö näyttää todellisen kouluttajan. Asiakaslogoja, arvosanoja, koulutusmääriä ja pätevyysmerkkejä lisätään vain varmennetusta aineistosta.
- Suunnitellaan vaalea teema. Tumma tila ei kuulu ensimmäiseen versioon.

## 2. Värit ja semanttiset tokenit

| Token | Arvo | Käyttö |
|---|---|---|
| `--ea-bg` | `#FAFAF6` | Sivun päätausta |
| `--ea-surface` | `#FFFFFF` | Lomakkeet ja kortit |
| `--ea-surface-soft` | `#F0F2EA` | Vaihtoehtoinen osio ja pienet nostot |
| `--ea-surface-brand` | `#F7F8DF` | Hero-kuvan rauhallinen kehys |
| `--ea-text` | `#1C2520` | Otsikot ja pääteksti |
| `--ea-text-muted` | `#58605B` | Tukiteksti, ohjeet ja placeholderit |
| `--ea-dark` | `#1C1C1C` | Header, footer ja loppunosto; vastaa nykyisen logotiedoston taustaa |
| `--ea-on-dark` | `#FFFFFF` | Teksti tummalla |
| `--ea-brand` | `#F4F000` | Pääpainike ja rajatut korostukset |
| `--ea-brand-hover` | `#DFDC00` | Pääpainikkeen hover |
| `--ea-brand-active` | `#CCC900` | Pääpainikkeen painettu tila |
| `--ea-border` | `#E1E4DF` | Koristeelliset erottimet ja korttien rajat |
| `--ea-input-border` | `#787E79` | Kenttien tunnistettava rajaus |
| `--ea-focus` | `#1F5140` | Näppäimistökohdistus vaalealla |
| `--ea-danger` | `#B42318` | Virheteksti ja virherajaus |
| `--ea-danger-bg` | `#FFF2F0` | Virheilmoitus |
| `--ea-success` | `#1F694B` | Vahvistettu onnistuminen |
| `--ea-success-bg` | `#EEF7EF` | Onnistumisilmoitus |

Keltainen painike käyttää `--ea-text`-tekstiä. Valkoista tekstiä keltaiselle ei käytetä. Tekstilinkit ovat tummia ja alleviivattuja; väri ei ole ainoa linkin tunniste.

### Lasketut kontrastit

| Pari | Suhde |
|---|---|
| Pääteksti / päätausta | 15,04:1 |
| Tukiteksti / päätausta | 6,20:1 |
| Pääpainikkeen teksti / keltainen | 12,97:1 |
| Tukiteksti / valkoinen kortti | 6,48:1 |
| Input-raja / valkoinen kenttä | 4,15:1 |
| Virheteksti / valkoinen | 6,57:1 |
| Valkoinen / tumma header | 17,04:1 |

Suhteet on laskettu sRGB-väripareista. Input-raja on käyttöliittymäelementti; sen väriä ei käytetä normaalikokoisena tekstinä. Lopullisen sivun saavutettavuus tarkistetaan erikseen, myös valokuvien päällä olevan sisällön osalta.

## 3. Typografia

Fontti: **Manrope**, Google Fonts -version 400–800 variable font. Käytä tuotannossa itse hostattua WOFF2-tiedostoa ja säilytä sen mukana tuleva lisenssi. Uudemman erikseen jaettavan Manrope-version lisenssiä ei oleteta samaksi. Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Tyyli | Desktop | Mobiili | Paino |
|---|---|---|---|
| Hero H1 | 48–64 px / 1,08 | 34–40 px / 1,12 | 800 |
| Sisäsivun H1 | 40–52 px / 1,15 | 32–36 px / 1,15 | 800 |
| H2 | 32–40 px / 1,2 | 26–30 px / 1,25 | 700 |
| H3 | 22–24 px / 1,3 | 20–22 px / 1,3 | 700 |
| Ingressi | 18 px / 1,65 | 17 px / 1,65 | 400 |
| Leipäteksti | 17 px / 1,65 | 16 px / 1,65 | 400 |
| Painike ja label | 16 px / 1,4 | 16 px / 1,4 | 700 / 600 |
| Ohje ja metadata | 14 px / 1,5 | 14 px / 1,5 | 400–600 |

Otsikoiden kirjainväli −0,035 em; leipätekstissä normaali. H1 enintään noin 18–22 merkkiä rivillä, tekstipalsta enintään 64 ch. Ei pakotettuja rivinvaihtoja julkaistavaan H1:een. Sovita rivit palstan leveydellä. Ei isoja kirjaimia pitkissä otsikoissa eikä alle 14 px tukitekstiä.

## 4. Mitat ja asettelu

Spacing-asteikko: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 ja 120 px.

| Kohde | Desktop | Mobiili |
|---|---|---|
| Sisällön maksimileveys | 1200 px | Saatavilla oleva leveys |
| Sivumarginaali | 32–48 px | 20 px; 320 px leveydellä 16 px |
| Grid | 12 saraketta, 24 px väli | Yksi palsta, 20–24 px väli |
| Osioväli | 80–96 px | 48–64 px |
| Header | 88 px | 72 px |
| Painike | vähintään 48 px korkea | vähintään 48 px korkea |
| Kenttä | vähintään 52 px korkea | vähintään 52 px korkea |
| Kortin padding | 24–32 px | 24 px |
| Hero-kuva | palsta 5/12, suhde 4:5 | täysi leveys, korkeus enintään 360 px |

Breakpoints: alle 640 px mobiili, 640–1023 px välikoko, vähintään 1024 px desktop. Desktopin täysi navigaatio otetaan käyttöön vasta, kun logo, viisi linkkiä ja pääpainike mahtuvat: tässä määrittelyssä 1200 px kohdalla. Välillä 1024–1199 px sisältö voi käyttää desktop-gridiä mutta headerissa on menu.

Kulmat: painike ja input 8 px; kurssikortti 12 px; kuvakehys 20 px. Pillet vain lyhyelle metatiedolle. Varjo: maltillinen, `0 8px 24px rgb(28 37 32 / 0.06)`; ei varjoa jokaiselle osiolle.

## 5. Komponentit ja tilat

### Header ja navigaatio

Tumma, yhtenäinen header. Nykyinen logo 180 × 60 px desktopilla ja 144 × 48 px mobiilissa. Logon ympärillä vähintään 16 px tyhjää. Rasterilogon tumma tausta ei erotu headerista; myöhemmin käyttöön alkuperäinen vektoriversio, jos saatavilla.

Desktop: logo vasemmalla, viisi navigaatiolinkkiä keskellä, pääpainike oikealla. Aktiivinen sivu näkyy alleviivauksena ja `aria-current="page"`-merkintänä. Someikonit siirretään footeriin.

Menu-version header: logo ja 48 × 48 px “Valikko”-painike. Valikko avautuu headerin alle normaaliin dokumenttivirtaan: viisi linkkiä ja pääpainike. `aria-expanded`, `aria-controls`, Escape sulkee ja palauttaa fokuksen avaajaan. Kun käyttäjä seuraa linkkiä, valikko sulkeutuu. Ei piilotettua kaksoisnavigaatiota ruudunlukijalle.

Header vierii sivun mukana. Ensimmäisessä versiossa ei pysyvää mobiilialapalkkia eikä toista kelluvaa tarjouspainiketta.

### Painikkeet

| Variantti | Ulkoasu | Käyttö |
|---|---|---|
| Primary | Keltainen tausta, tumma teksti, 8 px kulmat | Tarjouspyyntö ja lähetys |
| Secondary | Läpinäkyvä pinta, tumma 1 px raja | Evästevalinnat ja toissijainen painiketoiminto |
| Text link | Tumma alleviivattu teksti ja haluttaessa pieni nuoli | Kurssiin tai kouluttajaan siirtyminen |

Hover muuttaa täyttöä tai alleviivausta; active ei muuta kokoa. Focus-visible: 3 px vihreä ulkorengas ja 3 px väli vaalealla. Tummalla käytetään valkoista ulkorengasta. Ei poistetun fokuksen tilaa.

Disabled: tausta `#E7E8E1`, teksti `--ea-text-muted`, ei hoveria. Disabled ei ole lomakkeen oletustila: lähettämistä saa yrittää, jolloin puuttuvat tiedot kerrotaan. Lähetyksen aikana estetään uusi lähetys, label “Lähetetään…” ja `aria-busy="true"`.

### Kurssikortti

Sisältö: nimi, vahvistettu laajuus, copypaketin lyhyt kuvaus, tekstilinkki. EA2:lle “Jatkokurssi”; tuntimäärää ei keksitä. Neljä samanarvoista korttia, ei “suosituin”-badgea ilman näyttöä.

Desktop ≥1024: neljä saraketta; 640–1023: kaksi; alle 640: yksi. Korkeus sisältölähtöinen; desktopilla linkit kohdistetaan alas flex-asettelulla. Kortissa vain yksi linkkikohde, ei sisäkkäisiä klikattavia elementtejä. Kortin sisältöä ei tarvitse valita ennen tarjouspyyntöä.

### Kurssivertailu

Desktopilla semanttinen taulukko: Kurssi / Laajuus / Valinnan lähtökohta. Mobiilissa sama tietosisältö esitetään viitenä pystysuuntaisena tietoryhmänä, joiden kenttäotsikot näkyvät. Taulukkoa ei kutisteta eikä pakoteta sivun vaakavieritykseen.

Jos käytetään kahta DOM-esitystä, piilotettu versio on myös ruudunlukijalta piilossa. Kaikki tiedot generoidaan samasta sisältölähteestä. Kurssinimien linkit vievät alempana oleviin otsikkoankkureihin.

### Kouluttajan esittely ja kuva

Hero käyttää nykyistä Jamin kuvaa rauhallisella vaalealla taustalla. Säilytä kasvojen näkyvyys ja riittävä tila pään yläpuolella. Älä venytä, generoi uutta henkilöä tai käytä tummaa värifiltteriä. Kuvakehyksen nimi- ja roolitieto on aidosti luettavaa HTML-tekstiä, ei kuvaan poltettua tekstiä.

Ensimmäisessä sisältöosiossa ovat kouluttajacopy ja linkki. Uutta identtistä suurta kuvaa ei toisteta heti heron perään. Kouluttajasivu voi käyttää samaa kuvaa suurempana.

### Prosessiosio

Kolme vaihetta 1–3. Desktopilla kolme saraketta, mobiilissa yksi. Numerot 32 px, otsikko H3 ja lyhyt kappale. Ei pitkää yhdistävää viivaa, joka rikkoutuu rivittyessä. Vaiheet säilyvät numeroituina myös ilman värejä.

### UKK

Kysymys H3-otsikon sisällä olevana buttonina. Rivi vähintään 56 px, teksti saa rivittyä. Plus/miinus on koriste, `aria-expanded` kertoo tilan. Vastauksessa 16–17 px teksti. Useita vastauksia saa pitää auki. Kysymykset ja vastaukset ovat HTML:ssä myös ilman JavaScriptiä; JS lisää haluttaessa avaamisen.

### Tarjouspyyntölomake

Desktopilla 5/12 yhteystiedot ja lyhyt ohje, 7/12 lomake. Mobiilissa otsikko ja yhteystiedot ennen lomaketta. Lomake yhdessä näkymässä, ei monivaiheinen wizard.

1. Asian tyyppi: radio-ryhmä “Mistä haluat kysyä?”. Kolme vaihtoehtoa, mobiilissa allekkain. CTA:n kautta tultaessa tarjouspyyntö esivalittuna.
2. Yhteystiedot: nimi ja sähköposti pakollisia, organisaatio ja puhelin vapaaehtoisia.
3. Asian mukaan näytettävät kentät: tarjouspyynnölle kurssi, osallistujamäärä, paikkakunta, ajankohta ja viesti. Yksityisen osallistujan kysymykseen kurssi, ajankohta ja viesti. Muuhun kysymykseen vain viesti.
4. Tietosuojalinkki ja lähetyspainike.

Ryhmätietojen tyhjyys ei estä ensimmäistä yhteydenottoa; alustava tieto tai “En vielä tiedä” hyväksytään. Virallisen tarjousprosessin mahdolliset lisävaatimukset vahvistetaan myöhemmin. Yleisen kysymyksen lähettämiseen ei pyydetä ryhmätietoja.

Label näkyy aina kentän yläpuolella; placeholder ei korvaa sitä. Desktopilla lyhyet kentät pareittain, mobiilissa kaikki yhdessä palstassa. Kurssivalinta natiivina selectinä; puhelin `type="tel"`, sähköposti `type="email"`, ajankohta tekstinä. Nimi/sähköposti/puhelin käyttävät sopivaa autocomplete-arvoa.

| Tila | UI ja toiminta |
|---|---|
| Tyhjä | Label, ohje ja selkeä kenttäraja. Ei virhettä ennen käyttäjän toimintaa. |
| Focus | Kohdistusrengas; label ja ohje pysyvät näkyvissä. |
| Virhe kentässä | Punainen raja, tekstiselitys, `aria-invalid` ja `aria-describedby`. Syötetty sisältö säilyy. |
| Puuttuvia tietoja lähettäessä | Virheyhteenveto lomakkeen alkuun, linkit virhekenttiin; fokus yhteenvetoon. |
| Lähettäminen | Painike “Lähetetään…”, uusi lähetys estetty; muut tiedot säilyvät. |
| Onnistuminen | Palvelimen vahvistama viesti “Kiitos! Viestisi on lähetetty…”. `role="status"`. |
| Palvelin- tai verkkovirhe | Copypaketin lähetysvirhe ja puhelin/sähköposti. Kenttiä ei tyhjennetä. Uudelleenyritys mahdollinen. |

Asian vaihto säilyttää kirjoitetut arvot käyttöliittymässä, mutta piilotettuja asiaan kuulumattomia kenttiä ei lähetetä. Ei automaattista markkinointivalintaa.

### Evästebanneri

Lyhyt banneri dokumenttivirrassa footerin yhteydessä, ei näkymää peittävänä kelluvana laatikkona. Ei-käyttöliittymälle välttämättömiä palveluja ei käynnistetä ennen niiden asianmukaista valintaa. Bannerin todellinen sisältö ja kategoriat perustuvat sivun käyttöön; pelkälle välttämättömien evästeiden käytölle ei lisätä kuvitteellisia kategorioita.

Kun valintoja tarvitaan: “Hyväksy valinnaiset” ja “Vain välttämättömät” saman kokoisina ja samanarvoisina secondary-painikkeina. “Muokkaa asetuksia” tekstilinkkinä. Asetusdialogi palauttaa fokuksen avaajaan eikä peitä käsiteltävää kenttää. Tässä tavoiteratkaisu, ei nykyisen suostumustekniikan varmennus.

## 6. Etusivun käyttöliittymä

1. **Header:** logo, navigaatio, yksi pääpainike.
2. **Hero:** vasemmalla copypaketin H1, ingressi, pääpainike ja tekstilinkki. Oikealla Jamin kuva ja nimi. Kolme lyhyttä faktaa ovat tekstirivinä toimintojen alla.
3. **Kouluttaja:** H2 “Opi ensiapua ihmisen kanssa, joka tekee sitä työkseen”, kaksi kappaletta ja linkki. Desktopilla otsikko 5/12 ja teksti 7/12.
4. **Kurssit:** H2, johdanto, neljä korttia. Korttien jälkeen linkki koko kurssivertailuun tarvittaessa; päätarjouspainiketta ei lisätä jokaiselle kortille.
5. **Ryhmäkoulutus:** vaalea vaihtoehtoinen osio, yritys-/seura-/yhteisöcopy ja tekstilinkki. Ei kuvitteellisia toimialareferenssejä.
6. **Prosessi:** kolme numeroitua vaihetta.
7. **Toimialue:** copyn Kouvola-osio ja paikallinen linkki, ei karttaa ilman varmennettua asiakaspalvelu- tai koulutuspaikkaa.
8. **Loppunosto:** tumma tausta, H2, lyhyt kappale ja keltainen pääpainike.
9. **Footer:** yhteystiedot, sivulinkit, some, tietosuoja ja evästeasetukset. Vahvistettu virallinen yritystieto.

Työpöytäheron korkeudeksi ei lukita koko näyttöä; se määrittyy sisällöstä, noin 560–680 px tavallisessa desktopissa. Mobiilissa kuva on tekstin ja päätoimintojen jälkeen, jolloin tarjouspyyntö näkyy ennen suurta kuvaa. Faktarivi saa rivittyä, eikä siitä tehdä vaakakarusellia.

Palauteosio on myöhempi lisäys kouluttajan jälkeen vain, kun käytössä on oikeita palautteita ja lupa. Tyhjiä tähtiä tai anonymisoituja keksittyjä lainauksia ei näytetä.

## 7. Kaikkien seitsemän sivun layout

| Sivu | Rakenne | Desktop / mobiili | Päätoiminto |
|---|---|---|---|
| Etusivu | Edellä määritelty 9 osion rakenne | Split-hero / teksti ennen kuvaa | Tarjouspyyntö |
| Yrityksille | Pieni hero, tarve, kurssivalinta, tarvittavat tiedot, kouluttajan nosto, UKK, loppunosto | Sisältö + 320 px järjestäjän tietonosto; mobiilissa nosto omalla paikallaan | Tarjouspyyntö |
| Kurssit | Hero, vertailu, kurssisisällöt, kertaus, käytännöt, loppunosto | 220 px sivun sisällysluettelo + sisältö; mobiilissa sisällysluettelo vertailun jälkeen | Tarjouspyyntö; kurssivalinta vapaaehtoinen |
| Hinta | Pieni hero, kolme lähtötietoa, vertailuchecklist, avoin suunnitelma, loppunosto | Kolme lähtötietoa rinnakkain; mobiilissa allekkain | Tarjouspyyntö |
| Kouvola | Paikallinen hero, ryhmän suunnittelu, kurssilinkki, toteutus, yksityinen osallistuja, yhteystiedot | Tekstipainotteinen, kouluttajakuva enintään yksi | Tarjous tai osallistumiskysymys |
| Kouluttaja | H1 + kuva, koulutustausta, opetustapa, tavoite, yhteydenotto | Kuva 4/12, teksti 8/12; mobiilissa johdanto ensin | Tarjouspyyntö |
| Yhteystiedot | H1, soittolinkki ja sähköposti, ohje, lomake, loppuohje | Yhteystietopalsta + lomake; mobiilissa yksi palsta | Viestin lähettäminen |

Kurssisivun ankkurit säilyvät copyn mukaisina: `hataensiapu-4h`, `hataensiapu-8h`, `ea1`, `ea2`. Sisällysluettelo ei peitä sisältöä. Ankkuriin siirtyminen ei automaattisesti muuta lomaketta. Mahdollinen “Kysy tästä kurssista” voi myöhemmin välittää kurssivalinnan näkyvästi lomakkeelle.

Hintasivulla ei näytetä nollahintaa, keksittyä alkaen-hintaa eikä tyhjää hinnastokorttia. Kun hinnat on vahvistettu, samaan sivuun lisätään hinnasto, jossa hinnan yksikkö ja lisämaksut ovat näkyvissä.

## 8. Responsiivisuus ja saavutettavuus

Tavoite on WCAG 2.2 AA. Tämä on suunnittelutavoite, ei valmiin sivuston sertifiointi.

- Toimiva järjestys 320, 390, 768, 1024 ja 1440 px leveyksillä. Sivun tasolla ei vaakavieritystä.
- Tekstiä saa suurentaa 200 % ja sivu tarkistetaan myös 400 % zoomilla / 320 CSS-pikselin reflow-tilassa.
- H1–H3-hierarkia seuraa copya, eikä visuaalista kokoa käytetä HTML-otsikkotason valintaan.
- Sivun alussa toimiva “Siirry sisältöön” -linkki; header/nav/main/footer-landmarkit.
- Kaikki toiminnot ovat näppäimistöllä käytettävissä; fokus ei jää valikon tai dialogin sisään sulkemisen jälkeen.
- Projektin kosketustavoite vähintään 48 × 48 px painikkeille ja itsenäisille ohjaimille; tämä on projektin valinta, ei WCAG AA:n minimikoon väite.
- Tekstilinkit erottuvat alleviivauksella; virhe ja onnistuminen myös tekstillä, eivät pelkällä värillä.
- Kuvalle asianmukainen alt-teksti. Koristeelliset nuoli- ja plusikonit `aria-hidden="true"`.
- Animaatiot vain pieniä tilasiirtymiä, 120–180 ms. Ei parallaxia, automaattista videota tai liikkuvaa EKG-taustaa. `prefers-reduced-motion` poistaa tarpeettoman liikkeen ja smooth scrollin.
- Kentän ja virheselityksen välinen yhteys ohjelmallisesti. Onnistuminen vasta todellisen palvelinpalautteen jälkeen.

W3C-lähtökohdat: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [tekstikontrasti](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [ei-tekstimuotoinen kontrasti](https://www.w3.org/WAI/WCAG22/understanding/non-text-contrast.html), [kohdistuksen näkyvyys](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) ja [kohteen minimikoko](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

## 9. Kuvat, kuormitus ja nykyinen alusta

Nykyinen WordPress + Astra voidaan säilyttää. Aseta fontit, värit, sisältöleveydet ja painikkeet globaaleiksi, ja käytä samoja uudelleenkäytettäviä lohkoja. WPForms-lomakkeen ehdollinen logiikka ja ilmoitustilat tarkistetaan käytössä olevasta toteutuksesta; premium-ominaisuuksien saatavuutta ei oleteta.

Jamin nykyinen PNG soveltuu suunnittelumalliin. Tuotantoon sama alkuperäinen kuva optimoidaan WebP-/AVIF-muotoon ja tarjotaan eri leveyksillä. Säilytä kuvan mittasuhde ja määritä width/height. Hero-kuva ei laiskalataudu; alempien osioiden kuvat voivat laiskalatautua. Fonttilataus `font-display: swap`, vain tarpeelliset merkistöt ja painot.

Kuvamallin lähteet ovat nykyinen logo ja kouluttajan kuva:

- https://www.easyea.fi/wp-content/uploads/2022/12/cropped-easyealogo5-300x100.png
- https://www.easyea.fi/wp-content/uploads/2023/01/jami.png

Malli käyttää aitoja tiedostoja eikä ole uusi logo tai uusi henkilökuva. Tuotantokäyttöön niiden käyttöoikeus vahvistetaan asiakkaalta.

## 10. Toimitus ja hyväksymiskriteerit

Mukana `EasyEA_design_tokens.css`: semanttiset tokenit ja komponenttien perus-CSS. Se ei sisällä koko sivustoa, valikkologiikkaa tai lomakkeen backendia.

Mukana `EasyEA_UI_desktop_mobile_v1.png`: sommittelumalli desktopin ja mobiilin alkuosasta sekä lomakkeen ja komponenttien näytteistä. Kuvassa on valitut copypaketin osiot ja lyhennetyt näyterivit; koko sivun lopullinen sisältö tulee copypaketista. Desktop on suunniteltu 1440 px leveydelle ja pienennetty posterissa 1120 px levyiseksi; mobiili on 390 px leveä. Desktop-header käyttää täyttä navigaatiota. Kuva ei ole julkaistun sivuston ruutukaappaus tai selaintestin tulos.

Ennen julkaisua:

1. Seitsemän sivua sisältävät oikean copyn, metat ja toimivat linkit. Yksi H1 per sivu.
2. Pääpainikkeet vievät tarjouspyyntöön. Yksityisen osallistujan kysymys onnistuu ilman ryhmätietoja.
3. Valikon, UKK:n ja lomakkeen kaikki tilat tarkistetaan näppäimistöllä ja puhelimella.
4. Lomakkeen oikea viestitoimitus, virhetilanne ja kaksoislähetyksen esto testataan.
5. Kontrastit, zoom, reflow, fokus ja bannerin vaikutus tarkistetaan lopullisessa toteutuksessa.
6. Yritystiedot, pätevyys- ja todistustiedot, mahdolliset hinnat ja saatavuus vahvistetaan. Tyhjiä referenssiosioita ei julkaista.

Määrittelyssä ja värilaskennassa tehdyt tarkistukset eivät korvaa valmiin WordPress-toteutuksen visuaalista ja toiminnallista QA:ta.
