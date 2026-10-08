# EasyEA: ilmainen vauvan ja taaperon ensiapuopas

Toteutettu 8.10.2026. PDF on EasyEA:n itsenäinen, omin sanoin kirjoitettu kooste. Sen sisältö perustuu SPR:n julkisiin ensiapuohjeisiin ja HUS:n Myrkytystietokeskuksen tietoihin. Lähteiden kuvia ja logoja ei ole käytetty eikä ulkopuolista hyväksyntää ole väitetty.

## Sisältö

Kaksi A4-sivua: 1) jääkaapin oveen tulostettava muistilista hätäpuhelusta, tajuttomuudesta, vauvan ja taaperon elvytyksestä, hengitysteiden vierasesineestä ja myrkytystietonumerosta; 2) tulostus, rajaukset ja klikattavat lähteet. Vauvan ohje on alle 1-vuotiaalle, taaperon 1–3-vuotiaalle. Kyseessä on lyhyt perusvaiheiden muistilista, ei kattava hoito-opas. Hätätilanteessa toimitaan 112:n ohjeilla.

Lähdesivut tarkistettu 8.10.2026. Kouluttajan myöhempää henkilökohtaista tarkastusta ei esitetä tehdyksi. Päivitä PDF ja esikatselu aina yhdessä, kun ohje muuttuu.

## Latauspolku

- Etusivulla on latausosio, joka näyttää oppaan ensimmäisen sivun.
- Kurssivalinnan lasten ensiapupaketin yhteydessä näytetään sama osio. Se toteutetaan palvelimella renderöitynä sisältönä, joka välitetään kurssivalinnan ehdolliseen paikkaan.
- Esittelysivu: `/oppaat/vauvan-ja-taaperon-ensiapu/`.
- PDF: `/oppaat/vauvan-ja-taaperon-ensiapuopas.pdf`.
- Linkit myös oppaiden listauksessa ja alatunnisteessa.
- Lataus toimii suoralla linkillä ja HTML:n download-attribuutilla. Sähköpostia tai muuta henkilötietoa ei pyydetä.
- Esittelysivulta pääsee lasten ensiapukoulutuksen pyyntöön. Rooli, paketti, kurssi ja oppaan lähdemerkintä esitäytetään. Nykyinen lomake luo sähköpostiluonnoksen; asiakas lähettää sen itse.

Tämä on avoin sisältömagneetti ja koulutuspyyntöön ohjaus. Se ei muodosta sähköpostilistaa, tallenna lataajan tietoja tai lähetä markkinointia. Sivuston nykyinen noindex säilyy. Sähköpostiin perustuva liidinkeruu tarvitsee erikseen valitun palvelun, tietosuojan kuvauksen ja erillisen markkinointisuostumuksen, jos sellaista halutaan käyttää. Oppaan lataus ei ole markkinointisuostumus.

## Lähteet

- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/vauvan-elvytys/
- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/lapsen-elvytys/
- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-vauva/
- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-lapsi/
- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/tajuttoman-ensiapu/tajuttoman-lapsen-ensiapu/
- https://www.punainenristi.fi/ensiapu/ensiapuohjeet/hatailmoituksen-tekeminen/
- https://www.hus.fi/potilaalle/sairaalat-ja-toimipisteet/myrkytystietokeskus

## Tuotanto ja tarkistukset

`scripts/create_child_guide.py` tuottaa PDF:n ReportLabilla ja DejaVu Sans -fonteilla (järjestelmässä `/usr/share/fonts/truetype/dejavu/`). Renderöi PDF Popplerilla ja tarkista molemmat sivut ennen julkaisemista. Sivun 1 WebP-esikatselu tehdään samasta lopullisesta PDF:stä. PDF ei käytä ulkoisia sisältöresursseja eikä JavaScriptiä.

Tarkista: 2 A4-sivua, lähteiden linkit, teksti ja ikäryhmien rajat; lint, TypeScript ja tuotantobuild; selaimessa lataus etusivulta ja esittelysivulta, lasten paketin latausosio sekä koulutuspyynnön esitäyttö. Tarkista 320/390 px näkymät. Saapuva liidi on asiakkaan oikeasti lähettämä yhteydenotto, ei oppaan lataus tai luonnoksen luonti.
