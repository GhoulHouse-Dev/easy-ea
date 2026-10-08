# EasyEA: kurssipaketit ja itsepalvelupolku

Päivitetty 8.10.2026. Esikuva: High Speed Training. Sovellus käyttää EasyEA:n nykyisiä lähikoulutuksia ja käyttäjän määrittämiä paketteja. High Speed Trainingin verkko-opiskelua, lisenssejä, oppimisympäristöä, sertifikaatteja tai asiakkaiden tunnuslukuja ei siirretä EasyEA:n väitteiksi.

## Asiakkaan polku

1. `/kurssit/`: valitse tilaajan rooli (HR, esihenkilö/työsuojelu, koulu/päiväkoti).
2. Valitse toimintaympäristön koulutuspaketti ja kurssin laajuus. Koulu/päiväkoti-rooli valitsee lasten ensiavun lähtökohdaksi; kaikki vaihtoehdot pysyvät valittavina.
3. Täsmennä osallistujamäärä ja jatka `/ensiapukoulutus-hinta/`-laskuriin.
4. Tarkastele hinnoitteluesimerkkiä tai erittele saamasi tarjous. Valittu kurssi, osallistujamäärä, rooli ja paketti säilyvät sivulta toiselle.
5. Jatka sähköpostitse tehtävään koulutuspyyntöön. Puhelinnumero on vapaaehtoinen. Nykyinen lomake muodostaa tarkistettavan sähköpostiluonnoksen; käyttäjä lähettää viestin itse. Se ei lupaa varauksen, maksun tai viestin lähettämisen onnistumista.

## Paketit

| Paketti | Nimi englanniksi | Kurssivalinnan lähtökohta |
| --- | --- | --- |
| Ensiapu toimistotyöhön | Low Risk First Aid | Hätäensiapu 4 h, Hätäensiapu 8 h tai EA1 |
| Ensiapu rakennustyömaille ja teollisuuteen | High Risk First Aid | EA1, EA2 tai räätälöity koulutus |
| Lasten ensiapu | Pediatric First Aid | Lapsiin painottuvan räätälöinnin tiedustelu |

Paketit ovat hankinnan lähtökohtia, eivät ammattiryhmän lakisääteisiä minimikursseja tai erillisiä vahvistettuja pätevyyksiä. Toimistopaketin nimessä oleva Low Risk ei arvioi asiakkaan työpaikan riskiä. Työpaikan tarve ja soveltuva koulutus selvitetään erikseen. Lasten ensiapu on uusi käyttäjän määrittämä paketointiehdotus; sen sisältö, kouluttajan toteutus ja todistus vahvistetaan ennen tilausvahvistusta. EA2:n aiempi EA1-suoritus ja räätälöinnin vähintään neljän henkilön ryhmä näkyvät käyttöliittymässä.

Nykyisen valikoiman lähteet tarkistettu 8.10.2026: [EasyEA etusivu](https://www.easyea.fi/) ja [EasyEA kurssit](https://www.easyea.fi/kurssit/). Vertailuesikuva: [High Speed Training](https://www.highspeedtraining.co.uk/) ja sen [tiimien koulutusmalli](https://www.highspeedtraining.co.uk/training-teams/?discount=1).

## Hinnoitteluesimerkki

Käyttäjän antamat portaat:

| Osallistujia | Mallin hinta / henkilö | Esimerkkisumma |
| --- | --- | --- |
| 1–9 | 99 € | 9 × 99 € = 891 € |
| 10–49 | 79 € | 10 × 79 € = 790 € |
| 50+ | 59 € | 50 × 59 € = 2 950 € |

Toteutettu oletus: ryhmäkoon hintataso koskee **kaikkia osallistujia**, ei vain rajan ylittäviä osallistujia. Näin kokonaisumma voi pienentyä rajan ylittyessä (9→10 ja 49→50). Laskuri ilmaisee laskentatavan näkyvästi. Sama esimerkkimalli koskee kaikkia kurssivalintoja. Eurot ovat esimerkkihintoja, eivät vahvistettu EasyEA-hinnasto. ALV:n sisältymistä tai verokantaa ei oleteta; malli ei laske ALV:tä tai lisäkuluja.

## Tarjouksen vertailulaskuri

Käyttäjä valitsi tämän käyttötavan ennen hintaportaita koskevaa lisäystä, joten se säilyy rinnakkaisena toimintona. Käyttäjä antaa koulutuksen hinnan, hinnan yksikön (ryhmä/henkilö), koulutusryhmien määrän, osallistujamäärän, todistusten erilliset henkilömaksut sekä matka- ja muut lisäkulut.

- Ryhmähinta: ryhmähinta × ryhmien määrä.
- Henkilöhinta: henkilöhinta × osallistujamäärä. Piilotettu ryhmämäärä ei vaikuta laskentaan.
- Todistusten lisämaksut: henkilömaksu × osallistujamäärä; 0 jos sisältyvät koulutushintaan.
- Matka- ja muut kulut: syötetään kaikkien ryhmien yhteissummana, lisätään kerran.
- Verolliset hinnat: niitä ei veroteta uudelleen.
- Verottomat hinnat: käyttäjän antama tarjouksen ALV-prosentti lisätään koko erittelyyn. Yhden verokannan rajoite näkyy käyttöliittymässä.
- Osallistujahinta: loppusumma / osallistujamäärä, pyöristetään senttiin.
- Mahdollisia Kela-korvauksia ei vähennetä.

Rahasyötteet muunnetaan kokonaisiksi senteiksi; desimaalierottimeksi käy pilkku tai piste. Virheellinen määrä tai hinta estää tuloksen näyttämisen. Syötteitä ei tallenneta selaimeen tai lähetetä palvelimelle. Tarjouspyynnön URL ei sisällä laskurin hintatietoja.

## Toteutus ja jatko

`lib/training.ts` sisältää roolit, paketit ja nykyiset kurssit. `lib/budget.ts` sisältää rahalaskennan ja mallihinnat. Komponentit: `CoursePlanner.tsx` ja `PriceCalculator.tsx`. Yhteydenottolomake saa rajatun, validoidun suunnitelman URL-parametreista. Nykyisten kurssien ankkurit säilyvät.

`npm test` tarkistaa hintaportaiden rajat, laskennan, desimaalit, veron, virheelliset syötteet ja valintojen siirtymisen. Lint, TypeScript ja tuotantobuild kuuluvat tarkistuksiin. Selainvarmennus kattaa paketin → laskurin → esitäytetyn lomakkeen ja 320/390 px näkymät.

Sitova ostaminen tarvitsee hyväksytyn hinnaston, ALV-esityksen, pakettien sisällön ja ehdot, toteutusajat/kapasiteetin sekä maksamisen tai laskutuksen ja vahvistuksen. Suora lomakkeen lähetys tarvitsee sähköpostipalvelun. Näitä ei esitetä valmiina tässä vaiheessa. Esittelyversion nykyinen noindex-asetus säilyy.
